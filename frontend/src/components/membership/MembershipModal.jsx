import { useState, useEffect } from "react";

import { getMemberDropdown } from "../../services/userService";
import { getPlans } from "../../services/membershipPlanService";

function MembershipModal({
  open,
  onClose,
  onSave,
  membership,
}) {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    plan_id: "",
  });

  useEffect(() => {
    if (open) {
      loadDropdowns();
    }
  }, [open]);

  useEffect(() => {
    if (membership) {
      setForm({
        user_id: membership.user_id,
        plan_id: membership.plan_id,
      });
    } else {
      setForm({
        user_id: "",
        plan_id: "",
      });
    }
  }, [membership]);

  const loadDropdowns = async () => {
    try {
      const users = await getMemberDropdown();
      const membershipPlans = await getPlans();

      setMembers(users);
      setPlans(membershipPlans);
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) return null;

  const selectedPlan = plans.find(
    (p) => p.id === Number(form.plan_id)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-[520px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          {membership ? "Edit Membership" : "Add Membership"}
        </h2>

        {/* Member */}

        <label className="font-medium">
          Select Member
        </label>

        <select
          className="w-full border rounded-xl p-3 mt-2 mb-5"
          value={form.user_id}
          onChange={(e) =>
            setForm({
              ...form,
              user_id: e.target.value,
            })
          }
        >
          <option value="">
            Select Member
          </option>

          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.email})
            </option>
          ))}
        </select>

        {/* Plan */}

        <label className="font-medium">
          Membership Plan
        </label>

        <select
          className="w-full border rounded-xl p-3 mt-2"
          value={form.plan_id}
          onChange={(e) =>
            setForm({
              ...form,
              plan_id: e.target.value,
            })
          }
        >
          <option value="">
            Select Plan
          </option>

          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>

        {/* Plan Details */}

        {selectedPlan && (

          <div className="mt-6 rounded-2xl bg-slate-50 border p-5">

            <h3 className="font-bold text-lg mb-3">
              Plan Details
            </h3>

            <div className="space-y-2 text-sm">

              <p>

                <strong>Description:</strong>{" "}
                {selectedPlan.description}

              </p>

              <p>

                <strong>Duration:</strong>{" "}
                {selectedPlan.duration_months} Months

              </p>

              <p>

                <strong>Price:</strong>{" "}
                ₹{selectedPlan.price}

              </p>

            </div>

          </div>

        )}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                user_id: Number(form.user_id),
                plan_id: Number(form.plan_id),
              })
            }
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
          >
            Save Membership
          </button>

        </div>

      </div>

    </div>
  );
}

export default MembershipModal;