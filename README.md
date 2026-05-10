# 観点指向設計（Viewpoint-Oriented Design）  
**Minimum Core Specification**

観点指向設計（VOD）は、  
**世界を複数の局所世界（観点）として分割し、  
それらを射（関係）で接続し、  
毎フレーム再構成する OS 的設計手法**です。

OOP のように「オブジェクトを中心に世界を閉じる」のではなく、  
**観点（Viewpoint）を中心に世界を開く**ことを目的とします。

---

# 1. 観点（Viewpoint）とは何か  
観点とは **局所的に完結した“世界の切り取り”** です。

最小コアでは、観点は次の3つの局所世界で構成されます。

### ■ State View  
世界の「現在の形」。  
例：LineTrace の Hit/NoHit、Aiming の ForwardVector。

### ■ Action View  
世界を「どう変えるか」。  
例：Trace()、UpdateAim()。

### ■ Context View  
世界を構成するための外部条件。  
例：CameraRotation、Start/Direction/MaxDistance。

この3つが揃うと **1つの観点（local world）** が成立します。

---

# 2. 射（Morphisms）  
観点同士は **射（関係）** によって接続されます。

最小コアでは、次の3種類の射だけを定義します。

### ■ 射1：State ← Action  
Action が State を更新する。

### ■ 射2：Action ← Context  
Context が Action の入力を決める。

### ■ 射3：State ← Context  
Context が State の初期条件を決める。

これだけで観点ネットワークが成立します。

---

# 3. 観点合成（Viewpoint Composition）  
観点指向設計の中心にあるのは **合成（Composition）** です。

最小コアでは、合成規則は1つだけです。

```
Context → Action → State
```

この射の連鎖が **1フレームの世界再構成**を表します。  
Unreal Engine の Tick と自然に一致します。

---

# 4. 観点指向設計の目的  
観点指向設計は次の問題を構造的に解決します。

- null の構造的排除  
- 世界の局所化（ブラックボックス化の回避）  
- 観点ごとの責務分離  
- 世界の再構成による安定性  
- OOP の「肥大化したクラス」問題の解消  
- Tick ベースのゲームエンジンとの高い親和性  

---

# 5. 最小実装例（UE5）  
観点指向設計は、Unreal Engine 5 の Tick モデルと非常に相性が良いです。

例として、以下の2つの観点を実装しています。

- LineTrace Viewpoint  
- Aiming Viewpoint  

各観点は State / Action / Context の3分割で構成され、  
Tick 内で合成されて世界が再構成されます。

実装例は `examples/` と `ue5-implementation/` に含まれます。

---

# 6. 観点指向設計の拡張性  
最小コアは非常に小さく、次のように拡張できます。

- 観点の階層化  
- 観点ネットワークの自動合成  
- トポス論との接続（局所世界の貼り合わせ）  
- YAML による観点仕様  
- 観点 OS（Viewpoint Operating System）としての一般化  

これらは今後のバージョンで追加されます。

---

# 7. ライセンス  
- Source code: MIT License  
- Documentation (docs/): CC BY-NC-SA 4.0  
---

# 8. 作者  
- MorphSeki — Creator of Viewpoint-Oriented Design
- Copilot — AI collaborator supporting conceptual structuring

---

# 9. コントリビューション  
観点指向設計はまだ発展途上の概念です。  
Issue や PR による議論・改善を歓迎します。
