from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters

async def start(update: Update, context):
    """处理 /start 命令"""
    keyboard = [[InlineKeyboardButton(
        "玩斗地主", 
        web_app=WebAppInfo(url="https://hapince.github.io/")
    )]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "点击下方按钮开始玩斗地主！",
        reply_markup=reply_markup
    )

def main():
    # 创建应用
    app = Application.builder().token('7845497963:AAGAo71SOwRLk7653N1ZYoizKbuXsB8h03k').build()
    
    # 添加处理程序
    app.add_handler(CommandHandler("start", start))
    
    # 启动机器人
    app.run_polling()

if __name__ == '__main__':
    main()