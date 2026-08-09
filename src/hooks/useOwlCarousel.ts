import { useEffect } from "react";

export const useOwlCarousel = (
  selector: string,
  options: any,
  enabled: boolean
) => {
  useEffect(() => {
    if (!enabled) return;

    const $ = (window as any).$;
    if (!$) return;

    const el = $(selector);
    if (!el.length) return;

    if (el.hasClass("owl-loaded")) {
      el.trigger("destroy.owl.carousel");
      el.find(".owl-stage-outer").children().unwrap();
      el.removeClass("owl-loaded");
    }

    el.owlCarousel(options);

    return () => {
      if (el.hasClass("owl-loaded")) {
        el.trigger("destroy.owl.carousel");
      }
    };
  }, [selector, enabled, JSON.stringify(options)]);
};
