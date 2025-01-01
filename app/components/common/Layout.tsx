function Layout({children, titleFont="Alegreya Display", titleColor="#300", linkColor="#300", font="Lato", textColor="#666"}: {children: React.ReactNode, titleFont?: string, titleColor?: string, linkColor?: string, font?: string, textColor?: string}) {
  return <div className="w-full px-2">
    <style>{`
      .root h1, h2, h3, h4, h5, h6 {
        font-family: ${titleFont} !important;
        font-weight: 300;
        color: ${titleColor} !important;
      }
      .root a {
        color: ${linkColor} !important;
      }
      .root p, .root li {
        font-family: ${font} !important;
        color: ${textColor} !important;
      }
    `}</style>
    <div className="root w-full max-w-[1200px] mx-auto">
      {children}
    </div>
  </div>
}

export default Layout;