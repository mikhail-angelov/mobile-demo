import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Avatar } from "../Avatar";
import styled from "styled-components";
import moment from "moment";

import { MESSAGE_TIMESTAMP_FORMAT } from '../../helpers/constants'
import { GRAY_COLOR } from "../../helpers/styleConstants";

interface IProps {
  name: string;
  lastMessageText: string;
  lastMessageAuthor: string;
  id: number;
  lastMessageTimestamp: number;
  setActiveChatAndGetMessages: () => void;
}
export const ChatListItem = ({
  name,
  id,
  setActiveChatAndGetMessages,
  lastMessageText,
  lastMessageAuthor,
  lastMessageTimestamp,
}: IProps) => {
  return (
    <ChatListItemWrapper
      onPress={() => {
        setActiveChatAndGetMessages()
      }}
    >
      <AvatarSide>
        <Avatar name={name} />
      </AvatarSide>
      <LastMessageArea>
        <ChatName>{name}</ChatName>
        <LastMessage>
          <LastMessageAuthor>
            {lastMessageAuthor ? `${lastMessageAuthor}: ` : "Empty chat"}
          </LastMessageAuthor>
          <LastMessageText>{lastMessageText}</LastMessageText>
        </LastMessage>
      </LastMessageArea>
      <Timestamp>
        {lastMessageTimestamp ? moment(lastMessageTimestamp).format(MESSAGE_TIMESTAMP_FORMAT) : ""}
      </Timestamp>
    </ChatListItemWrapper>
  );
};

const ChatListItemWrapper = styled(TouchableOpacity)`
  height: 100px;
  width: 100%;
  display: flex;
  flexDirection: row;
  padding: 0 10px 10px 10px;
`;

const AvatarSide = styled(View)`
  width: 25%;
  height: 100%;
  display: flex;
  alignItems: center;
  justifyContent: center;
`;

const LastMessageArea = styled(View)`
  width: 55%;
  height: 100%;
  padding: 10px;
`;

const ChatName = styled(Text)`
  fontWeight: 700;
  fontSize: 18px;
`;

const LastMessageAuthor = styled(Text)`
  fontSize: 14px;
`;

const LastMessageText = styled(Text)`
  fontSize: 14px;
  color: ${GRAY_COLOR};
`;

const LastMessage = styled(View)`
  fontSize: 14px;
  display: flex;
  flexDirection: row;
  marginTop: 2px;
`;

const Timestamp = styled(Text)`
  width: 20%;
  height: 100%;
  fontSize: 12px;
  color: ${GRAY_COLOR};
  textAlign: right;
  paddingTop: 10px;
`;
