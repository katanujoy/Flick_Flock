import { useState } from "react";
import "../styles/MembershipCard.css";
import Swal from "sweetalert2";

function MembershipCard({ clubId, onClose }) {
  const [role, setRole] = useState("");

  const handleMembershipSubmit = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        await Swal.fire({
          icon: "warning",
          title: "Not Logged In",
          text: "Please log in to proceed.",
        });
        return;
      }

      // Ask for phone number
      const { value: phone } = await Swal.fire({
        title: "Enter Phone Number",
        input: "text",
        inputLabel: "Safaricom Number (e.g. 712345678)",
        inputPlaceholder: "712345678",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value || !/^\d{9}$/.test(value)) {
            return "Enter a valid 9-digit Safaricom number";
          }
        },
      });

      if (!phone) return; // User cancelled

      const phoneNumber = phone.startsWith("+") ? phone : `+254${phone}`;
      const amount = 200;

      await Swal.fire({
        title: "Processing Payment",
        text: "Check your phone to complete the M-Pesa payment...",
        icon: "info",
        timer: 5000,
        showConfirmButton: false,
      });

      const paymentRes = await fetch("http://localhost:5000/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, amount }),
      });

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok || !paymentData || paymentData.ResponseCode !== "0") {
        await Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Something went wrong with M-Pesa. Try again.",
        });
        return;
      }

      // Create membership
      const membershipRes = await fetch("http://localhost:5000/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: storedUser.id,
          club_id: clubId,
          role: role.trim() === "" ? null : role,
        }),
      });

      if (!membershipRes.ok) {
        const errorData = await membershipRes.json();
        throw new Error(errorData.message || "Membership creation failed.");
      }

      await Swal.fire({
        icon: "success",
        title: "Membership Successful!",
        text: "You're now a member of the club.",
      });

      setRole("");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: "error",
        title: "An Error Occurred",
        text: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="membership-card">
      <h3>Become a Member</h3>
      <label>
        Role (optional):
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </label>
      <button onClick={handleMembershipSubmit}>Pay & Join (Kshs 200)</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default MembershipCard;
