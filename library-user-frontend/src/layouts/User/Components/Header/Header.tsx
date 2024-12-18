import { LogoAndSearchProfile } from './components/LogoAndSearchProfile/LogoAndSearchProfile';

export const Header = () => {
    return (
        <>
            {/*************************************
                  Header Start
          **************************************/}
            <header id="tg-header" className="tg-header tg-haslayout">
                <LogoAndSearchProfile />
            </header>
            {/*************************************
                  Header End
          **************************************/}
        </>
    );
};
