import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'

interface CollaborationRoom {
    id: string
    users: Map<string, any>
}

interface User {
    id: string
    name: string
    avatar: string
    color: string
}

interface CursorData {
    projectId: string
    cursor: { line: number; column: number }
}

class CollaborationServer {
    private io: Server
    private rooms: Map<string, CollaborationRoom> = new Map()
    private port: number

    constructor(port: number = 3001) {
        this.port = port
        this.io = new Server(port, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
        this.setupEventHandlers()
    }

    private setupEventHandlers() {
        this.io.on('connection', (socket: Socket) => {
            console.log('User connected:', socket.id)

            socket.on('join-room', ({ projectId, user }: { projectId: string; user: User }) => {
                this.joinRoom(socket, projectId, user)
            })

            socket.on('cursor-update', (data: CursorData) => {
                socket.broadcast.to(data.projectId).emit('cursor-update', {
                    userId: socket.id,
                    cursor: data.cursor
                })
            })

            socket.on('disconnect', () => {
                this.leaveRoom(socket)
                console.log('User disconnected:', socket.id)
            })
        })
    }

    private joinRoom(socket: Socket, projectId: string, user: User) {
        socket.join(projectId)

        if (!this.rooms.has(projectId)) {
            this.rooms.set(projectId, {
                id: projectId,
                users: new Map()
            })
        }

        const room = this.rooms.get(projectId)!
        room.users.set(socket.id, user)

        // Notify other users in the room
        socket.broadcast.to(projectId).emit('user-joined', {
            ...user,
            id: socket.id
        })

        // Send current users to the new user
        const users = Array.from(room.users.values())
        socket.emit('room-users', users)

        console.log(`User ${user.name} joined room ${projectId}`)
    }

    private leaveRoom(socket: Socket) {
        for (const [projectId, room] of this.rooms.entries()) {
            if (room.users.has(socket.id)) {
                room.users.delete(socket.id)
                socket.broadcast.to(projectId).emit('user-left', socket.id)

                if (room.users.size === 0) {
                    this.rooms.delete(projectId)
                }

                console.log(`User left room ${projectId}`)
                break
            }
        }
    }

    public start() {
        console.log(`Collaboration server running on port ${this.port}`)
    }

    public stop() {
        this.io.close()
        console.log('Collaboration server stopped')
    }
}

// Create and export server instance
export const collaborationServer = new CollaborationServer()

// Start server if this file is run directly
if (require.main === module) {
    collaborationServer.start()
} 