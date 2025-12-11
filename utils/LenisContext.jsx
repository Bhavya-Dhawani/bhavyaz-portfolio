"use client";

import React, { createContext, useContext, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function LenisProvider({ children, options = {}, autoRaf = true }) {
    const lenisRef = useRef(null);
    const rafRef = useRef(null);
    const optionsRef = useRef(options);
    const autoRafRef = useRef(autoRaf);
    const mountedRef = useRef(false);

    const initLenis = useCallback(
        (opts = optionsRef.current) => {
            if (lenisRef.current) return lenisRef.current;
            lenisRef.current = new Lenis(opts);
            optionsRef.current = opts;
            return lenisRef.current;
        },
        []
    );

    const rafLoop = useCallback(
        (time) => {
            if (!lenisRef.current) return;
            lenisRef.current.raf(time);
            rafRef.current = requestAnimationFrame(rafLoop);
        },
        []
    );

    useEffect(() => {
        initLenis();
        if (autoRafRef.current) {
            rafRef.current = requestAnimationFrame(rafLoop);
        }
        const lenis = lenisRef.current;
        if (lenis && typeof lenis.scrollTo === "function" && !mountedRef.current) {
            if (typeof lenis.scrollTo === "function") {
                try {
                    lenis.scrollTo(0, { immediate: true });
                } catch (e) {
                    try {
                        lenis.scrollTo(0, { duration: 0 });
                    } catch (e2) {
                        window.scrollTo(0, 0);
                    }
                }
            }
        }
        mountedRef.current = true;
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
        };
    }, [initLenis, rafLoop]);

    const start = useCallback(() => lenisRef.current?.start?.(), []);
    const stop = useCallback(() => lenisRef.current?.stop?.(), []);
    const scrollTo = useCallback((target, opts) => lenisRef.current?.scrollTo?.(target, opts), []);
    const on = useCallback((name, fn) => lenisRef.current?.on?.(name, fn), []);
    const off = useCallback((name, fn) => lenisRef.current?.off?.(name, fn), []);
    const destroy = useCallback(() => {
        if (!lenisRef.current) return;
        lenisRef.current.destroy();
        lenisRef.current = null;
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);
    const getLenis = useCallback(() => lenisRef.current, []);
    const reinit = useCallback(
        (newOptions = {}) => {
            const merged = { ...optionsRef.current, ...newOptions };
            destroy();
            optionsRef.current = merged;
            initLenis(merged);
            if (autoRafRef.current && !rafRef.current) {
                rafRef.current = requestAnimationFrame(rafLoop);
            }
            return lenisRef.current;
        },
        [destroy, initLenis, rafLoop]
    );

    const value = {
        initLenis,
        start,
        stop,
        scrollTo,
        on,
        off,
        destroy,
        getLenis,
        reinit,
    };

    return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

export function useLenis() {
    const ctx = useContext(LenisContext);
    if (!ctx) {
        throw new Error("useLenis must be used inside a LenisProvider");
    }
    return ctx;
}

const moduleLenisRef = { current: null };

export function bindModuleLenis(lenisInstance) {
    moduleLenisRef.current = lenisInstance;
}
export function getLenisInstance() {
    return moduleLenisRef.current;
}
export function scrollToLenis(target, opts) {
    return moduleLenisRef.current?.scrollTo?.(target, opts);
}
export function startLenis() {
    return moduleLenisRef.current?.start?.();
}
export function stopLenis() {
    return moduleLenisRef.current?.stop?.();
}
export function onLenis(name, fn) {
    return moduleLenisRef.current?.on?.(name, fn);
}
export function offLenis(name, fn) {
    return moduleLenisRef.current?.off?.(name, fn);
}
export function destroyLenis() {
    if (moduleLenisRef.current) {
        moduleLenisRef.current.destroy?.();
        moduleLenisRef.current = null;
    }
}
export function reinitLenis(newOptions) {
    if (!moduleLenisRef.current) {
        moduleLenisRef.current = new Lenis(newOptions || {});
        return moduleLenisRef.current;
    }
    const merged = { ...(moduleLenisRef.current.options || {}), ...(newOptions || {}) };
    moduleLenisRef.current.destroy?.();
    moduleLenisRef.current = new Lenis(merged);
    return moduleLenisRef.current;
}
