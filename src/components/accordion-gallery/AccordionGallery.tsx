import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './AccordionGallery.css';

export interface AccordionGalleryItem {
  id?: string;
  image: string;
  label?: string;
  title?: string;
  description?: string;
  date?: string;
  link?: string;
  alt?: string;
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  visibleCount?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
  showNavigation?: boolean;
}

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({
  items = [],
  defaultIndex = 0,
  visibleCount = 3,
  accentColor = 'var(--accent-gold, #cba358)',
  overlayColor = '#000000',
  textColor = '#ffffff',
  height = 460,
  gap = 14,
  radius = 4,
  expandRatio = 0.54,
  orientation = 'horizontal',
  duration = 0.55,
  ease = 'power3.out',
  parallax = 0.35,
  tilt = 5,
  trigger = 'hover',
  showLabels = true,
  grayscale = false,
  className = '',
  showNavigation = true,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const collapsedRefs = useRef<(HTMLElement | null)[]>([]);
  const headingRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const descRefs = useRef<(HTMLElement | null)[]>([]);
  const actionRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const prevActiveRef = useRef<number | null>(null);

  const totalCount = items.length;

  // Responsive screen width tracking
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsiveVisibleCount =
    windowWidth <= 640 ? 1 : windowWidth <= 960 ? 2 : Math.min(visibleCount, totalCount);

  // Global active item index across all items (0 to totalCount - 1)
  const [globalActiveIndex, setGlobalActiveIndex] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(totalCount - 1, 0))
  );

  // Sliding window start index
  const [startIndex, setStartIndex] = useState(0);

  // Keep window in sync with global active index
  useEffect(() => {
    setStartIndex((prevStart) => {
      if (globalActiveIndex < prevStart) {
        return globalActiveIndex;
      }
      if (globalActiveIndex >= prevStart + responsiveVisibleCount) {
        return Math.max(0, globalActiveIndex - responsiveVisibleCount + 1);
      }
      const maxStart = Math.max(0, totalCount - responsiveVisibleCount);
      return Math.min(prevStart, maxStart);
    });
  }, [globalActiveIndex, responsiveVisibleCount, totalCount]);

  const visibleItems = items.slice(startIndex, startIndex + responsiveVisibleCount);
  const visibleItemCount = visibleItems.length;
  const localActiveIndex = Math.max(
    0,
    Math.min(globalActiveIndex - startIndex, visibleItemCount - 1)
  );

  const vertical = orientation === 'vertical';

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current.slice(0, visibleItemCount);
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = visibleItemCount > 1 ? (r * (visibleItemCount - 1)) / (1 - r) : 1;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      const shouldRotate = !vertical && !prefersReduced;
      const prevActive = prevActiveRef.current;
      const isInitial = prevActive === null;

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === localActiveIndex;
        const isEntering = isActive && (isInitial || i !== prevActive);
        const isLeaving = !isActive && prevActive !== null && i === prevActive;
        const media = mediaRefs.current[i];
        const collapsed = collapsedRefs.current[i];
        const heading = headingRefs.current[i];
        const bar = barRefs.current[i];
        const desc = descRefs.current[i];
        const actions = actionRefs.current[i];

        // Animate panel flex-grow cleanly without twisting inactive cards
        tl.to(panel, { flexGrow: isActive ? grow : 1, rotateY: 0, rotateX: 0, duration: dur, ease }, 0);

        // Animate media parallax shift only on active or exiting cards
        if (media && (isActive || isLeaving)) {
          const shift = isActive ? 0 : (localActiveIndex - i) * parallax * 15;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              x: vertical ? 0 : shift,
              y: vertical ? shift : 0,
              filter: `grayscale(${gray})`,
              duration: dur,
              ease,
            },
            0
          );
        }

        // Seamless vertical-to-horizontal text rotation animation
        if (shouldRotate) {
          if (isEntering) {
            // 1. Vertical text swings out into the rotation arc
            if (collapsed) {
              tl.to(
                collapsed,
                {
                  rotation: 35,
                  y: -15,
                  opacity: 0,
                  duration: dur * 0.45,
                  ease: 'power2.in',
                },
                0
              );
            }

            // 2. Horizontal heading swings smoothly from vertical (-70deg) to horizontal (0deg)
            if (heading) {
              tl.fromTo(
                heading,
                {
                  rotation: -70,
                  y: 18,
                  opacity: 0,
                  transformOrigin: 'left bottom',
                },
                {
                  rotation: 0,
                  y: 0,
                  opacity: 1,
                  duration: dur * 0.9,
                  ease: 'power3.out',
                  delay: dur * 0.12,
                },
                0
              );
            }

            // 3. Gold vertical bar rises cleanly alongside the title
            if (bar) {
              tl.fromTo(
                bar,
                { scaleY: 0, opacity: 0, transformOrigin: 'bottom' },
                {
                  scaleY: 1,
                  opacity: 1,
                  duration: dur * 0.7,
                  ease: 'power2.out',
                  delay: dur * 0.25,
                },
                0
              );
            }

            // 4. Description cascades in right underneath
            if (desc) {
              tl.fromTo(
                desc,
                { opacity: 0, y: 12 },
                {
                  opacity: 1,
                  y: 0,
                  duration: dur * 0.7,
                  ease: 'power2.out',
                  delay: dur * 0.32,
                },
                0
              );
            }

            // 5. CTA button slides in cleanly
            if (actions) {
              tl.fromTo(
                actions,
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: dur * 0.65,
                  ease: 'power2.out',
                  delay: dur * 0.38,
                },
                0
              );
            }
          } else if (isLeaving) {
            // When collapsing (ONLY for the panel that was previously active):
            // 1. Description and button quickly dissolve
            if (desc || actions) {
              const elements = [desc, actions].filter(Boolean);
              tl.to(
                elements,
                {
                  opacity: 0,
                  y: 6,
                  duration: dur * 0.3,
                  ease: 'power2.in',
                },
                0
              );
            }

            // 2. Gold bar collapses
            if (bar) {
              tl.to(
                bar,
                {
                  scaleY: 0,
                  opacity: 0,
                  duration: dur * 0.35,
                  ease: 'power2.in',
                },
                0
              );
            }

            // 3. Horizontal heading swings down towards vertical as card collapses
            if (heading) {
              tl.to(
                heading,
                {
                  rotation: -60,
                  y: 15,
                  opacity: 0,
                  duration: dur * 0.45,
                  ease: 'power2.in',
                },
                0
              );
            }

            // 4. Vertical label swings back into position and locks into vertical
            if (collapsed) {
              tl.fromTo(
                collapsed,
                {
                  rotation: 35,
                  y: -12,
                  opacity: 0,
                  transformOrigin: 'center bottom',
                },
                {
                  rotation: 0,
                  y: 0,
                  opacity: 0.85,
                  duration: dur * 0.75,
                  ease: 'power3.out',
                  delay: dur * 0.22,
                },
                0
              );
            }
          } else if (isInitial) {
            // Initial setup only: lock inactive panels into clean collapsed state
            if (collapsed) gsap.set(collapsed, { rotation: 0, y: 0, opacity: 0.85 });
            if (heading) gsap.set(heading, { opacity: 0, rotation: -60, y: 15 });
            if (bar) gsap.set(bar, { opacity: 0, scaleY: 0 });
            if (desc) gsap.set(desc, { opacity: 0 });
            if (actions) gsap.set(actions, { opacity: 0 });
          }
        } else {
          // Mobile / reduced-motion fallback (clean straight opacity fade)
          if (isEntering) {
            if (collapsed) tl.to(collapsed, { opacity: 0, duration: dur * 0.4 }, 0);
            if (heading) tl.to(heading, { opacity: 1, y: 0, duration: dur * 0.7 }, 0);
            if (bar) tl.to(bar, { scaleY: 1, opacity: 1, duration: dur * 0.6 }, 0);
            if (desc) tl.to(desc, { opacity: 1, y: 0, duration: dur * 0.7 }, 0);
            if (actions) tl.to(actions, { opacity: 1, y: 0, duration: dur * 0.7 }, 0);
          } else if (isLeaving) {
            if (desc || actions) {
              const elements = [desc, actions].filter(Boolean);
              tl.to(elements, { opacity: 0, duration: dur * 0.3 }, 0);
            }
            if (bar) tl.to(bar, { opacity: 0, duration: dur * 0.3 }, 0);
            if (heading) tl.to(heading, { opacity: 0, duration: dur * 0.3 }, 0);
            if (collapsed) tl.to(collapsed, { opacity: 0.85, duration: dur * 0.5 }, 0);
          } else if (isInitial) {
            if (collapsed) gsap.set(collapsed, { opacity: 0.85, y: 0, rotation: 0 });
            if (heading) gsap.set(heading, { opacity: 0 });
            if (bar) gsap.set(bar, { opacity: 0 });
            if (desc) gsap.set(desc, { opacity: 0 });
            if (actions) gsap.set(actions, { opacity: 0 });
          }
        }
      });

      prevActiveRef.current = localActiveIndex;
      tlRef.current = tl;
    },
    [
      localActiveIndex,
      visibleItemCount,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      prefersReduced,
    ]
  );

  // Synchronize layout on mount, window index shift, or item change
  useEffect(() => {
    applyLayout(true);
  }, [applyLayout, startIndex, globalActiveIndex, responsiveVisibleCount]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i: number) => {
    if (trigger === 'hover') {
      setGlobalActiveIndex(startIndex + i);
    }
  };

  const handleClick = (i: number, e: MouseEvent) => {
    const targetGlobalIndex = startIndex + i;
    if (targetGlobalIndex !== globalActiveIndex) {
      e.preventDefault();
      setGlobalActiveIndex(targetGlobalIndex);
    }
  };

  const handleKeyDown = (_i: number, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handlePrev();
    }
  };

  const handlePrev = () => {
    if (globalActiveIndex > 0) {
      setGlobalActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (globalActiveIndex < totalCount - 1) {
      setGlobalActiveIndex((prev) => prev + 1);
    }
  };

  const rootStyle = {
    '--ag-accent': accentColor,
    '--ag-overlay': overlayColor,
    '--ag-text': textColor,
    '--ag-gap': `${gap}px`,
    '--ag-radius': `${radius}px`,
    height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
  } as CSSProperties;

  const formattedCurrent = String(globalActiveIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <div className="accordion-gallery-wrapper">
      {/* Top Controls Bar: Counter & Navigation Arrows */}
      {showNavigation && totalCount > 1 && (
        <div className="accordion-gallery-controls" aria-label="Gallery navigation controls">
          <div className="gallery-counter">
            <span className="counter-label">EVENT</span>
            <span className="counter-active">{formattedCurrent}</span>
            <span className="counter-divider">/</span>
            <span className="counter-total">{formattedTotal}</span>
          </div>

          <div className="gallery-nav-arrows">
            <button
              type="button"
              className="gallery-arrow-btn gallery-arrow-prev"
              onClick={handlePrev}
              disabled={globalActiveIndex === 0}
              aria-label="View previous event"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              className="gallery-arrow-btn gallery-arrow-next"
              onClick={handleNext}
              disabled={globalActiveIndex === totalCount - 1}
              aria-label="View next event"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Accordion Gallery */}
      <div
        ref={rootRef}
        className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
        style={rootStyle}
        role="list"
        aria-label="Upcoming Events Gallery"
      >
        {visibleItems.map((item, i) => {
          const isActive = i === localActiveIndex;
          const displayTitle = item.title || item.label || '';

          return (
            <div
              key={item.id || startIndex + i}
              ref={(el: HTMLDivElement | null) => {
                panelRefs.current[i] = el;
              }}
              className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
              style={{ borderRadius: `${radius}px` }}
              onClick={(e) => handleClick(i, e)}
              onMouseEnter={() => handleEnter(i)}
              onFocus={() => setGlobalActiveIndex(startIndex + i)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              role="listitem"
              tabIndex={0}
              aria-current={isActive ? 'true' : undefined}
              aria-label={displayTitle}
            >
              <span className="ag-panel__frame">
                <span
                  className="ag-panel__media"
                  ref={(el: HTMLElement | null) => {
                    mediaRefs.current[i] = el;
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.alt || displayTitle}
                    draggable={false}
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="ag-panel__overlay" aria-hidden="true" />
              </span>

              {/* Date Badge */}
              {item.date && (
                <span className="ag-panel__date-badge">
                  {item.date}
                </span>
              )}

              {/* Inactive Title Strip */}
              {showLabels && (
                <div
                  className="ag-panel__collapsed-label"
                  ref={(el: HTMLDivElement | null) => {
                    collapsedRefs.current[i] = el;
                  }}
                  aria-hidden={isActive}
                >
                  <span className="ag-panel__collapsed-title">{displayTitle}</span>
                </div>
              )}

              {/* Active Expanded Card Content */}
              <div
                className="ag-panel__content"
                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
              >
                <div
                  className="ag-panel__heading-wrap"
                  ref={(el: HTMLDivElement | null) => {
                    headingRefs.current[i] = el;
                  }}
                >
                  <span
                    className="ag-panel__bar"
                    ref={(el: HTMLElement | null) => {
                      barRefs.current[i] = el;
                    }}
                  />
                  <h3 className="ag-panel__text">{displayTitle}</h3>
                </div>

                {item.description && (
                  <p
                    className="ag-panel__description"
                    ref={(el: HTMLParagraphElement | null) => {
                      descRefs.current[i] = el;
                    }}
                  >
                    {item.description}
                  </p>
                )}

                {item.link && (
                  <div
                    className="ag-panel__actions"
                    ref={(el: HTMLDivElement | null) => {
                      actionRefs.current[i] = el;
                    }}
                  >
                    <Link
                      to={item.link}
                      className="btn-event-view"
                      aria-label={`View details for ${displayTitle}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>VIEW EVENT</span>
                      <span className="cta-arrow" aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionGallery;
