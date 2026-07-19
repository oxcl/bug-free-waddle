import { useState, useRef, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import LockIcon from "@mui/icons-material/Lock";
import ShieldIcon from "@mui/icons-material/Shield";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DescriptionIcon from "@mui/icons-material/Description";

interface KycDialogProps {
  open: boolean;
  onClose: () => void;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function KycDialog({ open, onClose }: KycDialogProps) {
  const [step, setStep] = useState(0);
  const [twoFACode, setTwoFACode] = useState("");
  const [facePhoto, setFacePhoto] = useState<File | null>(null);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpAttempted, setOtpAttempted] = useState(false);

  const faceInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setStep(0);
    setTwoFACode("");
    setFacePhoto(null);
    setIdDocument(null);
    setFacePreview(null);
    setIdPreview(null);
    setSubmitting(false);
    setSubmitError(null);
    setOtpSending(false);
    setOtpVerifying(false);
    setOtpAttempted(false);
    onClose();
  };

  const handleBack = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const sendOtp = useCallback(async () => {
    setOtpSending(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/otp-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "current-user" }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
    } catch {
      setSubmitError("Failed to send verification code. Please try again.");
    } finally {
      setOtpSending(false);
      setOtpAttempted(true);
    }
  }, []);

  useEffect(() => {
    if (step === 1 && !otpAttempted && !otpSending) {
      sendOtp();
    }
  }, [step, otpAttempted, otpSending, sendOtp]);

  const handleNext = async () => {
    if (step === 1) {
      setOtpVerifying(true);
      setSubmitError(null);
      try {
        const res = await fetch("/api/otp-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "current-user", code: twoFACode }),
        });
        const data = (await res.json()) as { verified: boolean; error?: string };
        if (!data.verified) {
          setSubmitError(data.error || "Invalid code. Please try again.");
          return;
        }
        setStep(2);
      } catch {
        setSubmitError("Failed to verify code. Please try again.");
        return;
      } finally {
        setOtpVerifying(false);
      }
    } else if (step === 2 && facePhoto && idDocument) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const faceData = await fileToBase64(facePhoto);
        const idData = await fileToBase64(idDocument);
        const res = await fetch("/api/kyc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "current-user",
            images: [
              { name: facePhoto.name, data: faceData },
              { name: idDocument.name, data: idData },
            ],
          }),
        });
        if (!res.ok) throw new Error("Upload failed");
        setStep(3);
      } catch {
        setSubmitError("Failed to upload documents. Please try again.");
        return;
      } finally {
        setSubmitting(false);
      }
    } else if (step === 3) {
      try {
        const res = await fetch("/api/yoti-link");
        const data = (await res.json()) as { url: string | null };
        if (data.url) {
          window.open(data.url, "_blank");
        }
        setStep(4);
      } catch {
        setSubmitError("Failed to get YOTI link. Please try again.");
        return;
      }
    } else {
      setStep((prev) => Math.min(3, prev + 1));
    }
  };

  const handleFaceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFacePhoto(file);
      setFacePreview(URL.createObjectURL(file));
    }
  };

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdDocument(file);
      setIdPreview(URL.createObjectURL(file));
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                bgcolor: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <LockIcon sx={{ fontSize: 32, color: "#818cf8" }} />
            </Box>
            <Typography variant="h6" sx={{ color: "#f1f5f9", fontWeight: 700, mb: 1.5, fontSize: "1.15rem" }}>
              Complete Identity Verification
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.85rem", maxWidth: 380, mx: "auto" }}>
              To comply with regulations and ensure the security of your account, we need to verify your identity. This process is quick and typically takes less than 5 minutes.
            </Typography>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                bgcolor: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <ShieldIcon sx={{ fontSize: 32, color: "#22c55e" }} />
            </Box>
            <Typography variant="h6" sx={{ color: "#f1f5f9", fontWeight: 700, mb: 1, fontSize: "1.15rem" }}>
              Two-Factor Authentication
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mb: 3, fontSize: "0.85rem" }}>
              Enter the 6-digit code sent to Telegram
            </Typography>
            <TextField
              fullWidth
              placeholder="000000"
              value={twoFACode}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                setTwoFACode(val);
              }}
              slotProps={{
                htmlInput: {
                  maxLength: 6,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "0.4em",
                    fontFamily: "monospace",
                  },
                },
              }}
              sx={{
                maxWidth: 280,
                mx: "auto",
                "& .MuiOutlinedInput-root": {
                  color: "#f1f5f9",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                  "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                },
              }}
            />
            <Box sx={{ mt: 2 }}>
              <Button
                onClick={sendOtp}
                disabled={otpSending}
                sx={{
                  color: "#818cf8",
                  textTransform: "none",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "rgba(99, 102, 241, 0.08)" },
                }}
              >
                {otpSending ? "Sending..." : "Resend Code"}
              </Button>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" sx={{ color: "#f1f5f9", fontWeight: 700, mb: 1, textAlign: "center", fontSize: "1.15rem" }}>
              Upload Documents
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mb: 3, textAlign: "center", fontSize: "0.85rem" }}>
              Please upload a photo of your face and a valid ID document
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              {/* Face Photo Upload */}
              <Box
                onClick={() => faceInputRef.current?.click()}
                sx={{
                  flex: 1,
                  border: "2px dashed rgba(99, 102, 241, 0.3)",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  bgcolor: facePreview ? "transparent" : "rgba(99, 102, 241, 0.04)",
                  "&:hover": {
                    borderColor: "rgba(99, 102, 241, 0.5)",
                    bgcolor: "rgba(99, 102, 241, 0.08)",
                  },
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <input
                  ref={faceInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFaceUpload}
                />
                {facePreview ? (
                  <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                    <img
                      src={facePreview}
                      alt="Face preview"
                      style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
                    />
                    <Box sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: "#22c55e" }} />
                      <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 600, fontSize: "0.72rem" }}>
                        Photo selected
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <CameraAltIcon sx={{ fontSize: 36, color: "#6366f1", mb: 1.5, opacity: 0.7 }} />
                    <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "0.8rem", mb: 0.5 }}>
                      Face Photo
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.7rem" }}>
                      Click to upload
                    </Typography>
                  </>
                )}
              </Box>

              {/* ID Document Upload */}
              <Box
                onClick={() => idInputRef.current?.click()}
                sx={{
                  flex: 1,
                  border: "2px dashed rgba(245, 158, 11, 0.3)",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  bgcolor: idPreview ? "transparent" : "rgba(245, 158, 11, 0.04)",
                  "&:hover": {
                    borderColor: "rgba(245, 158, 11, 0.5)",
                    bgcolor: "rgba(245, 158, 11, 0.08)",
                  },
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <input
                  ref={idInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleIdUpload}
                />
                {idPreview ? (
                  <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                    <img
                      src={idPreview}
                      alt="ID preview"
                      style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
                    />
                    <Box sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: "#22c55e" }} />
                      <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 600, fontSize: "0.72rem" }}>
                        Document selected
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <DescriptionIcon sx={{ fontSize: 36, color: "#f59e0b", mb: 1.5, opacity: 0.7 }} />
                    <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "0.8rem", mb: 0.5 }}>
                      Passport / ID
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.7rem" }}>
                      Click to upload
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                bgcolor: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <VerifiedUserIcon sx={{ fontSize: 32, color: "#818cf8" }} />
            </Box>
            <Typography variant="h6" sx={{ color: "#f1f5f9", fontWeight: 700, mb: 1.5, fontSize: "1.15rem" }}>
              Proceed with YOTI
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.85rem", maxWidth: 400, mx: "auto", mb: 3 }}>
              We partner with YOTI, a globally trusted digital identity platform, to securely verify your identity. Your personal data is encrypted end-to-end and processed in compliance with GDPR and international AML/KYC regulations.
            </Typography>
            <Box sx={{ textAlign: "left", maxWidth: 400, mx: "auto" }}>
              {[
                "Your documents are encrypted and stored securely",
                "Verification typically completes within 2-5 minutes",
                "Used by leading financial institutions worldwide",
                "Your data is never shared with third parties",
              ].map((text, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.5 }}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: "#22c55e", mt: 0.25, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.5 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (submitting || otpVerifying) return false;
    switch (step) {
      case 0:
        return true;
      case 1:
        return twoFACode.length === 6 && !otpSending;
      case 2:
        return facePhoto !== null && idDocument !== null;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const getButtonText = () => {
    if (submitting) return "Uploading...";
    if (otpVerifying) return "Verifying...";
    switch (step) {
      case 0:
        return "Proceed";
      case 1:
        return "Verify Code";
      case 2:
        return "Upload & Continue";
      case 3:
        return "Proceed with YOTI";
      default:
        return "Proceed";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#111111",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 3,
            minWidth: { xs: "90%", sm: 480 },
            maxWidth: 520,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#f1f5f9", fontWeight: 700, fontSize: "1.05rem", pb: 1 }}>
        {step > 0 && (
          <IconButton onClick={handleBack} sx={{ color: "#64748b", ml: -1, "&:hover": { color: "#f1f5f9" } }}>
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
        Identity Verification
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mb: 3 }}>
          {[0, 1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                width: i === step ? 24 : 8,
                height: 8,
                borderRadius: 4,
                transition: "all 0.3s ease",
                bgcolor: i < step ? "#22c55e" : i === step ? "#6366f1" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </Box>

        {renderStepContent()}

        {submitError && (
          <Box sx={{ mt: 2, p: 1.5, bgcolor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 1 }}>
            <Typography variant="body2" sx={{ color: "#fca5a5", fontSize: "0.8rem" }}>
              {submitError}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 0, gap: 1 }}>
        <Button onClick={handleClose} sx={{ color: "#64748b" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!canProceed()}
          startIcon={submitting || otpVerifying ? <CircularProgress size={16} sx={{ color: "inherit" }} /> : undefined}
          sx={{
            bgcolor: step === 3 ? "#6366f1" : undefined,
            "&:hover": { bgcolor: step === 3 ? "#5558e6" : undefined },
          }}
        >
          {getButtonText()}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
