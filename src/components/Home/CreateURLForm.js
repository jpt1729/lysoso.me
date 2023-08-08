import { useState } from "react";

export default function CreateURLForm({setCreatedURL}) {
  const [formStatus, setFormStatus] = useState({
    url: null,
    id: null,
  });
  const onURLSubmit = async (e) => {
    e.preventDefault();

    const url = e.target.url.value;
    const id = e.target.id.value;

    setFormStatus({
      url: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/.test(
        url
      )
        ? null
        : "URL Invalid",
      id: /^(?=.{1,2048}$)[a-zA-Z0-9\-_~%]+$/.test(id)
        ? "Please use only letters (A-Z, a-z), numbers (0-9), hyphens, underscores, tilde (~), and percent (%) signs. Length should be 1 to 2048 characters. Special characters and spaces are not allowed."
        : null,
    });
    if (formStatus.url !== null || formStatus.id !== null) {
      console.log("url doesnt exist");
      return;
    } else {
      await fetch("/api/add-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: url, id }),
      }).then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          setCreatedURL(data.page);
          e.target.reset();
        }
        if (res.status === 400) {
          console.log(data);
          setFormStatus({
            url: formStatus.url,
            id: "ID in use",
          });
          return;
        }
      });
    }
  };
  return (
    <form
      className="flex flex-col gap-5 max-w-screen-sm w-full relative"
      onSubmit={onURLSubmit}
      role="form" // Adding role for accessibility
    >
      <div>
        <label htmlFor="url" className="font-bold text-lg">
          URL
        </label>
        <br />
        <input
          className={`w-full px-3 py-2 outline-none rounded-lg border-2 transition-colors hover:border-[#279AF1] focus:border-[#279AF1] active:border-[#279AF1] ${
            formStatus.url !== null && "border-red-500"
          }`}
          type="text"
          name="url"
          id="url" // Adding unique ID for accessibility
          autoComplete="off"
          placeholder="Enter the URL to shorten"
          aria-invalid={formStatus.url !== null ? "true" : "false"} // Indicating error status
        />
        <br />
        {formStatus.url && (
          <span className="absolute text-red-500" role="alert">
            {formStatus.url}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="id" className="font-bold text-lg">
          ID
        </label>
        <br />
        <input
          className={`w-full px-3 py-2 outline-none rounded-lg border-2 transition-colors hover:border-[#279AF1] focus:border-[#279AF1] active:border-[#279AF1] ${
            formStatus.id !== null && "border-red-500"
          }`}
          type="text"
          name="id"
          id="id" // Adding unique ID for accessibility
          autoComplete="off"
          placeholder="Page ID"
          aria-invalid={formStatus.id !== null ? "true" : "false"} // Indicating error status
        />
        <br />
        {formStatus.id && (
          <span className="absolute text-red-500" role="alert">
            {formStatus.id}
          </span>
        )}
      </div>

      <input
        className="px-3 py-2 rounded-lg font-semibold border-2 bg-[#279AF1] text-white w-fit mt-2 hover:bg-white hover:text-black border-[#279AF1] transition-all"
        value="Shorten URL"
        type="submit"
        role="button" // Adding role for accessibility
        aria-label="Submit Form" // Adding an accessible label
      />
    </form>
  );
}
