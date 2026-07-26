import { DecorativeLayers } from './components/DecorativeLayers';
import { Topbar } from './components/Topbar';
import { Desktop } from './components/Desktop';
import { Backdrop } from './components/Backdrop';
import { Window } from './components/Window';
import { Hint } from './components/Hint';
import { useTheme } from './hooks/useTheme';
import { useWindowManager } from './hooks/useWindowManager';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { openKey, parentKey, isOpen, openWin, closeWin } = useWindowManager();

  return (
    <>
      <DecorativeLayers />
      <Topbar theme={theme} onToggleTheme={toggleTheme} />
      <Desktop theme={theme} onOpenWin={openWin} />
      <Backdrop show={isOpen} onClick={closeWin} />
      <Window openKey={openKey} parentKey={parentKey} onClose={closeWin} onOpenWin={openWin} />
      <Hint />
    </>
  );
}
