import type { MDXComponents as MDXComponentsType } from "mdx/types";
import type { CSSProperties } from "react";
import { Tooltip } from "./mdx/Tooltip";
import { Callout } from "./mdx/Callout";

function normalizeClassName(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.filter(Boolean).join(" ");
  return "";
}

function stylePropToObject(style: unknown): CSSProperties {
  if (style && typeof style === "object" && !Array.isArray(style)) {
    return { ...(style as CSSProperties) };
  }
  if (typeof style !== "string" || !style.trim()) return {};
  const out: Record<string, string> = {};
  for (const rule of style.split(";")) {
    const idx = rule.indexOf(":");
    if (idx === -1) continue;
    const key = rule.slice(0, idx).trim();
    const val = rule.slice(idx + 1).trim();
    if (!key) continue;
    const camel = key.replace(/-([a-z])/gi, (_, c: string) => c.toUpperCase());
    out[camel] = val;
  }
  return out as CSSProperties;
}

function shikiStyleWithoutPadding(style: CSSProperties): CSSProperties {
  const { padding: _p, paddingTop: _pt, paddingBottom: _pb, paddingLeft: _pl, paddingRight: _pr, ...rest } = style;
  return rest;
}

export const mdxComponents: MDXComponentsType = {
  Tooltip: Tooltip as unknown as React.ComponentType,
  Callout: Callout as unknown as React.ComponentType,
  h1: (props) => (
    <h1 className="font-display font-bold text-text tracking-[-0.03em] mt-12 mb-4" style={{ fontSize: "clamp(32px, 4vw, 48px)" }} {...props} />
  ),
  h2: (props) => (
    <h2 className="font-display font-semibold text-text tracking-[-0.02em] mt-10 mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)" }} {...props} />
  ),
  h3: (props) => (
    <h3 className="font-display font-medium text-text tracking-[-0.01em] mt-8 mb-3 text-xl" {...props} />
  ),
  p: (props) => (
    <p className="font-body text-[16px] font-light text-subtext0 leading-[1.7] mb-5" {...props} />
  ),
  a: (props) => (
    <a
      className="text-lavender underline-offset-4 hover:underline transition-colors duration-250"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside mb-6 space-y-2 text-subtext0 font-body text-[16px] font-light leading-[1.6]" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside mb-6 space-y-2 text-subtext0 font-body text-[16px] font-light leading-[1.6]" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-2 border-peach pl-6 py-2 my-6 italic text-subtext0 font-body text-[17px] leading-[1.9]" {...props} />
  ),
  hr: () => <hr className="border-none h-px bg-surface0 my-10" />,
  pre: (props) => (
    <pre className="mb-6 overflow-x-auto rounded-lg border-0 bg-transparent p-0 font-mono text-[14px] leading-relaxed shadow-none [&>code]:min-w-0" {...props} />
  ),
  code: (props) => {
    const p = props as Record<string, unknown>;
    const { className, style, ...rest } = props;
    const restObj = { ...rest } as Record<string, unknown>;
    delete restObj.class;
    const cn = [normalizeClassName(className), normalizeClassName(p.class)].filter(Boolean).join(" ");
    const dataLang = typeof p["data-language"] === "string" ? p["data-language"] : undefined;
    const dataTheme = typeof p["data-theme"] === "string" ? p["data-theme"] : undefined;
    const isBlock = Boolean(dataLang ?? dataTheme) || cn.includes("language-") || cn.includes("shiki");
    if (isBlock) {
      const clean = shikiStyleWithoutPadding(stylePropToObject(style));
      return (
        <code
          {...restObj}
          className={`font-mono block w-full min-w-0 text-[14px] leading-relaxed rounded-lg bg-mantle ${cn}`}
          style={{ ...clean, paddingTop: "1.5em", paddingBottom: "1.5em", paddingLeft: "3ch", paddingRight: "3ch", boxSizing: "border-box" }}
        />
      );
    }
    return (
      <code {...restObj} className={`font-mono text-[0.9em] text-lavender bg-mantle px-1.5 py-0.5 rounded ${cn}`} style={style as CSSProperties | undefined} />
    );
  },
};
