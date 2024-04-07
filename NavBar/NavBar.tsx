import { ConnectWallet, darkTheme, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../NavBar/NavBar.module.css";


export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/comlogo.png"
              width={65}
              height={65}
              alt="comlogo"
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/mint" className={styles.link}>
              Mint
            </Link>
            <Link href="/stake" className={styles.link}>
              Stake
            </Link>
            <Link href="/viewer" className={styles.link}>
              Traits
            </Link>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
          <ConnectWallet
        theme={darkTheme({
          colors: {
            modalBg: "#3a4673",
            borderColor: "#3680ce",
            separatorLine: "#3680ce",
            primaryText: "#9eefff",
            secondaryText: "#e6b7b7",
            secondaryButtonBg: "#6e6e6e",
            primaryButtonBg: "#9494ff",
            primaryButtonText: "#ffffff",
            connectedButtonBg: "#233680",
            connectedButtonBgHover: "#221443",
          },
        })}
        modalSize={"wide"}
        welcomeScreen={{
          title:
            "Yarr , Grab hold and Get Ready ",
          subtitle:
            "Connect your wallet to get started !",
          img: {
            src: "/button.png",
            width: 150,
            height: 150,
          },
        }}
        modalTitleIconUrl={"/button.png"}
        showThirdwebBranding={false}
      />
          </div>
          {address && (
           
              <Image
                className={styles.profileImage}
                src="/button.png"
                width={42}
                height={42}
                alt="Profile"
              />
            
          )}
        </div>
      </nav>
    </div>
  );
}