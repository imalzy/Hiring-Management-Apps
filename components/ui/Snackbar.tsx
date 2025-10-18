import Image from "next/image";

import { toast } from "react-hot-toast";
import { CircleAlert, CircleX } from "lucide-react";

type Variant = "success" | "error" | "warning";

const COLORS = {
  success: "#01959F",
  error: "#E11428",
  warning: "#FA9810",
};

const ICONS = {
  success: (
    <Image
      src={"/assets/icons/check.svg"}
      width={24}
      height={24}
      alt="success"
    />
  ),
  error: <CircleX width={24} height={24} color={COLORS.error} />,
  warning: <CircleAlert width={24} height={24} color={COLORS.warning} />,
};

const SnackBar = (message: string, variant: Variant) => {
  const color = COLORS[variant];
  const icon = ICONS[variant];

  toast.custom((t) => (
    <div
      className={`flex items-center gap-2 p-4 w-[319px] h-[56px] bg-white border-l-4 shadow-md rounded-lg transition-all ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      <p className="flex-1 text-sm text-[var(--natural-90)] font-bold capitalize">
        {message}
      </p>
      <button onClick={() => toast.dismiss(t.id)}>
        <Image
          src={"/assets/icons/close.svg"}
          alt="close"
          height={20}
          width={20}
        />
      </button>
    </div>
  ));
};

export const showSuccessSnackBar = (msg: string) => SnackBar(msg, "success");
export const showErrorSnackBar = (msg: string) => SnackBar(msg, "error");
export const showWarningSnackBar = (msg: string) => SnackBar(msg, "warning");
