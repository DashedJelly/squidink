import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";


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
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
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