import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function About({}) {
  return (
    <>
      <main className={`${inter.className} w-full max-w-screen-xl m-auto`}>
        <h1 className="text-6xl font-bold mt-5">About Lysoso.me</h1>
        <div className="w-1/2">
          <br />
          <p>
            We understand the complexity of both the biological world and the
            digital realm. {"That's"} why {"we've"} created a unique URL
            shortening service that caters specifically to biologists,
            researchers, and anyone who appreciates streamlined online
            experiences.
          </p>
          <br />
          <h2 className="text-2xl font-bold">Why Lysoso.me?</h2>
          <br />
          <p>
            Just as a lysosome works diligently within a cell to maintain order
            and efficiency, Lysoso.me serves as your virtual lysosome in the
            vast landscape of the internet. We believe that in a world where
            precision matters, every click should be smooth and every link
            should be clean.
          </p>
          <br />
          <h2 className="text-2xl font-bold">
            Simplify, Share, and Stay Organized
          </h2>
          <br />
          <p>
            Have you ever struggled with sharing long, convoluted URLs? Are you
            tired of cluttering your emails, presentations, or research
            documents with unwieldy web addresses? Lysoso.me is here to
            transform those challenges into seamless solutions.
          </p>
          <br />
          <p>
            Our platform allows you to condense any URL into a concise and
            user-friendly link. No more confusion, no more distractions. Whether
            {"you're"} referencing a groundbreaking scientific paper or sharing
            the latest discoveries, Lysoso.me ensures that your links are as
            tidy as the cellular processes you study.
          </p>
          <br />
          <h2 className="text-2xl font-bold">
            Join Us in Enhancing Your Online Experience
          </h2>
          <br />
          <p>
            Lysoso.me is more than just a URL shortener; {"it's"} a community of
            like-minded individuals who value efficiency and organization. By
            embracing Lysoso.me, {"you're"} joining a movement that bridges the
            gap between biology and technology, bringing clarity to every
            digital interaction.
          </p>
          <br />
          <h2 className="text-2xl font-bold">Get Started Today</h2>
          <br />
          <p>
            Ready to experience the simplicity and elegance of Lysoso.me? Sign
            up now to start transforming your URLs into concise and meaningful
            links. Embrace the power of order, just like a lysosome maintains
            order within a cell.
          </p>
          <br />
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <br />
          <p>
            Have questions, suggestions, or feedback? {"We'd"} love to hear from
            you! Reach out to our dedicated support team at{" "}
            <a href="mailto:support@lysoso.me">support@lysoso.me</a> for any
            inquiries.
          </p>
          <br />
          <p>
            Thank you for being a part of the Lysoso.me community. {"Let's "}
            navigate the digital world with the precision of a {"biologist's "}
            microscope.
          </p>
        </div>
      </main>
    </>
  );
}
