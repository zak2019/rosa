import { Injectable } from '@angular/core';
import { InjectableRxStompConfig, RxStompService } from '@stomp/ng2-stompjs';
import { WebSocketService } from '../websocket.service';
import {WebSocketOptions} from "../../../model/socket/webSocket.options";

export const eventStompConfig: InjectableRxStompConfig = {
  webSocketFactory: () => {
    return new WebSocket('ws://localhost:8080/notifications/websocket');
  }
};

@Injectable({
  providedIn: 'root'
})
export class EventWebsocketService extends WebSocketService {
  constructor(stompService: RxStompService) {
    super(stompService, eventStompConfig, new WebSocketOptions('/queue/notify'));
  }
}
