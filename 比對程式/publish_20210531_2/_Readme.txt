
1. 沒有參數
   
   ForestCadastralRatio.exe

   依序為 FM_GEO_DATA 的每一筆資料, 計算與 FC_GEO_DATA 是否有相交, 並算出相交的比例.
   設定參數在 ForestCadastralRatio.dll.config

2. 有參數 : -f=指定特定位置的設定檔, 
   (此時不會用到 ForestCadastralRatio.dll.config 的設定內容)

   設定檔 project.json 在目前的目錄下 :
   ForestCadastralRatio.exe -f=project.json

   設定檔在特定位置 (目錄名稱中若含有空白, 必須以雙引號包住整個參數內容)
   ForestCadastralRatio.exe "-f=C:\指定 目錄\設定檔.json"

設定檔中 Connection.Output 的內容說明 :
  
  指定輸出結果的內容 (建議與 Connection.TableName 指定的資料表有相同的欄位)

  以 "," 分隔, 每個欄位再以 "=" 分別指定 ColumnName=Value
**Value 以 Source. 或 Target. 開頭者, 是 "Source" 或 "Target" 所指定資料表的欄位**
  其餘則為 SQL 內容, 若無指定 Value, 會以 null 替代

  例如 :

  SID=0						輸出 SID 欄位, 值固定為 0
  FM_TYPE=Source.TYPE_ID	輸出 FM_TYPE 欄位, 值是 Source 資料表的 TYPE_ID 欄位  
  FM_ID=Source.FM_ID		輸出 FM_ID 欄位, 值是 Source 資料表的 FM_ID 欄位
  FC_ID=Target.FC_ID		輸出 FC_ID 欄位, 值是 Target 資料表的 FC_ID 欄位 
  FC_RATIO=RATIO 			輸出 FC_RATIO 欄位, 值是計算結果 RATIO
  FC_CHANGE					輸出 FC_CHANGE 欄位, 值固定是 null
  UPDATETIME=getdate()		輸出 UPDATETIME 欄位, 值由 SQL 語法 getdate() 取得
