import HeaderSticky from "@/components/HeaderSticky";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderSticky />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
