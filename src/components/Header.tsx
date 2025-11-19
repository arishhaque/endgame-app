export function Header(props: any) {
  return (
    <>
      <header className="header-container">
        <h1>Welcome to Endgame App</h1>
        <p>Guess the word under {props.totalAttempts} attempts to keep the programming world safe from Assembly</p>
      </header>
    </>
  );
}

export default Header;
