export interface IAppProps {}

export function Footer(props: IAppProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "137px",
        borderTop: "2px solid yellow",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#dddddd",
        textAlign: "center",
        fontSize: "12px",
      }}>
      <img
        src='https://motphimtw.com/motphimtv.png'
        style={{ margin: "20px auto 0" }}
        alt=''
      />
      <p>
        Copyright © 2021 PHIMBOM.NET. All Rights Reserved<br></br> Disclaimer:
        This site PHIMBOM.NET does not store any files on its server. All
        contents are provided by non-affiliated third parties.
      </p>
    </div>
  );
}
