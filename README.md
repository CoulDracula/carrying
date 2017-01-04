
## Carrying


carrying是一个专属个人app，结合备忘录、地理位置信息、时间轴功能，普通消息功能

## page 1 
### app 1 Navigator
描述：navigator 贯穿全局，位于app最下方，包含page列表。点击navigatorItem跳转到相应页面。特别注意：如果有新消息，在app4所在的Item会有数字显示。

## page 2
### app 1  memo
描述： memo支持私有备忘录和公有备忘录，以不同的Tab展示不同的类型memo，不同等级不同颜色。公有备忘录视为事件，会被写入时间轴，私有备忘录仅有自己可以看到，私有备忘录可以转为公有备忘录，公有备忘录可以转为私有备忘录。备忘录以card形式展示，点击card进入详细页面，具有编辑和删除功能。最下方有创建功能。备忘录可以设置日期、时分秒，到时自动提醒（后期优化）。

memoDetailPage，能够查看备忘录详细内容，类似时间轴中的内容展示，但是时间轴是直接展示了。点击编辑按钮，进入编辑功能。点击删除按钮，弹出dialog，提示是否删除。

memoEditPage：能够创建、修改备忘录，如果有memoId，则视为修改，有初始化值。包含title，content，time，date，grade，private/public。（比timeLineCreatePage多了一个公有私有选择）。点击提交跳转到memoListPage

memoListPage： 能够查看memo列表，以tab展示private和public，每项以ListView展示，仅显示title，time，状态（通过momentJs和memo.date、memo.time校对状态。）
不支持删除memo

router: 
- /memo/memoId   查看某个memo
- /memo/memoId/Edit    修改memo
- /memo/Edit   创建memo

action:
- loadPrivateMemos
- loadPrivateMemo
- loadPublicMemos
- loadPublicMemo
- editMemo


api: 
- /api/memo/private/<user-id>/<memo-id>/ *GET PATCH* 获取某个memo id的信息，{title：''，content：''，date：null，grade：''}
- /api/memo/private/<user-id>/ *POST GET* 获取私有memo list , [{memo1},{memo2}...]
- /api/memo/public/memoId *GET PATCH* 获取某个memo id的信息，{title：''，content：''，date：null，grade：''}
-  /api/memo/public *POST GET* 获取memo list ，[{memo1},{memo2}...]


### app 2 position
描述： 有主动获取位置和被动获取位置功能。"告诉对方位置"、"获取对方位置"，"愿意被对方获取位置"按钮。下方显示由高德地图sdk提供的地图信息，从中可以显示对方位置，点击位置按钮（高德地图自带的）可以获取自己位置，最下方显示位置信息的原始数据（ui做的炫酷一点）。
api:
router: /position

### app3 share
描述：阶段一：能够保存文件到本地，避免重要文件丢失，保存支持图片、视频、文字，以一个页面展示三个类型及相关信息。

shareCenterPage： 以card形式展示、每项包含名称、图标、文件个数

技术难点：本地存储，非文字的保存于加载

router:

api:

## page 3 
### app 1 TimeLine
描述：通过时间轴获取所有历史事件数据，类似日志功能，通过事件等级：低中高（high middle low）选择要查看的事件时间轴。使用时间轴插件，显示时间轴对应的事件标题，内容。最下方有增加事件功能，增加忘记添加的事件。
事件数据来源于事件库，事件只能后台删除（前期事件内容仅限于文字，后期增加添加图片、url、视频等功能）

所有插件：timeline相关的时间轴插件、react 、redux等

包含页面：
时间轴（事件）查看页面、增加事件页面。
* TimeLinePage： 上方显示时间轴，点击时间轴某个节点是，时间轴下方显示对应的事件，类似https://codyhouse.co/demo/horizontal-timeline/index.html ，下方页面展示完整事件内容，无限长度。最下方有添加事件按钮"add Timeline"。点击后跳转到添加事件页面。
* TimeLineCreatePage： 通过redux-form（还不知道能不能在移动端使用）创建timeLine，包含：标题、内容、时间（通过timepake选择）、等级，创建事件。

actions:
- loadPublicMemos
- loadPublicMemo
- editMemo

技术难点：只加载grade为high的memo
router : 
- /timeLine  
- /timeLine/create
- /memo/memoId
### app 2 

## page 4 
### app 1 userCenter
描述：包含登录（后期包含设置）、消息中心。

userCenterPage ：包含登录card（退出、登录状态：显示username(后期包含头像。)）。消息中心card（包含button、未读消息数量提示）。

messageCenter：message的LstView（最好是scrollView）最上方是TextInput，和发送按钮。暂时不支持查看给对方发送的消息记录的功能。

router :
- /userCenter
- /messageCenter

action ：
- login
- logout
- loadMessage
- sendMessage

api:
- /api/message
- /api/login
- api/logout
-  关于消息提醒的，暂时没设计好


# 汇总
api: 
- /api/memo/private/memoId *GET PATCH* 获取某个memo id的信息，{title：''，content：''，date：null，grade：''}
- /api/memo/private/ *POST GET* 获取私有memo list , [{memo1},{memo2}...]
- /api/memo/public/memoId *GET PATCH* 获取某个memo id的信息，{title：''，content：''，date：null，grade：''}
-  /api/memo/public *POST GET* 获取memo list ，[{memo1},{memo2}...]
- /api/message
- /api/login
- api/logout