import { fadeIn, uprise } from "../../styles/keyframes";
import { media } from "../../styles/theme";
import {
    useRef,
    useCallback,
    useEffect,
    type FC,
    type MutableRefObject,
    type ReactNode,
} from "react";
import styled from "styled-components";
import Button from "../button/Button";

const RootContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    background-color: #00000050;
    filter: ${(p) => p.theme.filter.blur};
    z-index: 20;
    inset: 0;
    transition: ${(p) => p.theme.transition.fast};
    animation: ${fadeIn} 0.3s ease-out;
    backdrop-filter: blur(1px);
`;

const ModalContainer = styled.div`
    opacity: 1;
    position: relative;
    margin: 4rem;
    box-sizing: border-box;
`;

const ModalContent = styled.div`
    background-color: ${(p) => p.theme.color.backgroundColor};
    /* border: ${(p) => p.theme.border.active}; */
    box-shadow: ${(p) => p.theme.boxShadow.strong};
    border-radius: ${(p) => p.theme.border.radius};
    padding: ${(p) => p.theme.size.lg};
    outline: none;
    width: 50vw;
    max-width: 100%;
    z-index: 21;
    ${media.tablet} {
        width: 80vw;
        max-height: 80vh;
    }
    transition: ${(p) => p.theme.transition.fast};
    animation: ${uprise} 0.3s ease-in-out;
    overflow-y: auto;
`;

const CloseBtn = styled(Button)`
    transition: ${(p) => p.theme.transition.fast};
    position: absolute;
    right: ${(p) => p.theme.size.xl};
    top: ${(p) => p.theme.size.sm};
    background-color: ${(p) => p.theme.color.gray};
`;

interface ModalProps {
    children?: ReactNode;
    handleClose: () => void;
}

const Modal: FC<ModalProps> = ({ handleClose, children }) => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>; // for convey ref

    // call reducer & store in here, or getServerSideProps?

    const onClickClose = () => handleClose(); // close modal by using button
    const handleKeydownEscape = useCallback(
        // close modal by pressing Escape key
        (e: KeyboardEvent) => {
            if (/escape/i.test(e.key)) {
                return handleClose();
            }
        },
        [handleClose]
    );

    useEffect(() => {
        const { current } = ref;

        if (current) {
            //  lock body scrolling
            window.addEventListener("keydown", handleKeydownEscape);
        }

        return () => {
            // unlock body scrolling
            window.removeEventListener("keydown", handleKeydownEscape);
        };
    }, [handleKeydownEscape]);

    return (
        <RootContainer>
            <ModalContainer
                role="dialog"
                aria-label="Modal Container"
                ref={ref}
                data-testid={"modal"}
            >
                <CloseBtn
                    aria-label="Closing this modal button"
                    onClick={onClickClose}
                >
                    닫기
                </CloseBtn>
                <ModalContent
                    role="dialog"
                    aria-label="Contents in Modal"
                    tabIndex={-1}
                >
                    {children}
                </ModalContent>
            </ModalContainer>
        </RootContainer>
    );
};

export default Modal;
