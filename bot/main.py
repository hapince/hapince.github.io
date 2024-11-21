from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup, User
from telegram.ext import Application, CommandHandler

async def start(update: Update, context):
    """处理 /start 命令"""
    
    # 获取用户信息
    user: User = update.message.from_user
    username = user.username if user.username else "没有用户名"
    
    # 获取头像（如果存在）
    try:
        # 获取用户的头像，最大为400x400的图片
        user_profile_photos = await user.get_profile_photos(limit=1)
        if user_profile_photos.total_count > 0:
            profile_photo_url = user_profile_photos.photos[0][0].file_id
        else:
            profile_photo_url = "没有头像"
    except Exception as e:
        profile_photo_url = "无法获取头像"
    
    # 将用户名和头像信息添加到消息中
    message_text = f"欢迎 {username}！\n"
    message_text += f"你的头像: {profile_photo_url}\n"
    
    # 创建按钮
    keyboard = [[InlineKeyboardButton(
        "玩斗地主", 
        web_app=WebAppInfo(url="https://hapince.github.io/")
    )]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # 发送包含用户信息的欢迎消息
    await update.message.reply_text(
        message_text + "点击下方按钮开始玩斗地主！",
        reply_markup=reply_markup
    )

def main():
    # 创建应用
    app = Application.builder().token('').build()
    
    # 添加处理程序
    app.add_handler(CommandHandler("start", start))
    
    # 启动机器人
    app.run_polling()

if __name__ == '__main__':
    main()
