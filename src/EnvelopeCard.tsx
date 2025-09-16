import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

export default function EnvelopeCard() {
  const letterRef = useRef(null);
  const shadowRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CSSRulePlugin);

    // target pseudo element :before
    const flapRule = CSSRulePlugin.getRule(".envelope:before");

    // Timeline 1: flap & letter
    t1Ref.current = gsap
      .timeline({ paused: true })
      .to(flapRule, {
        duration: 0.5,
        cssRule: { rotateX: 180 },
      })
      .set(flapRule, { cssRule: { zIndex: 10 } })
      .to(letterRef.current, {
        y: -200,
        duration: 0.9,
        ease: "back.inOut(1.5)",
      })
      .set(letterRef.current, { zIndex: 40 })
      .to(letterRef.current, {
        duration: 0.7,
        ease: "back.out(.4)",
        y: -5,
        z: 250,
      });

    // Timeline 2: shadow
    t2Ref.current = gsap.timeline({ paused: true }).to(shadowRef.current, {
      delay: 1.4,
      width: 450,
      boxShadow: "-75px 150px 10px 5px #eeeef3",
      ease: "back.out(.2)",
      duration: 0.7,
    });

    return () => {
      t1Ref.current?.kill();
      t2Ref.current?.kill();
    };
  }, []);

  const openCard = () => {
    t1Ref.current?.play();
    t2Ref.current?.play();
  };

  return (
    <>
      <div className="container-r">
        <div className="content-r">
          <div className="envelope" onClick={openCard} />
          <div className="letter-r" ref={letterRef}>
            <div className="body">
              <div className="message">
                Assalamu’alaikum Warahmatullahi Wabarakatuh. Dengan segala
                kerendahan hati, izinkan kami berbagi kabar bahagia ini kepada
                Sahabat dan Keluarga tercinta. Semoga langkah kecil ini menjadi
                doa indah yang ikut hadir dalam kisah cinta kami.
              </div>
            </div>
          </div>
          <div className="shadow-r" ref={shadowRef} />
          <div className="controls">
            <button className="btn" onClick={openCard}>
              Open
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
