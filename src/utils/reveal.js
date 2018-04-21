import anime from "animejs";
import { scrollMonitor } from "scrollmonitor";

export class Reveal {
  constructor(el, options) {
    this.el = el;
    this.options = { ...this.defaultOptions, ...options };
    this.layout();
  }

  createDOMEl(type, className, content) {
    const el = document.createElement(type);
    el.className = className || "";
    el.innerHTML = content || "";
    return el;
  }

  defaultOptions = {
    // If true, then the content will be hidden until it´s "revealed".
    isContentHidden: true,
    // The animation/reveal settings. This can be set initially or passed when calling the reveal method.
    revealSettings: {
      // Animation direction: left right (lr) || right left (rl) || top bottom (tb) || bottom top (bt).
      direction: "lr",
      // Revealer´s background color.
      bgcolor: "#f0f0f0",
      // Animation speed. This is the speed to "cover" and also "uncover" the element (seperately, not the total time).
      duration: 500,
      // Animation easing. This is the easing to "cover" and also "uncover" the element.
      easing: "easeInOutQuint",
      // percentage-based value representing how much of the area should be left covered.
      coverArea: 0,
      // Callback for when the revealer is covering the element (halfway through of the whole animation).
      onCover: function(contentEl, revealerEl) {
        return false;
      },
      // Callback for when the animation starts (animation start).
      onStart: function(contentEl, revealerEl) {
        return false;
      },
      // Callback for when the revealer has completed uncovering (animation end).
      onComplete: function(contentEl, revealerEl) {
        return false;
      }
    }
  };

  layout = () => {
    const position = getComputedStyle(this.el).position;
    if (
      position !== "fixed" &&
      position !== "absolute" &&
      position !== "relative"
    ) {
      this.el.style.position = "relative";
    }
    // Content element.
    this.content = this.createDOMEl("div", "", this.el.innerHTML);
    if (this.options.isContentHidden) {
      this.content.style.opacity = 0;
    }
    // Revealer element (the one that animates)
    this.revealer = this.createDOMEl("div");
    Object.assign(this.revealer.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "#000",
      pointerEvents: "none",
      opacity: 0
    });
    this.el.innerHTML = "";
    this.el.appendChild(this.content);
    this.el.appendChild(this.revealer);
  };

  getTransformSettings = direction => {
    let val, origin, origin_2;

    switch (direction) {
      case "lr":
        val = "scale3d(0,1,1)";
        origin = "0 50%";
        origin_2 = "100% 50%";
        break;
      case "rl":
        val = "scale3d(0,1,1)";
        origin = "100% 50%";
        origin_2 = "0 50%";
        break;
      case "tb":
        val = "scale3d(1,0,1)";
        origin = "50% 0";
        origin_2 = "50% 100%";
        break;
      case "bt":
        val = "scale3d(1,0,1)";
        origin = "50% 100%";
        origin_2 = "50% 0";
        break;
      default:
        val = "scale3d(0,1,1)";
        origin = "0 50%";
        origin_2 = "100% 50%";
        break;
    }

    return {
      // transform value.
      val: val,
      // initial and halfway/final transform origin.
      origin: { initial: origin, halfway: origin_2 }
    };
  };

  reveal = () => {
    // Do nothing if currently animating.
    if (this.isAnimating) {
      return false;
    }
    this.isAnimating = true;

    // Set the revealer element´s transform and transform origin.
    const defaults = {
      // In case revealSettings is incomplete, its properties deafault to:
      duration: 500,
      easing: "easeInOutQuint",
      delay: 0,
      bgcolor: "#f0f0f0",
      direction: "lr",
      coverArea: 0
    };
    const revealSettings = this.options.revealSettings;
    const direction = revealSettings.direction;
    const transformSettings = this.getTransformSettings(direction);

    this.revealer.style.WebkitTransform = this.revealer.style.transform =
      transformSettings.val;
    this.revealer.style.WebkitTransformOrigin = this.revealer.style.transformOrigin =
      transformSettings.origin.initial;

    // Set the Revealer´s background color.
    this.revealer.style.backgroundColor =
      revealSettings.bgcolor || defaults.bgcolor;

    // Show it. By default the revealer element has opacity = 0 (CSS).
    this.revealer.style.opacity = 1;

    // Animate it.
    const animationSettings_2 = {
      complete: function() {
        this.isAnimating = false;
        if (typeof revealSettings.onComplete === "function") {
          revealSettings.onComplete(this.content, this.revealer);
        }
      }
    };
    // First animation step.
    const animationSettings = {
      delay: revealSettings.delay || defaults.delay,
      complete: () => {
        this.revealer.style.WebkitTransformOrigin = this.revealer.style.transformOrigin =
          transformSettings.origin.halfway;
        if (typeof revealSettings.onCover === "function") {
          revealSettings.onCover(this.content, this.revealer);
        }
        anime(animationSettings_2);
      }
    };

    animationSettings.targets = animationSettings_2.targets = this.revealer;
    animationSettings.duration = animationSettings_2.duration =
      revealSettings.duration || defaults.duration;
    animationSettings.easing = animationSettings_2.easing =
      revealSettings.easing || defaults.easing;

    const coverArea = revealSettings.coverArea || defaults.coverArea;
    if (direction === "lr" || direction === "rl") {
      animationSettings.scaleX = [0, 1];
      animationSettings_2.scaleX = [1, coverArea / 100];
    } else {
      animationSettings.scaleY = [0, 1];
      animationSettings_2.scaleY = [1, coverArea / 100];
    }

    if (typeof revealSettings.onStart === "function") {
      revealSettings.onStart(this.content, this.revealer);
    }
    anime(animationSettings);
  };
}

export const swipeColor = ({
  el,
  color,
  direction = "rl",
  delay = 0,
  onCover = el => {
    el.style.opacity = 1;
  },
  onStart = () => {},
  onComplete = () => {},
  show = "onScroll",
  full = false
}) => {
  // const bgcolor = colors[color];
  const revealEl = new Reveal(el, {
    revealSettings: {
      bgcolor: color,
      direction,
      delay,
      onCover,
      onStart,
      onComplete
    }
  });

  if (show === "onScroll") {
    // reveal on scroll
    // attach watcher to trigger reveal when in view
    const watcher = window.scrollMonitor.create(el, 0);
    if (full) {
      watcher.fullyEnterViewport(function() {
        revealEl.reveal();
        watcher.destroy();
      });
    } else {
      watcher.enterViewport(function() {
        revealEl.reveal();
        watcher.destroy();
      });
    }
  } else if (show === "onLoad") {
    revealEl.reveal();
  } else {
    return revealEl;
  }
};
