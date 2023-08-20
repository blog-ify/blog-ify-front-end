import { Button, Modal } from "@components/atoms";
import { CheckEmailForm, LoginOrJoinForm } from "@components/molecules";
import { useState } from "react";

interface AuthModalInterface {
    onSuccessJoin: Function;
    onSuccessFound: (email: string, resetQuestion: string) => void;
    onError: Function;
    handleClose: Function;
}

const AuthModal = ({
    handleClose,
    onSuccessJoin,
    onError,
    onSuccessFound,
}: AuthModalInterface) => {
    const [isResetMode, setIsResetMode] = useState<boolean>(false);

    return (
        <Modal handleClose={handleClose}>
            {!isResetMode ? (
                <LoginOrJoinForm onSuccess={onSuccessJoin} onError={onError} />
            ) : (
                <CheckEmailForm onSuccess={onSuccessFound} onError={onError} />
            )}

            <Button
                color="transparent"
                onClick={() => setIsResetMode(!isResetMode)}
            >
                {!isResetMode ? "비밀번호를 잊으셨나요?" : "돌아가기"}
            </Button>
        </Modal>
    );
};

export default AuthModal;
