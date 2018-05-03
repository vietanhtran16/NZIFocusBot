import { Intent } from "../enums/Intent";
import greetUserResponse from "../responses/greetUserResponse";

export function createResponse(message) {
    switch (message.nlp.entities) {
        case Intent.GREETING:
            return "Chào bạn. Bạn gửi câu hỏi qua cho mình nhé";
            break;
        default:
            return "Xin lỗi mình chưa thể trả lời câu hỏi của bạn. Bạn gửi thông tin qua đây cho mình nhé"; 
    }   
}
