export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
      <svg
        viewBox="25 25 50 50"
        className="w-24"
        style={{
          transformOrigin: 'center',
          animation: 'rotate4 2s linear infinite',
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="hsl(214, 97%, 59%)"
          strokeWidth="3"
          strokeDasharray="1, 200"
          strokeDashoffset={0}
          strokeLinecap="round"
          style={{
            animation: 'dash4 1.5s ease-in-out infinite',
          }}
        />
      </svg>

      {/* Inline CSS for keyframes */}
      <style>
        {`
          @keyframes rotate4 {
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes dash4 {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90, 200;
              stroke-dashoffset: -35px;
            }
            100% {
              stroke-dashoffset: -125px;
            }
          }
        `}
      </style>
    </div>
  );
}
