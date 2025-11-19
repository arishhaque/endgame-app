interface KeypadProps {
  id: string;
  keyValue: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isDisabled?: boolean;
  handleClick: (id: string) => void;
}

export function Keypad({ id, keyValue, isSelected = false, isCorrect = false, isDisabled = false, handleClick } : KeypadProps) {
  const styles = {
    backgroundColor: isSelected ? isCorrect ? '#59E391' : 'red' : 'orange'
  };

  return (
    <>
      <button style={styles} className="keypad-button" type="button" disabled={isDisabled} onClick={() => id && handleClick?.(id)}>{keyValue}</button>
    </>
  )
}
export default Keypad;
