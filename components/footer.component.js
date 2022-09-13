import { memo } from "react"
import styles from "../assets/styles/footer.module.scss"
import Image from 'next/image'
import Announced from '../assets/images/announced.png'
import footerConstants from "../constant/footer.constant"

const Footer = () => {
    return (
        <>
            <div ></div>
            <footer>
                <div className={styles.footer}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.col_item}>
                                <a href="/ky-thi-hsk-la-gi" title={footerConstants.kithihsk}>
                                    {footerConstants.kithihsk}
                                </a>
                            </div>
                            <div className={styles.col_item}>
                                <a href="/thi-thu-hsk" title={footerConstants.dethihsk}>
                                    {footerConstants.dethihsk}
                                </a>
                            </div>
                            <div className={styles.col_item}>
                                <a href="https://hanban.vn/" title={footerConstants.thuvien}>
                                    {footerConstants.thuvien}
                                </a>
                            </div>
                            <div className={styles.col_item}>
                                <a href="https://hanban.vn/" title={footerConstants.blog}>
                                    {footerConstants.blog}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.col_content}>

                            </div>
                            <div className={styles.col_content}>

                            </div>
                            <div className={styles.col_content}>

                            </div>
                            <div className={styles.col_content}>

                            </div>
                        </div>

                    </div>
                    <span className={styles.logo}>
                        <Image src={Announced}
                            alt="Đã thông báo với bộ công thương"
                            width={106} height={40}
                            href="http://online.gov.vn/Home/WebDetails/91758"
                            target="_blank"
                            rel="noopener noreferrer" />
                    </span>
                </div>
                <div className={styles.footer_bottom}>
                    <div className={styles.container}>
                        <div className={styles.copyright}>
                            <span>
                                {footerConstants.copyrightby}{' '}
                            </span>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default memo(Footer)