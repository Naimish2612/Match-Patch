export interface Message {
    id: number;
    senderId: number;
    sender_known_as:string;
    sender_photo_url:string;
    recipientId: number;
    recipient_known_as:string;
    recipient_photo_url:string;
    content: string;
    is_read: boolean;
    read_date: Date;
    message_sent_date: Date;

}
