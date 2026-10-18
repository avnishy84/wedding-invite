import { LangToggle } from '../LangToggle/LangToggle';
import { MusicToggle } from '../MusicToggle/MusicToggle';
import styles from './TopBar.module.css';

export function TopBar() {
  return (
    <header className={styles.topBar}>
      <LangToggle />
      <MusicToggle />
    </header>
  );
}
