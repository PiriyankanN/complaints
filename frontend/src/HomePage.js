import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const HomePage = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const complaintBtnRef = useRef(null);
  const feedbackBtnRef = useRef(null);
  const featureItemsRef = useRef([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!headingRef.current || !subheadingRef.current || !complaintBtnRef.current || !feedbackBtnRef.current) return;

      const masterTL = gsap.timeline();

      const splitHeading = new SplitText(headingRef.current, {
        type: "lines,chars",
        linesClass: "split-line"
      });

      masterTL.from(splitHeading.chars, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.03
      });

      const splitSubheading = new SplitText(subheadingRef.current, {
        type: "lines",
        linesClass: "split-line"
      });

      masterTL.from(splitSubheading.lines, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1
      }, "-=0.4");

      masterTL.from([complaintBtnRef.current, feedbackBtnRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");

      if (featureItemsRef.current.length > 0) {
        masterTL.from(featureItemsRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.2");
      }

      return () => {
        splitHeading.revert();
        splitSubheading.revert();
        masterTL.kill();
      };
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const addFeatureToRefs = (el) => {
    if (el && !featureItemsRef.current.includes(el)) {
      featureItemsRef.current.push(el);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden"
      }}
    >
      <header className="py-5 text-center">
        <h1
          ref={headingRef}
          className="display-4 fw-bold text-dark"
        >
          Solution and Reaction meets satisfaction
        </h1>
        <p
          ref={subheadingRef}
          className="lead text-muted"
        >
          Manage complaints and feedback effectively
        </p>
      </header>

      <main className="container my-4 text-center">
        <div className="d-flex justify-content-center gap-4 mb-5">
          <button
            ref={complaintBtnRef}
            className="btn btn-primary px-4 py-2"
            onClick={() => navigate("/complaint-home")}
          >
           Complaints
          </button>
          <button
            ref={feedbackBtnRef}
            className="btn btn-outline-primary px-4 py-2"
            onClick={() => navigate("/feedback")}
          >
           Feedback
          </button>
        </div>

        <div className="row">
          {["Fast Response", "Smart Dashboard", "User Friendly"].map((feature, index) => (
            <div
              key={index}
              ref={addFeatureToRefs}
              className="col-md-4 mb-4"
            >
              <div className="card shadow-sm border-0 p-4 card-hover-effect">
                <h5 className="card-title text-primary">{feature}</h5>
                <p className="card-text text-muted">
                   
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center mt-auto py-3 text-muted">
        &copy; {new Date().getFullYear()} RENT NEST. All rights reserved.
      </footer>

      <style>
        {`
          .card-hover-effect:hover {
            transform: translateY(-4px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          body {
            font-feature-settings: 'kern', 'liga', 'clig', 'calt';
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
          }
          .split-line {
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
