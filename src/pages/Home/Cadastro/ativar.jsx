import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./ativar.css";

function Ativar() {
  const location = useLocation();
  const navigate = useNavigate();

  const number = location.state?.number || "";
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "");
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    if (val && index < 3) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) inputsRef.current[index - 1].focus();
    }
  };

  const ativarUsuario = async () => {
    if (code.some(v => !v)) {
      setMessage("Preencha todos os dígitos.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/user/ativar", {
        number,
        code: code.join("").toString()
      });

      if (res.status === 200) {
        setMessage("Conta ativada com sucesso!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(res.data.message || "Erro ao ativar.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ativar-container">
      <div className="card">
        <h2>Ativar Conta</h2>
        <p className="numero">WhatsApp: {number}</p>

        <div className="code-inputs">
          {code.map((d, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => (inputsRef.current[i] = el)}
            />
          ))}
        </div>

        <button 
          type="button" 
          onClick={ativarUsuario} 
          disabled={loading}
          className="btn-3d"
        >
          {loading ? "Validando..." : "Confirmar Código"}
        </button>

        {message && (
          <p className={message.includes("sucesso") ? "success" : "erro"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Ativar;
