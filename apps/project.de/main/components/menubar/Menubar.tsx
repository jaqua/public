import styles from './menubar.module.css'

const Menubar = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.menuBtn} ${open ? styles.menuBtn_active : ''}`}
    >
      <div className={styles.first}></div>
      <div className={styles.second}></div>
      <div className={styles.third}></div>
    </div>
  )
}

export default Menubar
