"use client";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/libClient/hooks/useLocalStorage";
import { useUser } from "@clerk/nextjs";
import focusOrder from "@/libClient/focusOrder";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/lib/email";

export default function ContactForm() {
  {
    /* init state */
  }
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
    }
    setLoading(false);
  }, []);
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  {
    /** tab order */
  }
  const elements = [".", "E0", "E1", "E2"];
  {
    /** data and hooks */
  }
  type ContactInfo = {
    Subject: "";
    Description: "";
  };
  const [contactInfo, setContactInfo] = useLocalStorage("contactInfo", {
    Subject: "",
    Description: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContactInfo((prev: ContactInfo) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    try {
      if (!contactInfo.Description || !contactInfo.Subject) return;
      if (!isSignedIn) return;
      const result = await sendEmail({
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        subject: contactInfo.Subject,
        description: contactInfo.Description,
      });

      if (result.success) {
        alert("ok...");
        localStorage.removeItem("contactInfo");

        router.push("/");
      } else return false;
    } catch (error) {
      console.error("Email : error :", error);
      return false;
    }
  };

  if (Loading) return "Loading";
  return (
    <div className="relative w-full flex-col">
      <div className="relative flex h-12 items-center justify-center rounded-md bg-slate-800 text-white">
        <h3 className="text-2xl">Contact Us</h3>
      </div>

      <div className="m-2.5 flex flex-col gap-4">
        <div className="w-full">
          <label className="mb-2 block text-sm text-slate-600">Subject</label>
          <input
            autoFocus
            id="E0"
            type="text"
            onKeyUp={(e) => focusOrder(e, elements)}
            maxLength={100}
            onChange={(e) => {
              handleChange(e);
            }}
            className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm focus:border-slate-500"
            placeholder="Subject"
            name="Subject"
            value={contactInfo.Subject}
          />
        </div>
        <div className="w-full">
          <label className="mb-2 block text-sm text-slate-600">
            Description (
            {contactInfo.Description ? contactInfo.Description.length : 0}
            /1000)
          </label>
          <textarea
            id="E1"
            name="Description"
            value={contactInfo.Description}
            onKeyUp={(e) => focusOrder(e, elements)}
            maxLength={1000}
            placeholder="Description"
            onChange={(e) => {
              handleChange(e);
            }}
            className="full h-36 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm focus:border-slate-500"
          />
        </div>
      </div>
      <div className="pt-0">
        <button
          id="E2"
          className="w-full rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
}
