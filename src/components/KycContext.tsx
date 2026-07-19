import { createContext, useContext, useState, type ReactNode } from "react";
import KycDialog from "./KycDialog";

interface KycContextValue {
  openKyc: () => void;
}

const KycContext = createContext<KycContextValue>({ openKyc: () => {} });

export function useKyc() {
  return useContext(KycContext);
}

export function KycProvider({ children }: { children: ReactNode }) {
  const [kycOpen, setKycOpen] = useState(false);

  return (
    <KycContext.Provider value={{ openKyc: () => setKycOpen(true) }}>
      {children}
      <KycDialog open={kycOpen} onClose={() => setKycOpen(false)} />
    </KycContext.Provider>
  );
}
