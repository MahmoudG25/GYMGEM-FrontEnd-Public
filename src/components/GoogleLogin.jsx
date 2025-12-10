import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/ToastContext";

export default function GoogleLogin({ signType, onStart, onComplete }) {
	const navigate = useNavigate();

	const { showToast } = useToast();

	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

	// If client ID is missing, show a helpful message instead of attempting to load GSI
	if (!clientId) {
		return (
			<div className="w-full">
				<div className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border bg-background/80 px-4 text-sm font-semibold text-foreground">
					<span className="mr-2">⚠️</span>
					Google sign-in is not configured. Set `VITE_GOOGLE_CLIENT_ID` in your `.env` and restart dev server.
				</div>
			</div>
		);
	}

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;

		let attachedButton = null;
		let clickHandler = null;

		const handleCredentialResponse = async (response) => {
			if (onStart) onStart();
			try {
				const id_token = response.credential;
				// POST id_token to your custom accounts/google/login/ endpoint (backend should verify)
				const res = await axios.post(
					"http://127.0.0.1:8000/api/auth/social/google/login/",
					{ id_token },
					{ headers: { "Content-Type": "application/json" } }
				);

				localStorage.setItem("access", res.data.access);
				localStorage.setItem("refresh", res.data.refresh);
				localStorage.setItem("user", JSON.stringify(res.data.account));

				if (signType === 'signup') {
					showToast("Registered Successfully", { type: "success" });
					navigate("/role");
				} else {
					showToast("Sign in successful!", { type: "success" });
					navigate("/");
				}
			} catch (error) {
				console.error("Error during login:", error);
				showToast("Login failed. Please try again.", { type: "error" });
			} finally {
				if (onComplete) onComplete();
			}
		};


		script.onload = () => {
			let buttonText;

			if (signType === 'signup') {
				buttonText = 'signup_with';
			} else {
				buttonText = 'signin_with';
			}

			if (window.google && window.google.accounts && window.google.accounts.id) {
				window.google.accounts.id.initialize({
					client_id: clientId,
					callback: handleCredentialResponse,
				});

				window.google.accounts.id.renderButton(
					document.getElementById("google-signup-button"),
					{ theme: "outline", size: "large", text: buttonText }
				);

				// Attach click handler to the generated button to start buffering immediately on user action
				const container = document.getElementById("google-signup-button");
				if (container) {
					attachedButton = container.firstElementChild || container.querySelector('button') || container.querySelector('div');
					if (attachedButton) {
						clickHandler = () => { if (onStart) onStart(); };
						attachedButton.addEventListener('click', clickHandler);
					}
				}

				// optional: show One Tap
				// window.google.accounts.id.prompt();
			}
		};

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
			if (attachedButton && clickHandler) {
				try { attachedButton.removeEventListener('click', clickHandler); } catch (e) { }
			}
			if (window.google && window.google.accounts && window.google.accounts.id) {
				try {
					window.google.accounts.id.cancel();
				} catch (e) { }
			}
		};
	}, [navigate, clientId, onStart, onComplete, signType]);

	return (
		<div>
			<div id="google-signup-button"></div>
		</div>
	);
}
