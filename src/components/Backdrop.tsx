interface BackdropProps {
  show: boolean;
  onClick: () => void;
}

export function Backdrop({ show, onClick }: BackdropProps) {
  return <div id="backdrop" className={show ? 'show' : ''} onClick={onClick} />;
}
