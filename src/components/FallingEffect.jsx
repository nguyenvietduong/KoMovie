import React from "react";
import effectsConfig from "../config/effectsConfig";

const randomValue = (min, max) => Math.random() * (max - min) + min;

export default function FallingEffect({ effect = "cherryBlossoms" }) {
    const { symbol, colors, sizeRange, speedRange, opacityRange } = effectsConfig[effect];
    const NUM_ITEMS = 20;

    const items = [];

    // Kiểm tra hiệu ứng lantern để chọn animation phù hợp
    const isLantern = effect === "lanterns";

    for (let i = 0; i < NUM_ITEMS; i++) {
        const style = {
            left: `${randomValue(0, 100)}vw`,
            animationDuration: `${randomValue(speedRange[0], speedRange[1])}s`,
            animationDelay: `${randomValue(0, speedRange[1])}s`,
            fontSize: `${randomValue(sizeRange[0], sizeRange[1])}px`,
            opacity: randomValue(opacityRange[0], opacityRange[1]),
            color: colors[Math.floor(Math.random() * colors.length)],
        };

        items.push(
            <span key={i} className="falling-item" style={style}>
                {symbol}
            </span>
        );
    }

    return (
        <>
            <style>{`
        .falling-item {
          position: fixed;
          user-select: none;
          pointer-events: none;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          z-index: 9999;
          will-change: transform, opacity;
          ${isLantern ? "bottom: -50px;" : "top: -50px;"}
          animation-name: ${isLantern ? "rise" : "fall"};
        }
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes rise {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) rotate(-360deg);
            opacity: 0;
          }
        }
      `}</style>
            {items}
        </>
    );
}
