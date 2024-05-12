import {Card, Empty} from "antd";
import styled from "styled-components";
import {useSelector} from "react-redux";
import SpinLoader from "../shared/components/SpinLoader";
import {useEffect} from "react";
import {dispatch} from "../store";
import { fetchSupportQuestions } from "../store/reducers/applicants";

const QuestionsWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: ${({ $isFlex }: any) => $isFlex ? "flex" : "block"};
    align-items: center;
    justify-content: center;
    overflow-y: auto;

    &::-webkit-scrollbar {
        background-color: #fff;
        width: 16px;
    }

    /* background of the scrollbar except button or resizer */
    &::-webkit-scrollbar-track {
        background-color: #fff;
    }

    /* scrollbar itself */
    &::-webkit-scrollbar-thumb {
        background-color: #babac0;
        border-radius: 16px;
        border: 4px solid #fff;
    }

    /* set button(top and bottom of the scrollbar) */
    &::-webkit-scrollbar-button {
        display: none;
    }
`;

const QuestionsContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    height: 100%;
`;

const QuestionCard = styled.div`
    border: 1px solid #212121;
    border-radius: 12px;
    padding: 14px;
`;

const QuestionEmail = styled.p``;

const QuestionPhone = styled.p``;

const QuestionText = styled.p`
    margin: 0
`;

const QuestionsListPage = () => {
    const isLoading = useSelector((state: any) => state.applicants.loading);
    const questions = useSelector((state: any) => state.applicants.supportQuestions);

    useEffect(() => {
        dispatch(fetchSupportQuestions());
    }, []);

    return (
        // @ts-ignore
        <QuestionsWrapper $isFlex={!questions.length}>
            {isLoading && <SpinLoader/>}
            {questions.length > 0 && (
                <QuestionsContent>
                    {!isLoading && questions.map((record: any, index: number) => (
                        <QuestionCard key={index}>
                            <QuestionEmail>{record.email}</QuestionEmail>
                            <QuestionPhone>{record?.phone}</QuestionPhone>
                            <QuestionText>{record.questions}</QuestionText>
                        </QuestionCard>
                    ))}
                </QuestionsContent>
            )}
            {!isLoading && questions.length === 0 && <Empty description="Տվյալներ չեն գտնվել" />}
        </QuestionsWrapper>
    );
};

export default QuestionsListPage;
