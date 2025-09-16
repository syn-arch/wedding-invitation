import BankImg from "./assets/bri.png";
import ChipImg from "./assets/chip-atm.png";

type BriCardProps = {
  name: string;
  accountNumber: string; // e.g. "123401000123456"
  className?: string;
};

const CopyIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h6A2.25 2.25 0 0 1 19.5 9.75v6A2.25 2.25 0 0 1 17.25 18h-6A2.25 2.25 0 0 1 9 15.75v-6Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6.75 15.75A2.25 2.25 0 0 1 4.5 13.5v-6A2.25 2.25 0 0 1 6.75 5.25h6A2.25 2.25 0 0 1 15 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
function formatAcc(num: string) {
  // BRI often shown in groups (e.g., 1234 0100 0123456) — feel free to adjust
  return num
    .replace(/\s+/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    await alert("Nomor rekening disalin ke clipboard");
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

export default function BankCard({
  name,
  accountNumber,
  className,
}: BriCardProps) {
  const formatted = formatAcc(accountNumber);

  return (
    <div
      className={[
        "relative w-[270px] md:w-[350px] h-[220px] select-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Card body */}
      <div
        className="absolute inset-0 rounded-3xl p-5 text-white shadow-xl 
                      bg-gradient-to-br from-[#0A3D91] via-[#0A58CA] to-[#051C3B]
                      ring-1 ring-white/10"
      >
        {/* glossy overlay */}
        <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-64 rotate-12 rounded-3xl bg-white/15 blur-xl" />

        {/* BRI logo */}
        <img
          src={BankImg}
          alt=""
          className="h-5 ms-auto brightness-0 invert"
        />

        {/* Chip + hologram */}
        <div className="mt-0 flex items-center gap-4">
          <img src={ChipImg} className="h-12 " alt="" />
        </div>

        {/* Account number */}
        <div className="text-left">
          <div className="text-sm uppercase tracking-widest text-white/70">
            No. Rekening
          </div>
          <div className="mt-1 text-sm tabular-nums tracking-widest font-semibold">
            {formatted}
          </div>
          <div className="mt-1 text-sm tabular-nums tracking-widest font-semibold">
            {name}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => copy(accountNumber)}
              className="mt-2  inline-flex items-start gap-1.5 rounded-3xl border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium 
                       hover:bg-white/15 active:scale-[.98] transition"
              aria-label="Salin nomor rekening"
            >
              <CopyIcon />
              Salin
            </button>
          </div>
        </div>

        <div className="absolute w-[93%] mx-auto bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-cyan-300/50 via-white/60 to-violet-300/50" />
      </div>

      <div className="absolute -bottom-6 left-6 right-6 h-6 rounded-[50%] bg-black/20 blur-xl" />
    </div>
  );
}
