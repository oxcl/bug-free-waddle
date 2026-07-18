import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

const companies = [
  "ООО ТехноСталь", "ООО Восток-Ресурс", "ЗАО Сибирский метиз",
  "ПАО Ленгаз", "ООО УралПромСнаб", "ООО Металлург-Сервис",
  "ООО АльянсХим", "ООО ПромТехноЛизинг", "ЗАО НПК Электромаш",
  "ООО СтройИнвестГрупп", "ПАО Волгонефт", "ООО КМАРудник",
  "ООО НаучПрибор", "ООО ТехноПласт", "ЗАО Мебельная фабрика Восход",
  "ООО Партнер-Нефть", "ООО ГазСервисПлюс", "ООО МонтажСтрой",
  "ООО АгроПромХолдинг", "ООО Ремонтно-строительный трест №1",
  "ООО СпецГидроСтрой", "ООО ЭнергоМаш", "ООО ХимТехноСервис",
  "ООО СМП-24", "ЗАО КБ Капитал", "ООО ТехноЛес",
  "ООО ВодоСтройИнвест", "ООО ПроектИнжиниринг", "ООО ТехноМонтаж",
  "ООО Метиз-Центр", "ООО Стальной Дом", "ООО ТехноСтройГрупп",
  "ПАО Тагил", "ООО Сибирь-НефтеСервис", "ООО Промышленная группа Восток",
  "ООО СтройМашСервис", "ООО НПО Автоматика", "ООО ТехноПромИнвест",
  "ООО ЭнергоСтройСервис", "ООО ТД Металлург", "ООО КранМашСервис",
  "ООО СеверГазСервис", "ООО ТехноСервисПлюс", "ООО АльфаСтрой",
  "ООО Гарант-Строй", "ООО ИнвестСтройГрупп", "ООО КапиталСтрой",
  "ООО МаксимумСтрой", "ООО НадеждаСтрой", "ООО ПрогрессСтрой",
  "ООО СтройДевелопмент", "ООО СтройИнвест", "ООО СтройМастер",
  "ООО ТехноСтрой", "ООО ЭнергоСтрой", "ООО АльянсСтрой",
  "ООО ВостокСтрой", "ООО ГазСтройСервис", "ООО ДорСтрой",
  "ООО ЕвроСтрой", "ООО ЗападСтрой", "ООО ИмпульсСтрой",
  "ООО КомплектСтрой", "ООО ЛидерСтрой", "ООО МеридианСтрой",
  "ООО НоваторСтрой", "ООО ОптимСтрой", "ООО ПионерСтрой",
  "ООО РесурсСтрой", "ООО СтандартСтрой", "ООО ТехноСтройИнвест",
  "ООО УниверсалСтрой", "ООО ФаворитСтрой", "ООО ЦентрСтрой",
  "ООО ЭлитСтрой", "ООО ЮгСтрой", "ООО АлмазСтрой",
  "ООО БайкалСтрой", "ООО ВолгаСтрой", "ООО ДнепрСтрой",
  "ООО ЕнисейСтрой", "ООО ЖивойСтрой", "ООО ИртышСтрой",
  "ООО КамаСтрой", "ООО ЛенСтрой", "ООО МоскваСтрой",
  "ООО НеваСтрой", "ООО ОбьСтрой", "ООО ПоволжьеСтрой",
  "ООО РаздольеСтрой", "ООО СтавропольСтрой", "ООО ТомьСтрой",
  "ООО УралСтрой", "ООО ХабаровскСтрой", "ООО ЧитаСтрой",
  "ООО ЯкутСтрой", "ООО АмурСтрой", "ООО БурятСтрой",
  "ООО ГорныйСтрой", "ООО ЗабайкалСтрой", "ООО КавказСтрой",
  "ООО ЛесСтрой", "ООО МорскойСтрой", "ООО ОмскСтрой",
  "ООО СамарСтрой", "ООО ТульСтрой", "ООО ЧелябСтрой",
];

const MLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="white" />
    <path
      d="M10 30V12L16 22L20 14L24 22L30 12V30"
      stroke="#060918"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [company, setCompany] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#000",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.05) 1px, transparent 0)",
        backgroundSize: "40px 40px",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 440,
          bgcolor: "#0a0d18",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px",
          p: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <MLogo size={48} />
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            MATBEA Enterprise
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
            Institutional Crypto Platform
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Autocomplete
            options={companies}
            value={company}
            onChange={(_, val) => setCompany(val)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Company"
                placeholder="Select your company"
                slotProps={{
                  input: {
                    ...params.slotProps?.input,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <BusinessIcon sx={{ color: "#475569", fontSize: 20 }} />
                        </InputAdornment>
                        {params.slotProps?.input?.startAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.02)",
              },
            }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@company.com"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#475569", fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,0.02)" } }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#475569", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 20, color: "#475569" }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 20, color: "#475569" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,0.02)" } }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 1,
              py: 1.5,
              fontSize: "0.95rem",
              fontWeight: 700,
              borderRadius: "10px",
              textTransform: "none",
              bgcolor: "#ffffff",
              color: "#000",
              "&:hover": { bgcolor: "#e5e5e5" },
            }}
          >
            Sign In
          </Button>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", my: 0.5 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "#475569" }}>
              No account?{" "}
              <Box
                component="span"
                sx={{ color: "#818cf8", cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
              >
                Request Access
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ color: "#475569", cursor: "pointer", "&:hover": { color: "#818cf8" } }}>
              Forgot password?
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
