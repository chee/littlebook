/* esm.sh - babel-plugin-jsx-dom-expressions@0.39.8 */
const __Process$ = {env: {}}
const __0$ = function assert(val) {
	if (val === false) throw "oh no"
}
var require = n => {
	const e = m => (typeof m.default < "u" ? m.default : m),
		c = m => Object.assign({__esModule: true}, m)
	switch (n) {
		case "node:assert":
			return e(__0$)
		default:
			console.error('module "' + n + '" not found')
			return null
	}
}
var _c = Object.create
var bi = Object.defineProperty
var Ic = Object.getOwnPropertyDescriptor
var gc = Object.getOwnPropertyNames
var Dc = Object.getPrototypeOf,
	xc = Object.prototype.hasOwnProperty
var Ai = (e =>
	typeof require < "u"
		? require
		: typeof Proxy < "u"
		? new Proxy(e, {get: (t, r) => (typeof require < "u" ? require : t)[r]})
		: e)(function (e) {
	if (typeof require < "u") return require.apply(this, arguments)
	throw Error('Dynamic require of "' + e + '" is not supported')
})
var v = (e, t) => () => (t || e((t = {exports: {}}).exports, t), t.exports)
var Nc = (e, t, r, a) => {
	if ((t && typeof t == "object") || typeof t == "function")
		for (let n of gc(t))
			!xc.call(e, n) &&
				n !== r &&
				bi(e, n, {
					get: () => t[n],
					enumerable: !(a = Ic(t, n)) || a.enumerable,
				})
	return e
}
var Oc = (e, t, r) => (
	(r = e != null ? _c(Dc(e)) : {}),
	Nc(
		t || !e || !e.__esModule
			? bi(r, "default", {value: e, enumerable: !0})
			: r,
		e
	)
)
var _i = v(kt => {
	"use strict"
	Object.defineProperty(kt, "__esModule", {value: !0})
	kt.declare = hi
	kt.declarePreset = void 0
	var Sa = {
		assertVersion: e => t => {
			Cc(t, e.version)
		},
	}
	Object.assign(Sa, {
		targets: () => () => ({}),
		assumption: () => () => {},
		addExternalDependency: () => () => {},
	})
	function hi(e) {
		return (t, r, a) => {
			let n
			for (let i of Object.keys(Sa))
				t[i] || (n ?? (n = Pc(t)), (n[i] = Sa[i](n)))
			return e(n ?? t, r || {}, a)
		}
	}
	var PL = (kt.declarePreset = hi)
	function Pc(e) {
		let t = null
		return (
			typeof e.version == "string" &&
				/^7\./.test(e.version) &&
				((t = Object.getPrototypeOf(e)),
				t &&
					(!hasOwnProperty.call(t, "version") ||
						!hasOwnProperty.call(t, "transform") ||
						!hasOwnProperty.call(t, "template") ||
						!hasOwnProperty.call(t, "types")) &&
					(t = null)),
			Object.assign({}, t, e)
		)
	}
	function Cc(e, t) {
		if (typeof e == "number") {
			if (!Number.isInteger(e))
				throw new Error("Expected string or integer value.")
			e = `^${e}.0.0-0`
		}
		if (typeof e != "string")
			throw new Error("Expected string or integer value.")
		let r = Error.stackTraceLimit
		typeof r == "number" && r < 25 && (Error.stackTraceLimit = 25)
		let a
		throw (
			(t.slice(0, 2) === "7."
				? (a = new Error(
						`Requires Babel "^7.0.0-beta.41", but was loaded with "${t}". You'll need to update your @babel/core version.`
				  ))
				: (a = new Error(
						`Requires Babel "${e}", but was loaded with "${t}". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.`
				  )),
			typeof r == "number" && (Error.stackTraceLimit = r),
			Object.assign(a, {
				code: "BABEL_VERSION_UNSUPPORTED",
				version: t,
				range: e,
			}))
		)
	}
})
var Ii = v(Er => {
	"use strict"
	Object.defineProperty(Er, "__esModule", {value: !0})
	Er.default = void 0
	var Lc = _i(),
		LL = (Er.default = (0, Lc.declare)(
			e => (
				e.assertVersion(7),
				{
					name: "syntax-jsx",
					manipulateOptions(t, r) {
						r.plugins.some(
							a => (Array.isArray(a) ? a[0] : a) === "typescript"
						) || r.plugins.push("jsx")
					},
				}
			)
		))
})
var yr = v(ba => {
	"use strict"
	Object.defineProperty(ba, "__esModule", {value: !0})
	ba.default = vc
	function vc(e, t) {
		let r = Object.keys(t)
		for (let a of r) if (e[a] !== t[a]) return !1
		return !0
	}
})
var St = v(Aa => {
	"use strict"
	Object.defineProperty(Aa, "__esModule", {value: !0})
	Aa.default = Rc
	var gi = new Set()
	function Rc(e, t, r = "", a = e) {
		if (gi.has(a)) return
		gi.add(a)
		let {internal: n, trace: i} = Mc(1, 2)
		n ||
			console.warn(`${r}\`${e}\` has been deprecated, please migrate to \`${t}\`
${i}`)
	}
	function Mc(e, t) {
		let {stackTraceLimit: r, prepareStackTrace: a} = Error,
			n
		if (
			((Error.stackTraceLimit = 1 + e + t),
			(Error.prepareStackTrace = function (l, d) {
				n = d
			}),
			new Error().stack,
			(Error.stackTraceLimit = r),
			(Error.prepareStackTrace = a),
			!n)
		)
			return {internal: !1, trace: ""}
		let i = n.slice(1 + e, 1 + e + t)
		return {
			internal: /[\\/]@babel[\\/]/.test(i[1].getFileName()),
			trace: i.map(l => `    at ${l}`).join(`
`),
		}
	}
})
var ce = v(T => {
	"use strict"
	Object.defineProperty(T, "__esModule", {value: !0})
	T.isAccessor = $0
	T.isAnyTypeAnnotation = Ep
	T.isArgumentPlaceholder = Kf
	T.isArrayExpression = Bc
	T.isArrayPattern = Rd
	T.isArrayTypeAnnotation = yp
	T.isArrowFunctionExpression = Md
	T.isAssignmentExpression = wc
	T.isAssignmentPattern = vd
	T.isAwaitExpression = ap
	T.isBigIntLiteral = sp
	T.isBinary = A0
	T.isBinaryExpression = Fc
	T.isBindExpression = Xf
	T.isBlock = I0
	T.isBlockParent = _0
	T.isBlockStatement = qc
	T.isBooleanLiteral = od
	T.isBooleanLiteralTypeAnnotation = bp
	T.isBooleanTypeAnnotation = Sp
	T.isBreakStatement = Hc
	T.isCallExpression = jc
	T.isCatchClause = Yc
	T.isClass = J0
	T.isClassAccessorProperty = cp
	T.isClassBody = Bd
	T.isClassDeclaration = Fd
	T.isClassExpression = wd
	T.isClassImplements = hp
	T.isClassMethod = Wd
	T.isClassPrivateMethod = pp
	T.isClassPrivateProperty = dp
	T.isClassProperty = lp
	T.isCompletionStatement = x0
	T.isConditional = N0
	T.isConditionalExpression = Vc
	T.isContinueStatement = Kc
	T.isDebuggerStatement = Xc
	T.isDecimalLiteral = Zf
	T.isDeclaration = w0
	T.isDeclareClass = _p
	T.isDeclareExportAllDeclaration = Lp
	T.isDeclareExportDeclaration = Cp
	T.isDeclareFunction = Ip
	T.isDeclareInterface = gp
	T.isDeclareModule = Dp
	T.isDeclareModuleExports = xp
	T.isDeclareOpaqueType = Op
	T.isDeclareTypeAlias = Np
	T.isDeclareVariable = Pp
	T.isDeclaredPredicate = vp
	T.isDecorator = Jf
	T.isDirective = Uc
	T.isDirectiveLiteral = Gc
	T.isDoExpression = Wf
	T.isDoWhileStatement = Jc
	T.isEmptyStatement = Wc
	T.isEmptyTypeAnnotation = jp
	T.isEnumBody = nm
	T.isEnumBooleanBody = Sf
	T.isEnumBooleanMember = _f
	T.isEnumDeclaration = yf
	T.isEnumDefaultedMember = Df
	T.isEnumMember = sm
	T.isEnumNumberBody = bf
	T.isEnumNumberMember = If
	T.isEnumStringBody = Af
	T.isEnumStringMember = gf
	T.isEnumSymbolBody = hf
	T.isExistsTypeAnnotation = Rp
	T.isExportAllDeclaration = kd
	T.isExportDeclaration = W0
	T.isExportDefaultDeclaration = Ud
	T.isExportDefaultSpecifier = Qf
	T.isExportNamedDeclaration = Gd
	T.isExportNamespaceSpecifier = ip
	T.isExportSpecifier = qd
	T.isExpression = b0
	T.isExpressionStatement = Qc
	T.isExpressionWrapper = C0
	T.isFile = $c
	T.isFlow = Z0
	T.isFlowBaseAnnotation = tm
	T.isFlowDeclaration = rm
	T.isFlowPredicate = am
	T.isFlowType = em
	T.isFor = L0
	T.isForInStatement = zc
	T.isForOfStatement = Hd
	T.isForStatement = Zc
	T.isForXStatement = v0
	T.isFunction = R0
	T.isFunctionDeclaration = ed
	T.isFunctionExpression = td
	T.isFunctionParent = M0
	T.isFunctionTypeAnnotation = Mp
	T.isFunctionTypeParam = Bp
	T.isGenericTypeAnnotation = wp
	T.isIdentifier = rd
	T.isIfStatement = ad
	T.isImmutable = q0
	T.isImport = np
	T.isImportAttribute = mp
	T.isImportDeclaration = jd
	T.isImportDefaultSpecifier = Yd
	T.isImportExpression = Xd
	T.isImportNamespaceSpecifier = Vd
	T.isImportOrExportDeclaration = Di
	T.isImportSpecifier = Kd
	T.isIndexedAccessType = xf
	T.isInferredPredicate = Fp
	T.isInterfaceDeclaration = Up
	T.isInterfaceExtends = kp
	T.isInterfaceTypeAnnotation = Gp
	T.isInterpreterDirective = kc
	T.isIntersectionTypeAnnotation = qp
	T.isJSX = im
	T.isJSXAttribute = Of
	T.isJSXClosingElement = Pf
	T.isJSXClosingFragment = Hf
	T.isJSXElement = Cf
	T.isJSXEmptyExpression = Lf
	T.isJSXExpressionContainer = vf
	T.isJSXFragment = Gf
	T.isJSXIdentifier = Mf
	T.isJSXMemberExpression = Bf
	T.isJSXNamespacedName = wf
	T.isJSXOpeningElement = Ff
	T.isJSXOpeningFragment = qf
	T.isJSXSpreadAttribute = kf
	T.isJSXSpreadChild = Rf
	T.isJSXText = Uf
	T.isLVal = k0
	T.isLabeledStatement = nd
	T.isLiteral = G0
	T.isLogicalExpression = cd
	T.isLoop = O0
	T.isMemberExpression = dd
	T.isMetaProperty = Jd
	T.isMethod = j0
	T.isMiscellaneous = um
	T.isMixedTypeAnnotation = Hp
	T.isModuleDeclaration = Em
	T.isModuleExpression = eT
	T.isModuleSpecifier = Q0
	T.isNewExpression = pd
	T.isNoop = jf
	T.isNullLiteral = ud
	T.isNullLiteralTypeAnnotation = Ap
	T.isNullableTypeAnnotation = Yp
	T.isNumberLiteral = pm
	T.isNumberLiteralTypeAnnotation = Vp
	T.isNumberTypeAnnotation = Kp
	T.isNumericLiteral = id
	T.isObjectExpression = Td
	T.isObjectMember = Y0
	T.isObjectMethod = md
	T.isObjectPattern = Qd
	T.isObjectProperty = Ed
	T.isObjectTypeAnnotation = Xp
	T.isObjectTypeCallProperty = Wp
	T.isObjectTypeIndexer = Qp
	T.isObjectTypeInternalSlot = Jp
	T.isObjectTypeProperty = $p
	T.isObjectTypeSpreadProperty = zp
	T.isOpaqueType = Zp
	T.isOptionalCallExpression = op
	T.isOptionalIndexedAccessType = Nf
	T.isOptionalMemberExpression = up
	T.isParenthesizedExpression = Ad
	T.isPattern = X0
	T.isPatternLike = F0
	T.isPipelineBareFunction = aT
	T.isPipelinePrimaryTopicReference = nT
	T.isPipelineTopicExpression = rT
	T.isPlaceholder = Yf
	T.isPrivate = z0
	T.isPrivateName = fp
	T.isProgram = fd
	T.isProperty = V0
	T.isPureish = B0
	T.isQualifiedTypeIdentifier = ef
	T.isRecordExpression = $f
	T.isRegExpLiteral = ld
	T.isRegexLiteral = fm
	T.isRestElement = yd
	T.isRestProperty = Tm
	T.isReturnStatement = Sd
	T.isScopable = h0
	T.isSequenceExpression = bd
	T.isSpreadElement = $d
	T.isSpreadProperty = mm
	T.isStandardized = S0
	T.isStatement = g0
	T.isStaticBlock = Tp
	T.isStringLiteral = sd
	T.isStringLiteralTypeAnnotation = tf
	T.isStringTypeAnnotation = rf
	T.isSuper = zd
	T.isSwitchCase = hd
	T.isSwitchStatement = _d
	T.isSymbolTypeAnnotation = af
	T.isTSAnyKeyword = TT
	T.isTSArrayType = MT
	T.isTSAsExpression = e0
	T.isTSBaseType = dm
	T.isTSBigIntKeyword = ET
	T.isTSBooleanKeyword = mT
	T.isTSCallSignatureDeclaration = lT
	T.isTSConditionalType = qT
	T.isTSConstructSignatureDeclaration = cT
	T.isTSConstructorType = PT
	T.isTSDeclareFunction = iT
	T.isTSDeclareMethod = uT
	T.isTSEntityName = U0
	T.isTSEnumBody = a0
	T.isTSEnumDeclaration = n0
	T.isTSEnumMember = s0
	T.isTSExportAssignment = p0
	T.isTSExpressionWithTypeArguments = WT
	T.isTSExternalModuleReference = c0
	T.isTSFunctionType = OT
	T.isTSImportEqualsDeclaration = l0
	T.isTSImportType = o0
	T.isTSIndexSignature = fT
	T.isTSIndexedAccessType = VT
	T.isTSInferType = HT
	T.isTSInstantiationExpression = ZT
	T.isTSInterfaceBody = $T
	T.isTSInterfaceDeclaration = QT
	T.isTSIntersectionType = GT
	T.isTSIntrinsicKeyword = yT
	T.isTSLiteralType = JT
	T.isTSMappedType = KT
	T.isTSMethodSignature = pT
	T.isTSModuleBlock = u0
	T.isTSModuleDeclaration = i0
	T.isTSNamedTupleMember = kT
	T.isTSNamespaceExportDeclaration = f0
	T.isTSNeverKeyword = ST
	T.isTSNonNullExpression = d0
	T.isTSNullKeyword = bT
	T.isTSNumberKeyword = AT
	T.isTSObjectKeyword = hT
	T.isTSOptionalType = wT
	T.isTSParameterProperty = sT
	T.isTSParenthesizedType = jT
	T.isTSPropertySignature = dT
	T.isTSQualifiedName = oT
	T.isTSRestType = FT
	T.isTSSatisfiesExpression = t0
	T.isTSStringKeyword = _T
	T.isTSSymbolKeyword = IT
	T.isTSTemplateLiteralType = XT
	T.isTSThisType = NT
	T.isTSTupleType = BT
	T.isTSType = cm
	T.isTSTypeAliasDeclaration = zT
	T.isTSTypeAnnotation = T0
	T.isTSTypeAssertion = r0
	T.isTSTypeElement = lm
	T.isTSTypeLiteral = RT
	T.isTSTypeOperator = YT
	T.isTSTypeParameter = y0
	T.isTSTypeParameterDeclaration = E0
	T.isTSTypeParameterInstantiation = m0
	T.isTSTypePredicate = LT
	T.isTSTypeQuery = vT
	T.isTSTypeReference = CT
	T.isTSUndefinedKeyword = gT
	T.isTSUnionType = UT
	T.isTSUnknownKeyword = DT
	T.isTSVoidKeyword = xT
	T.isTaggedTemplateExpression = Zd
	T.isTemplateElement = ep
	T.isTemplateLiteral = tp
	T.isTerminatorless = D0
	T.isThisExpression = Id
	T.isThisTypeAnnotation = nf
	T.isThrowStatement = gd
	T.isTopicReference = tT
	T.isTryStatement = Dd
	T.isTupleExpression = zf
	T.isTupleTypeAnnotation = sf
	T.isTypeAlias = of
	T.isTypeAnnotation = lf
	T.isTypeCastExpression = cf
	T.isTypeParameter = df
	T.isTypeParameterDeclaration = pf
	T.isTypeParameterInstantiation = ff
	T.isTypeScript = om
	T.isTypeofTypeAnnotation = uf
	T.isUnaryExpression = xd
	T.isUnaryLike = K0
	T.isUnionTypeAnnotation = Tf
	T.isUpdateExpression = Nd
	T.isUserWhitespacable = H0
	T.isV8IntrinsicIdentifier = Vf
	T.isVariableDeclaration = Od
	T.isVariableDeclarator = Pd
	T.isVariance = mf
	T.isVoidTypeAnnotation = Ef
	T.isWhile = P0
	T.isWhileStatement = Cd
	T.isWithStatement = Ld
	T.isYieldExpression = rp
	var y = yr(),
		Ut = St()
	function Bc(e, t) {
		return !e || e.type !== "ArrayExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function wc(e, t) {
		return !e || e.type !== "AssignmentExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Fc(e, t) {
		return !e || e.type !== "BinaryExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function kc(e, t) {
		return !e || e.type !== "InterpreterDirective"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Uc(e, t) {
		return !e || e.type !== "Directive"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Gc(e, t) {
		return !e || e.type !== "DirectiveLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function qc(e, t) {
		return !e || e.type !== "BlockStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Hc(e, t) {
		return !e || e.type !== "BreakStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function jc(e, t) {
		return !e || e.type !== "CallExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Yc(e, t) {
		return !e || e.type !== "CatchClause"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Vc(e, t) {
		return !e || e.type !== "ConditionalExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Kc(e, t) {
		return !e || e.type !== "ContinueStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Xc(e, t) {
		return !e || e.type !== "DebuggerStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Jc(e, t) {
		return !e || e.type !== "DoWhileStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Wc(e, t) {
		return !e || e.type !== "EmptyStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Qc(e, t) {
		return !e || e.type !== "ExpressionStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function $c(e, t) {
		return !e || e.type !== "File" ? !1 : t == null || (0, y.default)(e, t)
	}
	function zc(e, t) {
		return !e || e.type !== "ForInStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Zc(e, t) {
		return !e || e.type !== "ForStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ed(e, t) {
		return !e || e.type !== "FunctionDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function td(e, t) {
		return !e || e.type !== "FunctionExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function rd(e, t) {
		return !e || e.type !== "Identifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ad(e, t) {
		return !e || e.type !== "IfStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function nd(e, t) {
		return !e || e.type !== "LabeledStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function sd(e, t) {
		return !e || e.type !== "StringLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function id(e, t) {
		return !e || e.type !== "NumericLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ud(e, t) {
		return !e || e.type !== "NullLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function od(e, t) {
		return !e || e.type !== "BooleanLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ld(e, t) {
		return !e || e.type !== "RegExpLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function cd(e, t) {
		return !e || e.type !== "LogicalExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function dd(e, t) {
		return !e || e.type !== "MemberExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function pd(e, t) {
		return !e || e.type !== "NewExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function fd(e, t) {
		return !e || e.type !== "Program" ? !1 : t == null || (0, y.default)(e, t)
	}
	function Td(e, t) {
		return !e || e.type !== "ObjectExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function md(e, t) {
		return !e || e.type !== "ObjectMethod"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ed(e, t) {
		return !e || e.type !== "ObjectProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function yd(e, t) {
		return !e || e.type !== "RestElement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Sd(e, t) {
		return !e || e.type !== "ReturnStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function bd(e, t) {
		return !e || e.type !== "SequenceExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ad(e, t) {
		return !e || e.type !== "ParenthesizedExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function hd(e, t) {
		return !e || e.type !== "SwitchCase"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function _d(e, t) {
		return !e || e.type !== "SwitchStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Id(e, t) {
		return !e || e.type !== "ThisExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function gd(e, t) {
		return !e || e.type !== "ThrowStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Dd(e, t) {
		return !e || e.type !== "TryStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function xd(e, t) {
		return !e || e.type !== "UnaryExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Nd(e, t) {
		return !e || e.type !== "UpdateExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Od(e, t) {
		return !e || e.type !== "VariableDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Pd(e, t) {
		return !e || e.type !== "VariableDeclarator"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Cd(e, t) {
		return !e || e.type !== "WhileStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ld(e, t) {
		return !e || e.type !== "WithStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function vd(e, t) {
		return !e || e.type !== "AssignmentPattern"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Rd(e, t) {
		return !e || e.type !== "ArrayPattern"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Md(e, t) {
		return !e || e.type !== "ArrowFunctionExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Bd(e, t) {
		return !e || e.type !== "ClassBody"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function wd(e, t) {
		return !e || e.type !== "ClassExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Fd(e, t) {
		return !e || e.type !== "ClassDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function kd(e, t) {
		return !e || e.type !== "ExportAllDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ud(e, t) {
		return !e || e.type !== "ExportDefaultDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Gd(e, t) {
		return !e || e.type !== "ExportNamedDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function qd(e, t) {
		return !e || e.type !== "ExportSpecifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Hd(e, t) {
		return !e || e.type !== "ForOfStatement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function jd(e, t) {
		return !e || e.type !== "ImportDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Yd(e, t) {
		return !e || e.type !== "ImportDefaultSpecifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Vd(e, t) {
		return !e || e.type !== "ImportNamespaceSpecifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Kd(e, t) {
		return !e || e.type !== "ImportSpecifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Xd(e, t) {
		return !e || e.type !== "ImportExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Jd(e, t) {
		return !e || e.type !== "MetaProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Wd(e, t) {
		return !e || e.type !== "ClassMethod"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Qd(e, t) {
		return !e || e.type !== "ObjectPattern"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function $d(e, t) {
		return !e || e.type !== "SpreadElement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function zd(e, t) {
		return !e || e.type !== "Super" ? !1 : t == null || (0, y.default)(e, t)
	}
	function Zd(e, t) {
		return !e || e.type !== "TaggedTemplateExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ep(e, t) {
		return !e || e.type !== "TemplateElement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function tp(e, t) {
		return !e || e.type !== "TemplateLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function rp(e, t) {
		return !e || e.type !== "YieldExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ap(e, t) {
		return !e || e.type !== "AwaitExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function np(e, t) {
		return !e || e.type !== "Import" ? !1 : t == null || (0, y.default)(e, t)
	}
	function sp(e, t) {
		return !e || e.type !== "BigIntLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ip(e, t) {
		return !e || e.type !== "ExportNamespaceSpecifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function up(e, t) {
		return !e || e.type !== "OptionalMemberExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function op(e, t) {
		return !e || e.type !== "OptionalCallExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function lp(e, t) {
		return !e || e.type !== "ClassProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function cp(e, t) {
		return !e || e.type !== "ClassAccessorProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function dp(e, t) {
		return !e || e.type !== "ClassPrivateProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function pp(e, t) {
		return !e || e.type !== "ClassPrivateMethod"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function fp(e, t) {
		return !e || e.type !== "PrivateName"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Tp(e, t) {
		return !e || e.type !== "StaticBlock"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function mp(e, t) {
		return !e || e.type !== "ImportAttribute"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ep(e, t) {
		return !e || e.type !== "AnyTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function yp(e, t) {
		return !e || e.type !== "ArrayTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Sp(e, t) {
		return !e || e.type !== "BooleanTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function bp(e, t) {
		return !e || e.type !== "BooleanLiteralTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ap(e, t) {
		return !e || e.type !== "NullLiteralTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function hp(e, t) {
		return !e || e.type !== "ClassImplements"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function _p(e, t) {
		return !e || e.type !== "DeclareClass"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ip(e, t) {
		return !e || e.type !== "DeclareFunction"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function gp(e, t) {
		return !e || e.type !== "DeclareInterface"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Dp(e, t) {
		return !e || e.type !== "DeclareModule"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function xp(e, t) {
		return !e || e.type !== "DeclareModuleExports"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Np(e, t) {
		return !e || e.type !== "DeclareTypeAlias"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Op(e, t) {
		return !e || e.type !== "DeclareOpaqueType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Pp(e, t) {
		return !e || e.type !== "DeclareVariable"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Cp(e, t) {
		return !e || e.type !== "DeclareExportDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Lp(e, t) {
		return !e || e.type !== "DeclareExportAllDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function vp(e, t) {
		return !e || e.type !== "DeclaredPredicate"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Rp(e, t) {
		return !e || e.type !== "ExistsTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Mp(e, t) {
		return !e || e.type !== "FunctionTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Bp(e, t) {
		return !e || e.type !== "FunctionTypeParam"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function wp(e, t) {
		return !e || e.type !== "GenericTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Fp(e, t) {
		return !e || e.type !== "InferredPredicate"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function kp(e, t) {
		return !e || e.type !== "InterfaceExtends"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Up(e, t) {
		return !e || e.type !== "InterfaceDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Gp(e, t) {
		return !e || e.type !== "InterfaceTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function qp(e, t) {
		return !e || e.type !== "IntersectionTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Hp(e, t) {
		return !e || e.type !== "MixedTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function jp(e, t) {
		return !e || e.type !== "EmptyTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Yp(e, t) {
		return !e || e.type !== "NullableTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Vp(e, t) {
		return !e || e.type !== "NumberLiteralTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Kp(e, t) {
		return !e || e.type !== "NumberTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Xp(e, t) {
		return !e || e.type !== "ObjectTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Jp(e, t) {
		return !e || e.type !== "ObjectTypeInternalSlot"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Wp(e, t) {
		return !e || e.type !== "ObjectTypeCallProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Qp(e, t) {
		return !e || e.type !== "ObjectTypeIndexer"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function $p(e, t) {
		return !e || e.type !== "ObjectTypeProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function zp(e, t) {
		return !e || e.type !== "ObjectTypeSpreadProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Zp(e, t) {
		return !e || e.type !== "OpaqueType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ef(e, t) {
		return !e || e.type !== "QualifiedTypeIdentifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function tf(e, t) {
		return !e || e.type !== "StringLiteralTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function rf(e, t) {
		return !e || e.type !== "StringTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function af(e, t) {
		return !e || e.type !== "SymbolTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function nf(e, t) {
		return !e || e.type !== "ThisTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function sf(e, t) {
		return !e || e.type !== "TupleTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function uf(e, t) {
		return !e || e.type !== "TypeofTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function of(e, t) {
		return !e || e.type !== "TypeAlias"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function lf(e, t) {
		return !e || e.type !== "TypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function cf(e, t) {
		return !e || e.type !== "TypeCastExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function df(e, t) {
		return !e || e.type !== "TypeParameter"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function pf(e, t) {
		return !e || e.type !== "TypeParameterDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ff(e, t) {
		return !e || e.type !== "TypeParameterInstantiation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Tf(e, t) {
		return !e || e.type !== "UnionTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function mf(e, t) {
		return !e || e.type !== "Variance"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ef(e, t) {
		return !e || e.type !== "VoidTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function yf(e, t) {
		return !e || e.type !== "EnumDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Sf(e, t) {
		return !e || e.type !== "EnumBooleanBody"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function bf(e, t) {
		return !e || e.type !== "EnumNumberBody"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Af(e, t) {
		return !e || e.type !== "EnumStringBody"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function hf(e, t) {
		return !e || e.type !== "EnumSymbolBody"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function _f(e, t) {
		return !e || e.type !== "EnumBooleanMember"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function If(e, t) {
		return !e || e.type !== "EnumNumberMember"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function gf(e, t) {
		return !e || e.type !== "EnumStringMember"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Df(e, t) {
		return !e || e.type !== "EnumDefaultedMember"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function xf(e, t) {
		return !e || e.type !== "IndexedAccessType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Nf(e, t) {
		return !e || e.type !== "OptionalIndexedAccessType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Of(e, t) {
		return !e || e.type !== "JSXAttribute"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Pf(e, t) {
		return !e || e.type !== "JSXClosingElement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Cf(e, t) {
		return !e || e.type !== "JSXElement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Lf(e, t) {
		return !e || e.type !== "JSXEmptyExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function vf(e, t) {
		return !e || e.type !== "JSXExpressionContainer"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Rf(e, t) {
		return !e || e.type !== "JSXSpreadChild"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Mf(e, t) {
		return !e || e.type !== "JSXIdentifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Bf(e, t) {
		return !e || e.type !== "JSXMemberExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function wf(e, t) {
		return !e || e.type !== "JSXNamespacedName"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Ff(e, t) {
		return !e || e.type !== "JSXOpeningElement"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function kf(e, t) {
		return !e || e.type !== "JSXSpreadAttribute"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Uf(e, t) {
		return !e || e.type !== "JSXText" ? !1 : t == null || (0, y.default)(e, t)
	}
	function Gf(e, t) {
		return !e || e.type !== "JSXFragment"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function qf(e, t) {
		return !e || e.type !== "JSXOpeningFragment"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Hf(e, t) {
		return !e || e.type !== "JSXClosingFragment"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function jf(e, t) {
		return !e || e.type !== "Noop" ? !1 : t == null || (0, y.default)(e, t)
	}
	function Yf(e, t) {
		return !e || e.type !== "Placeholder"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Vf(e, t) {
		return !e || e.type !== "V8IntrinsicIdentifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Kf(e, t) {
		return !e || e.type !== "ArgumentPlaceholder"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Xf(e, t) {
		return !e || e.type !== "BindExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Jf(e, t) {
		return !e || e.type !== "Decorator"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Wf(e, t) {
		return !e || e.type !== "DoExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Qf(e, t) {
		return !e || e.type !== "ExportDefaultSpecifier"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function $f(e, t) {
		return !e || e.type !== "RecordExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function zf(e, t) {
		return !e || e.type !== "TupleExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function Zf(e, t) {
		return !e || e.type !== "DecimalLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function eT(e, t) {
		return !e || e.type !== "ModuleExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function tT(e, t) {
		return !e || e.type !== "TopicReference"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function rT(e, t) {
		return !e || e.type !== "PipelineTopicExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function aT(e, t) {
		return !e || e.type !== "PipelineBareFunction"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function nT(e, t) {
		return !e || e.type !== "PipelinePrimaryTopicReference"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function sT(e, t) {
		return !e || e.type !== "TSParameterProperty"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function iT(e, t) {
		return !e || e.type !== "TSDeclareFunction"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function uT(e, t) {
		return !e || e.type !== "TSDeclareMethod"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function oT(e, t) {
		return !e || e.type !== "TSQualifiedName"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function lT(e, t) {
		return !e || e.type !== "TSCallSignatureDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function cT(e, t) {
		return !e || e.type !== "TSConstructSignatureDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function dT(e, t) {
		return !e || e.type !== "TSPropertySignature"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function pT(e, t) {
		return !e || e.type !== "TSMethodSignature"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function fT(e, t) {
		return !e || e.type !== "TSIndexSignature"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function TT(e, t) {
		return !e || e.type !== "TSAnyKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function mT(e, t) {
		return !e || e.type !== "TSBooleanKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ET(e, t) {
		return !e || e.type !== "TSBigIntKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function yT(e, t) {
		return !e || e.type !== "TSIntrinsicKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ST(e, t) {
		return !e || e.type !== "TSNeverKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function bT(e, t) {
		return !e || e.type !== "TSNullKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function AT(e, t) {
		return !e || e.type !== "TSNumberKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function hT(e, t) {
		return !e || e.type !== "TSObjectKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function _T(e, t) {
		return !e || e.type !== "TSStringKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function IT(e, t) {
		return !e || e.type !== "TSSymbolKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function gT(e, t) {
		return !e || e.type !== "TSUndefinedKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function DT(e, t) {
		return !e || e.type !== "TSUnknownKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function xT(e, t) {
		return !e || e.type !== "TSVoidKeyword"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function NT(e, t) {
		return !e || e.type !== "TSThisType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function OT(e, t) {
		return !e || e.type !== "TSFunctionType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function PT(e, t) {
		return !e || e.type !== "TSConstructorType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function CT(e, t) {
		return !e || e.type !== "TSTypeReference"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function LT(e, t) {
		return !e || e.type !== "TSTypePredicate"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function vT(e, t) {
		return !e || e.type !== "TSTypeQuery"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function RT(e, t) {
		return !e || e.type !== "TSTypeLiteral"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function MT(e, t) {
		return !e || e.type !== "TSArrayType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function BT(e, t) {
		return !e || e.type !== "TSTupleType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function wT(e, t) {
		return !e || e.type !== "TSOptionalType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function FT(e, t) {
		return !e || e.type !== "TSRestType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function kT(e, t) {
		return !e || e.type !== "TSNamedTupleMember"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function UT(e, t) {
		return !e || e.type !== "TSUnionType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function GT(e, t) {
		return !e || e.type !== "TSIntersectionType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function qT(e, t) {
		return !e || e.type !== "TSConditionalType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function HT(e, t) {
		return !e || e.type !== "TSInferType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function jT(e, t) {
		return !e || e.type !== "TSParenthesizedType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function YT(e, t) {
		return !e || e.type !== "TSTypeOperator"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function VT(e, t) {
		return !e || e.type !== "TSIndexedAccessType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function KT(e, t) {
		return !e || e.type !== "TSMappedType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function XT(e, t) {
		return !e || e.type !== "TSTemplateLiteralType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function JT(e, t) {
		return !e || e.type !== "TSLiteralType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function WT(e, t) {
		return !e || e.type !== "TSExpressionWithTypeArguments"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function QT(e, t) {
		return !e || e.type !== "TSInterfaceDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function $T(e, t) {
		return !e || e.type !== "TSInterfaceBody"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function zT(e, t) {
		return !e || e.type !== "TSTypeAliasDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function ZT(e, t) {
		return !e || e.type !== "TSInstantiationExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function e0(e, t) {
		return !e || e.type !== "TSAsExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function t0(e, t) {
		return !e || e.type !== "TSSatisfiesExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function r0(e, t) {
		return !e || e.type !== "TSTypeAssertion"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function a0(e, t) {
		return !e || e.type !== "TSEnumBody"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function n0(e, t) {
		return !e || e.type !== "TSEnumDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function s0(e, t) {
		return !e || e.type !== "TSEnumMember"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function i0(e, t) {
		return !e || e.type !== "TSModuleDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function u0(e, t) {
		return !e || e.type !== "TSModuleBlock"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function o0(e, t) {
		return !e || e.type !== "TSImportType"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function l0(e, t) {
		return !e || e.type !== "TSImportEqualsDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function c0(e, t) {
		return !e || e.type !== "TSExternalModuleReference"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function d0(e, t) {
		return !e || e.type !== "TSNonNullExpression"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function p0(e, t) {
		return !e || e.type !== "TSExportAssignment"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function f0(e, t) {
		return !e || e.type !== "TSNamespaceExportDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function T0(e, t) {
		return !e || e.type !== "TSTypeAnnotation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function m0(e, t) {
		return !e || e.type !== "TSTypeParameterInstantiation"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function E0(e, t) {
		return !e || e.type !== "TSTypeParameterDeclaration"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function y0(e, t) {
		return !e || e.type !== "TSTypeParameter"
			? !1
			: t == null || (0, y.default)(e, t)
	}
	function S0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ArrayExpression":
			case "AssignmentExpression":
			case "BinaryExpression":
			case "InterpreterDirective":
			case "Directive":
			case "DirectiveLiteral":
			case "BlockStatement":
			case "BreakStatement":
			case "CallExpression":
			case "CatchClause":
			case "ConditionalExpression":
			case "ContinueStatement":
			case "DebuggerStatement":
			case "DoWhileStatement":
			case "EmptyStatement":
			case "ExpressionStatement":
			case "File":
			case "ForInStatement":
			case "ForStatement":
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "Identifier":
			case "IfStatement":
			case "LabeledStatement":
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "RegExpLiteral":
			case "LogicalExpression":
			case "MemberExpression":
			case "NewExpression":
			case "Program":
			case "ObjectExpression":
			case "ObjectMethod":
			case "ObjectProperty":
			case "RestElement":
			case "ReturnStatement":
			case "SequenceExpression":
			case "ParenthesizedExpression":
			case "SwitchCase":
			case "SwitchStatement":
			case "ThisExpression":
			case "ThrowStatement":
			case "TryStatement":
			case "UnaryExpression":
			case "UpdateExpression":
			case "VariableDeclaration":
			case "VariableDeclarator":
			case "WhileStatement":
			case "WithStatement":
			case "AssignmentPattern":
			case "ArrayPattern":
			case "ArrowFunctionExpression":
			case "ClassBody":
			case "ClassExpression":
			case "ClassDeclaration":
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ExportSpecifier":
			case "ForOfStatement":
			case "ImportDeclaration":
			case "ImportDefaultSpecifier":
			case "ImportNamespaceSpecifier":
			case "ImportSpecifier":
			case "ImportExpression":
			case "MetaProperty":
			case "ClassMethod":
			case "ObjectPattern":
			case "SpreadElement":
			case "Super":
			case "TaggedTemplateExpression":
			case "TemplateElement":
			case "TemplateLiteral":
			case "YieldExpression":
			case "AwaitExpression":
			case "Import":
			case "BigIntLiteral":
			case "ExportNamespaceSpecifier":
			case "OptionalMemberExpression":
			case "OptionalCallExpression":
			case "ClassProperty":
			case "ClassAccessorProperty":
			case "ClassPrivateProperty":
			case "ClassPrivateMethod":
			case "PrivateName":
			case "StaticBlock":
			case "ImportAttribute":
				break
			case "Placeholder":
				switch (e.expectedNode) {
					case "Identifier":
					case "StringLiteral":
					case "BlockStatement":
					case "ClassBody":
						break
					default:
						return !1
				}
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function b0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ArrayExpression":
			case "AssignmentExpression":
			case "BinaryExpression":
			case "CallExpression":
			case "ConditionalExpression":
			case "FunctionExpression":
			case "Identifier":
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "RegExpLiteral":
			case "LogicalExpression":
			case "MemberExpression":
			case "NewExpression":
			case "ObjectExpression":
			case "SequenceExpression":
			case "ParenthesizedExpression":
			case "ThisExpression":
			case "UnaryExpression":
			case "UpdateExpression":
			case "ArrowFunctionExpression":
			case "ClassExpression":
			case "ImportExpression":
			case "MetaProperty":
			case "Super":
			case "TaggedTemplateExpression":
			case "TemplateLiteral":
			case "YieldExpression":
			case "AwaitExpression":
			case "Import":
			case "BigIntLiteral":
			case "OptionalMemberExpression":
			case "OptionalCallExpression":
			case "TypeCastExpression":
			case "JSXElement":
			case "JSXFragment":
			case "BindExpression":
			case "DoExpression":
			case "RecordExpression":
			case "TupleExpression":
			case "DecimalLiteral":
			case "ModuleExpression":
			case "TopicReference":
			case "PipelineTopicExpression":
			case "PipelineBareFunction":
			case "PipelinePrimaryTopicReference":
			case "TSInstantiationExpression":
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSNonNullExpression":
				break
			case "Placeholder":
				switch (e.expectedNode) {
					case "Expression":
					case "Identifier":
					case "StringLiteral":
						break
					default:
						return !1
				}
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function A0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "BinaryExpression":
			case "LogicalExpression":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function h0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "BlockStatement":
			case "CatchClause":
			case "DoWhileStatement":
			case "ForInStatement":
			case "ForStatement":
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "Program":
			case "ObjectMethod":
			case "SwitchStatement":
			case "WhileStatement":
			case "ArrowFunctionExpression":
			case "ClassExpression":
			case "ClassDeclaration":
			case "ForOfStatement":
			case "ClassMethod":
			case "ClassPrivateMethod":
			case "StaticBlock":
			case "TSModuleBlock":
				break
			case "Placeholder":
				if (e.expectedNode === "BlockStatement") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function _0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "BlockStatement":
			case "CatchClause":
			case "DoWhileStatement":
			case "ForInStatement":
			case "ForStatement":
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "Program":
			case "ObjectMethod":
			case "SwitchStatement":
			case "WhileStatement":
			case "ArrowFunctionExpression":
			case "ForOfStatement":
			case "ClassMethod":
			case "ClassPrivateMethod":
			case "StaticBlock":
			case "TSModuleBlock":
				break
			case "Placeholder":
				if (e.expectedNode === "BlockStatement") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function I0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "BlockStatement":
			case "Program":
			case "TSModuleBlock":
				break
			case "Placeholder":
				if (e.expectedNode === "BlockStatement") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function g0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "BlockStatement":
			case "BreakStatement":
			case "ContinueStatement":
			case "DebuggerStatement":
			case "DoWhileStatement":
			case "EmptyStatement":
			case "ExpressionStatement":
			case "ForInStatement":
			case "ForStatement":
			case "FunctionDeclaration":
			case "IfStatement":
			case "LabeledStatement":
			case "ReturnStatement":
			case "SwitchStatement":
			case "ThrowStatement":
			case "TryStatement":
			case "VariableDeclaration":
			case "WhileStatement":
			case "WithStatement":
			case "ClassDeclaration":
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ForOfStatement":
			case "ImportDeclaration":
			case "DeclareClass":
			case "DeclareFunction":
			case "DeclareInterface":
			case "DeclareModule":
			case "DeclareModuleExports":
			case "DeclareTypeAlias":
			case "DeclareOpaqueType":
			case "DeclareVariable":
			case "DeclareExportDeclaration":
			case "DeclareExportAllDeclaration":
			case "InterfaceDeclaration":
			case "OpaqueType":
			case "TypeAlias":
			case "EnumDeclaration":
			case "TSDeclareFunction":
			case "TSInterfaceDeclaration":
			case "TSTypeAliasDeclaration":
			case "TSEnumDeclaration":
			case "TSModuleDeclaration":
			case "TSImportEqualsDeclaration":
			case "TSExportAssignment":
			case "TSNamespaceExportDeclaration":
				break
			case "Placeholder":
				switch (e.expectedNode) {
					case "Statement":
					case "Declaration":
					case "BlockStatement":
						break
					default:
						return !1
				}
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function D0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "BreakStatement":
			case "ContinueStatement":
			case "ReturnStatement":
			case "ThrowStatement":
			case "YieldExpression":
			case "AwaitExpression":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function x0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "BreakStatement":
			case "ContinueStatement":
			case "ReturnStatement":
			case "ThrowStatement":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function N0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ConditionalExpression":
			case "IfStatement":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function O0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "DoWhileStatement":
			case "ForInStatement":
			case "ForStatement":
			case "WhileStatement":
			case "ForOfStatement":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function P0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "DoWhileStatement":
			case "WhileStatement":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function C0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ExpressionStatement":
			case "ParenthesizedExpression":
			case "TypeCastExpression":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function L0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ForInStatement":
			case "ForStatement":
			case "ForOfStatement":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function v0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ForInStatement":
			case "ForOfStatement":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function R0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "ObjectMethod":
			case "ArrowFunctionExpression":
			case "ClassMethod":
			case "ClassPrivateMethod":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function M0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "ObjectMethod":
			case "ArrowFunctionExpression":
			case "ClassMethod":
			case "ClassPrivateMethod":
			case "StaticBlock":
			case "TSModuleBlock":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function B0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "RegExpLiteral":
			case "ArrowFunctionExpression":
			case "BigIntLiteral":
			case "DecimalLiteral":
				break
			case "Placeholder":
				if (e.expectedNode === "StringLiteral") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function w0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "FunctionDeclaration":
			case "VariableDeclaration":
			case "ClassDeclaration":
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ImportDeclaration":
			case "DeclareClass":
			case "DeclareFunction":
			case "DeclareInterface":
			case "DeclareModule":
			case "DeclareModuleExports":
			case "DeclareTypeAlias":
			case "DeclareOpaqueType":
			case "DeclareVariable":
			case "DeclareExportDeclaration":
			case "DeclareExportAllDeclaration":
			case "InterfaceDeclaration":
			case "OpaqueType":
			case "TypeAlias":
			case "EnumDeclaration":
			case "TSDeclareFunction":
			case "TSInterfaceDeclaration":
			case "TSTypeAliasDeclaration":
			case "TSEnumDeclaration":
			case "TSModuleDeclaration":
			case "TSImportEqualsDeclaration":
				break
			case "Placeholder":
				if (e.expectedNode === "Declaration") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function F0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "Identifier":
			case "RestElement":
			case "AssignmentPattern":
			case "ArrayPattern":
			case "ObjectPattern":
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSNonNullExpression":
				break
			case "Placeholder":
				switch (e.expectedNode) {
					case "Pattern":
					case "Identifier":
						break
					default:
						return !1
				}
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function k0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "Identifier":
			case "MemberExpression":
			case "RestElement":
			case "AssignmentPattern":
			case "ArrayPattern":
			case "ObjectPattern":
			case "TSParameterProperty":
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSNonNullExpression":
				break
			case "Placeholder":
				switch (e.expectedNode) {
					case "Pattern":
					case "Identifier":
						break
					default:
						return !1
				}
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function U0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "Identifier":
			case "TSQualifiedName":
				break
			case "Placeholder":
				if (e.expectedNode === "Identifier") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function G0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "RegExpLiteral":
			case "TemplateLiteral":
			case "BigIntLiteral":
			case "DecimalLiteral":
				break
			case "Placeholder":
				if (e.expectedNode === "StringLiteral") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function q0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "BigIntLiteral":
			case "JSXAttribute":
			case "JSXClosingElement":
			case "JSXElement":
			case "JSXExpressionContainer":
			case "JSXSpreadChild":
			case "JSXOpeningElement":
			case "JSXText":
			case "JSXFragment":
			case "JSXOpeningFragment":
			case "JSXClosingFragment":
			case "DecimalLiteral":
				break
			case "Placeholder":
				if (e.expectedNode === "StringLiteral") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function H0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ObjectMethod":
			case "ObjectProperty":
			case "ObjectTypeInternalSlot":
			case "ObjectTypeCallProperty":
			case "ObjectTypeIndexer":
			case "ObjectTypeProperty":
			case "ObjectTypeSpreadProperty":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function j0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ObjectMethod":
			case "ClassMethod":
			case "ClassPrivateMethod":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function Y0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ObjectMethod":
			case "ObjectProperty":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function V0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ObjectProperty":
			case "ClassProperty":
			case "ClassAccessorProperty":
			case "ClassPrivateProperty":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function K0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "UnaryExpression":
			case "SpreadElement":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function X0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "AssignmentPattern":
			case "ArrayPattern":
			case "ObjectPattern":
				break
			case "Placeholder":
				if (e.expectedNode === "Pattern") break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function J0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ClassExpression":
			case "ClassDeclaration":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function Di(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ImportDeclaration":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function W0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function Q0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ExportSpecifier":
			case "ImportDefaultSpecifier":
			case "ImportNamespaceSpecifier":
			case "ImportSpecifier":
			case "ExportNamespaceSpecifier":
			case "ExportDefaultSpecifier":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function $0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ClassAccessorProperty":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function z0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "ClassPrivateProperty":
			case "ClassPrivateMethod":
			case "PrivateName":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function Z0(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "AnyTypeAnnotation":
			case "ArrayTypeAnnotation":
			case "BooleanTypeAnnotation":
			case "BooleanLiteralTypeAnnotation":
			case "NullLiteralTypeAnnotation":
			case "ClassImplements":
			case "DeclareClass":
			case "DeclareFunction":
			case "DeclareInterface":
			case "DeclareModule":
			case "DeclareModuleExports":
			case "DeclareTypeAlias":
			case "DeclareOpaqueType":
			case "DeclareVariable":
			case "DeclareExportDeclaration":
			case "DeclareExportAllDeclaration":
			case "DeclaredPredicate":
			case "ExistsTypeAnnotation":
			case "FunctionTypeAnnotation":
			case "FunctionTypeParam":
			case "GenericTypeAnnotation":
			case "InferredPredicate":
			case "InterfaceExtends":
			case "InterfaceDeclaration":
			case "InterfaceTypeAnnotation":
			case "IntersectionTypeAnnotation":
			case "MixedTypeAnnotation":
			case "EmptyTypeAnnotation":
			case "NullableTypeAnnotation":
			case "NumberLiteralTypeAnnotation":
			case "NumberTypeAnnotation":
			case "ObjectTypeAnnotation":
			case "ObjectTypeInternalSlot":
			case "ObjectTypeCallProperty":
			case "ObjectTypeIndexer":
			case "ObjectTypeProperty":
			case "ObjectTypeSpreadProperty":
			case "OpaqueType":
			case "QualifiedTypeIdentifier":
			case "StringLiteralTypeAnnotation":
			case "StringTypeAnnotation":
			case "SymbolTypeAnnotation":
			case "ThisTypeAnnotation":
			case "TupleTypeAnnotation":
			case "TypeofTypeAnnotation":
			case "TypeAlias":
			case "TypeAnnotation":
			case "TypeCastExpression":
			case "TypeParameter":
			case "TypeParameterDeclaration":
			case "TypeParameterInstantiation":
			case "UnionTypeAnnotation":
			case "Variance":
			case "VoidTypeAnnotation":
			case "EnumDeclaration":
			case "EnumBooleanBody":
			case "EnumNumberBody":
			case "EnumStringBody":
			case "EnumSymbolBody":
			case "EnumBooleanMember":
			case "EnumNumberMember":
			case "EnumStringMember":
			case "EnumDefaultedMember":
			case "IndexedAccessType":
			case "OptionalIndexedAccessType":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function em(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "AnyTypeAnnotation":
			case "ArrayTypeAnnotation":
			case "BooleanTypeAnnotation":
			case "BooleanLiteralTypeAnnotation":
			case "NullLiteralTypeAnnotation":
			case "ExistsTypeAnnotation":
			case "FunctionTypeAnnotation":
			case "GenericTypeAnnotation":
			case "InterfaceTypeAnnotation":
			case "IntersectionTypeAnnotation":
			case "MixedTypeAnnotation":
			case "EmptyTypeAnnotation":
			case "NullableTypeAnnotation":
			case "NumberLiteralTypeAnnotation":
			case "NumberTypeAnnotation":
			case "ObjectTypeAnnotation":
			case "StringLiteralTypeAnnotation":
			case "StringTypeAnnotation":
			case "SymbolTypeAnnotation":
			case "ThisTypeAnnotation":
			case "TupleTypeAnnotation":
			case "TypeofTypeAnnotation":
			case "UnionTypeAnnotation":
			case "VoidTypeAnnotation":
			case "IndexedAccessType":
			case "OptionalIndexedAccessType":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function tm(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "AnyTypeAnnotation":
			case "BooleanTypeAnnotation":
			case "NullLiteralTypeAnnotation":
			case "MixedTypeAnnotation":
			case "EmptyTypeAnnotation":
			case "NumberTypeAnnotation":
			case "StringTypeAnnotation":
			case "SymbolTypeAnnotation":
			case "ThisTypeAnnotation":
			case "VoidTypeAnnotation":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function rm(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "DeclareClass":
			case "DeclareFunction":
			case "DeclareInterface":
			case "DeclareModule":
			case "DeclareModuleExports":
			case "DeclareTypeAlias":
			case "DeclareOpaqueType":
			case "DeclareVariable":
			case "DeclareExportDeclaration":
			case "DeclareExportAllDeclaration":
			case "InterfaceDeclaration":
			case "OpaqueType":
			case "TypeAlias":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function am(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "DeclaredPredicate":
			case "InferredPredicate":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function nm(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "EnumBooleanBody":
			case "EnumNumberBody":
			case "EnumStringBody":
			case "EnumSymbolBody":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function sm(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "EnumBooleanMember":
			case "EnumNumberMember":
			case "EnumStringMember":
			case "EnumDefaultedMember":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function im(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "JSXAttribute":
			case "JSXClosingElement":
			case "JSXElement":
			case "JSXEmptyExpression":
			case "JSXExpressionContainer":
			case "JSXSpreadChild":
			case "JSXIdentifier":
			case "JSXMemberExpression":
			case "JSXNamespacedName":
			case "JSXOpeningElement":
			case "JSXSpreadAttribute":
			case "JSXText":
			case "JSXFragment":
			case "JSXOpeningFragment":
			case "JSXClosingFragment":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function um(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "Noop":
			case "Placeholder":
			case "V8IntrinsicIdentifier":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function om(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "TSParameterProperty":
			case "TSDeclareFunction":
			case "TSDeclareMethod":
			case "TSQualifiedName":
			case "TSCallSignatureDeclaration":
			case "TSConstructSignatureDeclaration":
			case "TSPropertySignature":
			case "TSMethodSignature":
			case "TSIndexSignature":
			case "TSAnyKeyword":
			case "TSBooleanKeyword":
			case "TSBigIntKeyword":
			case "TSIntrinsicKeyword":
			case "TSNeverKeyword":
			case "TSNullKeyword":
			case "TSNumberKeyword":
			case "TSObjectKeyword":
			case "TSStringKeyword":
			case "TSSymbolKeyword":
			case "TSUndefinedKeyword":
			case "TSUnknownKeyword":
			case "TSVoidKeyword":
			case "TSThisType":
			case "TSFunctionType":
			case "TSConstructorType":
			case "TSTypeReference":
			case "TSTypePredicate":
			case "TSTypeQuery":
			case "TSTypeLiteral":
			case "TSArrayType":
			case "TSTupleType":
			case "TSOptionalType":
			case "TSRestType":
			case "TSNamedTupleMember":
			case "TSUnionType":
			case "TSIntersectionType":
			case "TSConditionalType":
			case "TSInferType":
			case "TSParenthesizedType":
			case "TSTypeOperator":
			case "TSIndexedAccessType":
			case "TSMappedType":
			case "TSTemplateLiteralType":
			case "TSLiteralType":
			case "TSExpressionWithTypeArguments":
			case "TSInterfaceDeclaration":
			case "TSInterfaceBody":
			case "TSTypeAliasDeclaration":
			case "TSInstantiationExpression":
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSEnumBody":
			case "TSEnumDeclaration":
			case "TSEnumMember":
			case "TSModuleDeclaration":
			case "TSModuleBlock":
			case "TSImportType":
			case "TSImportEqualsDeclaration":
			case "TSExternalModuleReference":
			case "TSNonNullExpression":
			case "TSExportAssignment":
			case "TSNamespaceExportDeclaration":
			case "TSTypeAnnotation":
			case "TSTypeParameterInstantiation":
			case "TSTypeParameterDeclaration":
			case "TSTypeParameter":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function lm(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "TSCallSignatureDeclaration":
			case "TSConstructSignatureDeclaration":
			case "TSPropertySignature":
			case "TSMethodSignature":
			case "TSIndexSignature":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function cm(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "TSAnyKeyword":
			case "TSBooleanKeyword":
			case "TSBigIntKeyword":
			case "TSIntrinsicKeyword":
			case "TSNeverKeyword":
			case "TSNullKeyword":
			case "TSNumberKeyword":
			case "TSObjectKeyword":
			case "TSStringKeyword":
			case "TSSymbolKeyword":
			case "TSUndefinedKeyword":
			case "TSUnknownKeyword":
			case "TSVoidKeyword":
			case "TSThisType":
			case "TSFunctionType":
			case "TSConstructorType":
			case "TSTypeReference":
			case "TSTypePredicate":
			case "TSTypeQuery":
			case "TSTypeLiteral":
			case "TSArrayType":
			case "TSTupleType":
			case "TSOptionalType":
			case "TSRestType":
			case "TSUnionType":
			case "TSIntersectionType":
			case "TSConditionalType":
			case "TSInferType":
			case "TSParenthesizedType":
			case "TSTypeOperator":
			case "TSIndexedAccessType":
			case "TSMappedType":
			case "TSTemplateLiteralType":
			case "TSLiteralType":
			case "TSExpressionWithTypeArguments":
			case "TSImportType":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function dm(e, t) {
		if (!e) return !1
		switch (e.type) {
			case "TSAnyKeyword":
			case "TSBooleanKeyword":
			case "TSBigIntKeyword":
			case "TSIntrinsicKeyword":
			case "TSNeverKeyword":
			case "TSNullKeyword":
			case "TSNumberKeyword":
			case "TSObjectKeyword":
			case "TSStringKeyword":
			case "TSSymbolKeyword":
			case "TSUndefinedKeyword":
			case "TSUnknownKeyword":
			case "TSVoidKeyword":
			case "TSThisType":
			case "TSTemplateLiteralType":
			case "TSLiteralType":
				break
			default:
				return !1
		}
		return t == null || (0, y.default)(e, t)
	}
	function pm(e, t) {
		return (
			(0, Ut.default)("isNumberLiteral", "isNumericLiteral"),
			!e || e.type !== "NumberLiteral"
				? !1
				: t == null || (0, y.default)(e, t)
		)
	}
	function fm(e, t) {
		return (
			(0, Ut.default)("isRegexLiteral", "isRegExpLiteral"),
			!e || e.type !== "RegexLiteral"
				? !1
				: t == null || (0, y.default)(e, t)
		)
	}
	function Tm(e, t) {
		return (
			(0, Ut.default)("isRestProperty", "isRestElement"),
			!e || e.type !== "RestProperty"
				? !1
				: t == null || (0, y.default)(e, t)
		)
	}
	function mm(e, t) {
		return (
			(0, Ut.default)("isSpreadProperty", "isSpreadElement"),
			!e || e.type !== "SpreadProperty"
				? !1
				: t == null || (0, y.default)(e, t)
		)
	}
	function Em(e, t) {
		return (
			(0, Ut.default)("isModuleDeclaration", "isImportOrExportDeclaration"),
			Di(e, t)
		)
	}
})
var _a = v(ha => {
	"use strict"
	Object.defineProperty(ha, "__esModule", {value: !0})
	ha.default = ym
	var Gt = ce()
	function ym(e, t, r) {
		if (!(0, Gt.isMemberExpression)(e)) return !1
		let a = Array.isArray(t) ? t : t.split("."),
			n = [],
			i
		for (i = e; (0, Gt.isMemberExpression)(i); i = i.object)
			n.push(i.property)
		if ((n.push(i), n.length < a.length || (!r && n.length > a.length)))
			return !1
		for (let l = 0, d = n.length - 1; l < a.length; l++, d--) {
			let S = n[d],
				g
			if ((0, Gt.isIdentifier)(S)) g = S.name
			else if ((0, Gt.isStringLiteral)(S)) g = S.value
			else if ((0, Gt.isThisExpression)(S)) g = "this"
			else return !1
			if (a[l] !== g) return !1
		}
		return !0
	}
})
var ga = v(Ia => {
	"use strict"
	Object.defineProperty(Ia, "__esModule", {value: !0})
	Ia.default = bm
	var Sm = _a()
	function bm(e, t) {
		let r = e.split(".")
		return a => (0, Sm.default)(a, r, t)
	}
})
var xi = v(Sr => {
	"use strict"
	Object.defineProperty(Sr, "__esModule", {value: !0})
	Sr.default = void 0
	var Am = ga(),
		hm = (0, Am.default)("React.Component"),
		kL = (Sr.default = hm)
})
var Ni = v(Da => {
	"use strict"
	Object.defineProperty(Da, "__esModule", {value: !0})
	Da.default = _m
	function _m(e) {
		return !!e && /^[a-z]/.test(e)
	}
})
var br = v(xa => {
	"use strict"
	Object.defineProperty(xa, "__esModule", {value: !0})
	xa.default = Im
	var Oi = Be()
	function Im(e, t) {
		if (e === t) return !0
		if (e == null || Oi.ALIAS_KEYS[t]) return !1
		let r = Oi.FLIPPED_ALIAS_KEYS[t]
		return !!(r != null && r.includes(e))
	}
})
var Oa = v(Na => {
	"use strict"
	Object.defineProperty(Na, "__esModule", {value: !0})
	Na.default = Dm
	var gm = Be()
	function Dm(e, t) {
		if (e === t) return !0
		let r = gm.PLACEHOLDERS_ALIAS[e]
		return !!(r != null && r.includes(t))
	}
})
var bt = v(Pa => {
	"use strict"
	Object.defineProperty(Pa, "__esModule", {value: !0})
	Pa.default = Cm
	var xm = yr(),
		Nm = br(),
		Om = Oa(),
		Pm = Be()
	function Cm(e, t, r) {
		return t
			? (0, Nm.default)(t.type, e)
				? r === void 0
					? !0
					: (0, xm.default)(t, r)
				: !r && t.type === "Placeholder" && e in Pm.FLIPPED_ALIAS_KEYS
				? (0, Om.default)(t.expectedNode, e)
				: !1
			: !1
	}
})
var Ri = v(qt => {
	"use strict"
	Object.defineProperty(qt, "__esModule", {value: !0})
	qt.isIdentifierChar = vi
	qt.isIdentifierName = Mm
	qt.isIdentifierStart = Li
	var La =
			"\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
		Pi =
			"\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",
		Lm = new RegExp("[" + La + "]"),
		vm = new RegExp("[" + La + Pi + "]")
	La = Pi = null
	var Ci = [
			0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4,
			48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35,
			5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2,
			1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2,
			43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25,
			71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27,
			28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39,
			27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20,
			28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9,
			34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2,
			0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4,
			0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52,
			19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60,
			42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2,
			23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0,
			12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2,
			1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2,
			33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26,
			3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17,
			3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0,
			29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3,
			0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1,
			3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2,
			3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24,
			2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11,
			6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1,
			2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2,
			3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2,
			0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16,
			6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472,
			16, 621, 2467, 541, 1507, 4938, 6, 4191,
		],
		Rm = [
			509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166,
			1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54,
			14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1,
			45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9,
			7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0,
			3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214,
			6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243,
			14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0,
			29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9,
			57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4,
			9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465,
			27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3,
			82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3,
			6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14,
			1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62,
			13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239,
		]
	function Ca(e, t) {
		let r = 65536
		for (let a = 0, n = t.length; a < n; a += 2) {
			if (((r += t[a]), r > e)) return !1
			if (((r += t[a + 1]), r >= e)) return !0
		}
		return !1
	}
	function Li(e) {
		return e < 65
			? e === 36
			: e <= 90
			? !0
			: e < 97
			? e === 95
			: e <= 122
			? !0
			: e <= 65535
			? e >= 170 && Lm.test(String.fromCharCode(e))
			: Ca(e, Ci)
	}
	function vi(e) {
		return e < 48
			? e === 36
			: e < 58
			? !0
			: e < 65
			? !1
			: e <= 90
			? !0
			: e < 97
			? e === 95
			: e <= 122
			? !0
			: e <= 65535
			? e >= 170 && vm.test(String.fromCharCode(e))
			: Ca(e, Ci) || Ca(e, Rm)
	}
	function Mm(e) {
		let t = !0
		for (let r = 0; r < e.length; r++) {
			let a = e.charCodeAt(r)
			if ((a & 64512) === 55296 && r + 1 < e.length) {
				let n = e.charCodeAt(++r)
				;(n & 64512) === 56320 &&
					(a = 65536 + ((a & 1023) << 10) + (n & 1023))
			}
			if (t) {
				if (((t = !1), !Li(a))) return !1
			} else if (!vi(a)) return !1
		}
		return !t
	}
})
var Fi = v(ot => {
	"use strict"
	Object.defineProperty(ot, "__esModule", {value: !0})
	ot.isKeyword = Um
	ot.isReservedWord = Mi
	ot.isStrictBindOnlyReservedWord = wi
	ot.isStrictBindReservedWord = km
	ot.isStrictReservedWord = Bi
	var va = {
			keyword: [
				"break",
				"case",
				"catch",
				"continue",
				"debugger",
				"default",
				"do",
				"else",
				"finally",
				"for",
				"function",
				"if",
				"return",
				"switch",
				"throw",
				"try",
				"var",
				"const",
				"while",
				"with",
				"new",
				"this",
				"super",
				"class",
				"extends",
				"export",
				"import",
				"null",
				"true",
				"false",
				"in",
				"instanceof",
				"typeof",
				"void",
				"delete",
			],
			strict: [
				"implements",
				"interface",
				"let",
				"package",
				"private",
				"protected",
				"public",
				"static",
				"yield",
			],
			strictBind: ["eval", "arguments"],
		},
		Bm = new Set(va.keyword),
		wm = new Set(va.strict),
		Fm = new Set(va.strictBind)
	function Mi(e, t) {
		return (t && e === "await") || e === "enum"
	}
	function Bi(e, t) {
		return Mi(e, t) || wm.has(e)
	}
	function wi(e) {
		return Fm.has(e)
	}
	function km(e, t) {
		return Bi(e, t) || wi(e)
	}
	function Um(e) {
		return Bm.has(e)
	}
})
var Ar = v(je => {
	"use strict"
	Object.defineProperty(je, "__esModule", {value: !0})
	Object.defineProperty(je, "isIdentifierChar", {
		enumerable: !0,
		get: function () {
			return Ra.isIdentifierChar
		},
	})
	Object.defineProperty(je, "isIdentifierName", {
		enumerable: !0,
		get: function () {
			return Ra.isIdentifierName
		},
	})
	Object.defineProperty(je, "isIdentifierStart", {
		enumerable: !0,
		get: function () {
			return Ra.isIdentifierStart
		},
	})
	Object.defineProperty(je, "isKeyword", {
		enumerable: !0,
		get: function () {
			return Ht.isKeyword
		},
	})
	Object.defineProperty(je, "isReservedWord", {
		enumerable: !0,
		get: function () {
			return Ht.isReservedWord
		},
	})
	Object.defineProperty(je, "isStrictBindOnlyReservedWord", {
		enumerable: !0,
		get: function () {
			return Ht.isStrictBindOnlyReservedWord
		},
	})
	Object.defineProperty(je, "isStrictBindReservedWord", {
		enumerable: !0,
		get: function () {
			return Ht.isStrictBindReservedWord
		},
	})
	Object.defineProperty(je, "isStrictReservedWord", {
		enumerable: !0,
		get: function () {
			return Ht.isStrictReservedWord
		},
	})
	var Ra = Ri(),
		Ht = Fi()
})
var At = v(Ba => {
	"use strict"
	Object.defineProperty(Ba, "__esModule", {value: !0})
	Ba.default = Gm
	var Ma = Ar()
	function Gm(e, t = !0) {
		return typeof e != "string" ||
			(t && ((0, Ma.isKeyword)(e) || (0, Ma.isStrictReservedWord)(e, !0)))
			? !1
			: (0, Ma.isIdentifierName)(e)
	}
})
var qi = v(jt => {
	"use strict"
	Object.defineProperty(jt, "__esModule", {value: !0})
	jt.readCodePoint = Gi
	jt.readInt = Ui
	jt.readStringContents = Hm
	var qm = function (t) {
			return t >= 48 && t <= 57
		},
		ki = {
			decBinOct: new Set([46, 66, 69, 79, 95, 98, 101, 111]),
			hex: new Set([46, 88, 95, 120]),
		},
		hr = {
			bin: e => e === 48 || e === 49,
			oct: e => e >= 48 && e <= 55,
			dec: e => e >= 48 && e <= 57,
			hex: e =>
				(e >= 48 && e <= 57) ||
				(e >= 65 && e <= 70) ||
				(e >= 97 && e <= 102),
		}
	function Hm(e, t, r, a, n, i) {
		let l = r,
			d = a,
			S = n,
			g = "",
			D = null,
			x = r,
			{length: M} = t
		for (;;) {
			if (r >= M) {
				i.unterminated(l, d, S), (g += t.slice(x, r))
				break
			}
			let w = t.charCodeAt(r)
			if (jm(e, w, t, r)) {
				g += t.slice(x, r)
				break
			}
			if (w === 92) {
				g += t.slice(x, r)
				let U = Ym(t, r, a, n, e === "template", i)
				U.ch === null && !D
					? (D = {pos: r, lineStart: a, curLine: n})
					: (g += U.ch),
					({pos: r, lineStart: a, curLine: n} = U),
					(x = r)
			} else
				w === 8232 || w === 8233
					? (++r, ++n, (a = r))
					: w === 10 || w === 13
					? e === "template"
						? ((g +=
								t.slice(x, r) +
								`
`),
						  ++r,
						  w === 13 && t.charCodeAt(r) === 10 && ++r,
						  ++n,
						  (x = a = r))
						: i.unterminated(l, d, S)
					: ++r
		}
		return {
			pos: r,
			str: g,
			firstInvalidLoc: D,
			lineStart: a,
			curLine: n,
			containsInvalid: !!D,
		}
	}
	function jm(e, t, r, a) {
		return e === "template"
			? t === 96 || (t === 36 && r.charCodeAt(a + 1) === 123)
			: t === (e === "double" ? 34 : 39)
	}
	function Ym(e, t, r, a, n, i) {
		let l = !n
		t++
		let d = g => ({pos: t, ch: g, lineStart: r, curLine: a}),
			S = e.charCodeAt(t++)
		switch (S) {
			case 110:
				return d(`
`)
			case 114:
				return d("\r")
			case 120: {
				let g
				return (
					({code: g, pos: t} = wa(e, t, r, a, 2, !1, l, i)),
					d(g === null ? null : String.fromCharCode(g))
				)
			}
			case 117: {
				let g
				return (
					({code: g, pos: t} = Gi(e, t, r, a, l, i)),
					d(g === null ? null : String.fromCodePoint(g))
				)
			}
			case 116:
				return d("	")
			case 98:
				return d("\b")
			case 118:
				return d("\v")
			case 102:
				return d("\f")
			case 13:
				e.charCodeAt(t) === 10 && ++t
			case 10:
				;(r = t), ++a
			case 8232:
			case 8233:
				return d("")
			case 56:
			case 57:
				if (n) return d(null)
				i.strictNumericEscape(t - 1, r, a)
			default:
				if (S >= 48 && S <= 55) {
					let g = t - 1,
						x = /^[0-7]+/.exec(e.slice(g, t + 2))[0],
						M = parseInt(x, 8)
					M > 255 && ((x = x.slice(0, -1)), (M = parseInt(x, 8))),
						(t += x.length - 1)
					let w = e.charCodeAt(t)
					if (x !== "0" || w === 56 || w === 57) {
						if (n) return d(null)
						i.strictNumericEscape(g, r, a)
					}
					return d(String.fromCharCode(M))
				}
				return d(String.fromCharCode(S))
		}
	}
	function wa(e, t, r, a, n, i, l, d) {
		let S = t,
			g
		return (
			({n: g, pos: t} = Ui(e, t, r, a, 16, n, i, !1, d, !l)),
			g === null && (l ? d.invalidEscapeSequence(S, r, a) : (t = S - 1)),
			{code: g, pos: t}
		)
	}
	function Ui(e, t, r, a, n, i, l, d, S, g) {
		let D = t,
			x = n === 16 ? ki.hex : ki.decBinOct,
			M = n === 16 ? hr.hex : n === 10 ? hr.dec : n === 8 ? hr.oct : hr.bin,
			w = !1,
			U = 0
		for (let R = 0, z = i ?? 1 / 0; R < z; ++R) {
			let F = e.charCodeAt(t),
				V
			if (F === 95 && d !== "bail") {
				let C = e.charCodeAt(t - 1),
					J = e.charCodeAt(t + 1)
				if (d) {
					if (Number.isNaN(J) || !M(J) || x.has(C) || x.has(J)) {
						if (g) return {n: null, pos: t}
						S.unexpectedNumericSeparator(t, r, a)
					}
				} else {
					if (g) return {n: null, pos: t}
					S.numericSeparatorInEscapeSequence(t, r, a)
				}
				++t
				continue
			}
			if (
				(F >= 97
					? (V = F - 97 + 10)
					: F >= 65
					? (V = F - 65 + 10)
					: qm(F)
					? (V = F - 48)
					: (V = 1 / 0),
				V >= n)
			) {
				if (V <= 9 && g) return {n: null, pos: t}
				if (V <= 9 && S.invalidDigit(t, r, a, n)) V = 0
				else if (l) (V = 0), (w = !0)
				else break
			}
			++t, (U = U * n + V)
		}
		return t === D || (i != null && t - D !== i) || w
			? {n: null, pos: t}
			: {n: U, pos: t}
	}
	function Gi(e, t, r, a, n, i) {
		let l = e.charCodeAt(t),
			d
		if (l === 123) {
			if (
				(++t,
				({code: d, pos: t} = wa(
					e,
					t,
					r,
					a,
					e.indexOf("}", t) - t,
					!0,
					n,
					i
				)),
				++t,
				d !== null && d > 1114111)
			)
				if (n) i.invalidCodePoint(t, r, a)
				else return {code: null, pos: t}
		} else ({code: d, pos: t} = wa(e, t, r, a, 4, !1, n, i))
		return {code: d, pos: t}
	}
})
var ht = v(Z => {
	"use strict"
	Object.defineProperty(Z, "__esModule", {value: !0})
	Z.UPDATE_OPERATORS =
		Z.UNARY_OPERATORS =
		Z.STRING_UNARY_OPERATORS =
		Z.STATEMENT_OR_BLOCK_KEYS =
		Z.NUMBER_UNARY_OPERATORS =
		Z.NUMBER_BINARY_OPERATORS =
		Z.LOGICAL_OPERATORS =
		Z.INHERIT_KEYS =
		Z.FOR_INIT_KEYS =
		Z.FLATTENABLE_KEYS =
		Z.EQUALITY_BINARY_OPERATORS =
		Z.COMPARISON_BINARY_OPERATORS =
		Z.COMMENT_KEYS =
		Z.BOOLEAN_UNARY_OPERATORS =
		Z.BOOLEAN_NUMBER_BINARY_OPERATORS =
		Z.BOOLEAN_BINARY_OPERATORS =
		Z.BINARY_OPERATORS =
		Z.ASSIGNMENT_OPERATORS =
			void 0
	var WL = (Z.STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"]),
		QL = (Z.FLATTENABLE_KEYS = ["body", "expressions"]),
		$L = (Z.FOR_INIT_KEYS = ["left", "init"]),
		zL = (Z.COMMENT_KEYS = [
			"leadingComments",
			"trailingComments",
			"innerComments",
		]),
		Vm = (Z.LOGICAL_OPERATORS = ["||", "&&", "??"]),
		ZL = (Z.UPDATE_OPERATORS = ["++", "--"]),
		Km = (Z.BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="]),
		Xm = (Z.EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="]),
		Jm = (Z.COMPARISON_BINARY_OPERATORS = [...Xm, "in", "instanceof"]),
		Wm = (Z.BOOLEAN_BINARY_OPERATORS = [...Jm, ...Km]),
		Hi = (Z.NUMBER_BINARY_OPERATORS = [
			"-",
			"/",
			"%",
			"*",
			"**",
			"&",
			"|",
			">>",
			">>>",
			"<<",
			"^",
		]),
		ev = (Z.BINARY_OPERATORS = ["+", ...Hi, ...Wm, "|>"]),
		tv = (Z.ASSIGNMENT_OPERATORS = [
			"=",
			"+=",
			...Hi.map(e => e + "="),
			...Vm.map(e => e + "="),
		]),
		Qm = (Z.BOOLEAN_UNARY_OPERATORS = ["delete", "!"]),
		$m = (Z.NUMBER_UNARY_OPERATORS = ["+", "-", "~"]),
		zm = (Z.STRING_UNARY_OPERATORS = ["typeof"]),
		rv = (Z.UNARY_OPERATORS = ["void", "throw", ...Qm, ...$m, ...zm]),
		av = (Z.INHERIT_KEYS = {
			optional: ["typeAnnotation", "typeParameters", "returnType"],
			force: ["start", "loc", "end"],
		})
	;(Z.BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped")),
		(Z.NOT_LOCAL_BINDING = Symbol.for(
			"should not be considered a local binding"
		))
})
var Ye = v(re => {
	"use strict"
	Object.defineProperty(re, "__esModule", {value: !0})
	re.allExpandedTypes =
		re.VISITOR_KEYS =
		re.NODE_PARENT_VALIDATIONS =
		re.NODE_FIELDS =
		re.FLIPPED_ALIAS_KEYS =
		re.DEPRECATED_KEYS =
		re.BUILDER_KEYS =
		re.ALIAS_KEYS =
			void 0
	re.arrayOf = Yi
	re.arrayOfType = Vi
	re.assertEach = Ki
	re.assertNodeOrValueType = dE
	re.assertNodeType = Ir
	re.assertOneOf = lE
	re.assertOptionalChainStart = fE
	re.assertShape = pE
	re.assertValueType = Ga
	re.chain = Xi
	re.default = Ji
	re.defineAliasedType = EE
	re.validate = Ua
	re.validateArrayOfType = oE
	re.validateOptional = iE
	re.validateOptionalType = uE
	re.validateType = sE
	var ji = bt(),
		Yt = gr(),
		Zm = (re.VISITOR_KEYS = {}),
		eE = (re.ALIAS_KEYS = {}),
		Fa = (re.FLIPPED_ALIAS_KEYS = {}),
		tE = (re.NODE_FIELDS = {}),
		rE = (re.BUILDER_KEYS = {}),
		aE = (re.DEPRECATED_KEYS = {}),
		nE = (re.NODE_PARENT_VALIDATIONS = {})
	function _r(e) {
		return Array.isArray(e) ? "array" : e === null ? "null" : typeof e
	}
	function Ua(e) {
		return {validate: e}
	}
	function sE(...e) {
		return Ua(Ir(...e))
	}
	function iE(e) {
		return {validate: e, optional: !0}
	}
	function uE(...e) {
		return {validate: Ir(...e), optional: !0}
	}
	function Yi(e) {
		return Xi(Ga("array"), Ki(e))
	}
	function Vi(...e) {
		return Yi(Ir(...e))
	}
	function oE(...e) {
		return Ua(Vi(...e))
	}
	function Ki(e) {
		let t = __Process$.env.BABEL_TYPES_8_BREAKING
			? Yt.validateChild
			: () => {}
		function r(a, n, i) {
			if (!Array.isArray(i)) return
			let l = 0,
				d = {
					toString() {
						return `${n}[${l}]`
					},
				}
			for (; l < i.length; l++) {
				let S = i[l]
				e(a, d, S), t(a, d, S)
			}
		}
		return (r.each = e), r
	}
	function lE(...e) {
		function t(r, a, n) {
			if (!e.includes(n))
				throw new TypeError(
					`Property ${a} expected value to be one of ${JSON.stringify(
						e
					)} but got ${JSON.stringify(n)}`
				)
		}
		return (t.oneOf = e), t
	}
	var cE = (re.allExpandedTypes = [])
	function Ir(...e) {
		let t = new Set()
		cE.push({types: e, set: t})
		function r(a, n, i) {
			let l = i?.type
			if (l != null) {
				if (t.has(l)) {
					;(0, Yt.validateChild)(a, n, i)
					return
				}
				if (l === "Placeholder") {
					for (let d of e)
						if ((0, ji.default)(d, i)) {
							;(0, Yt.validateChild)(a, n, i)
							return
						}
				}
			}
			throw new TypeError(
				`Property ${n} of ${
					a.type
				} expected node to be of a type ${JSON.stringify(
					e
				)} but instead got ${JSON.stringify(l)}`
			)
		}
		return (r.oneOfNodeTypes = e), r
	}
	function dE(...e) {
		function t(r, a, n) {
			let i = _r(n)
			for (let l of e)
				if (i === l || (0, ji.default)(l, n)) {
					;(0, Yt.validateChild)(r, a, n)
					return
				}
			throw new TypeError(
				`Property ${a} of ${
					r.type
				} expected node to be of a type ${JSON.stringify(
					e
				)} but instead got ${JSON.stringify(n?.type)}`
			)
		}
		return (t.oneOfNodeOrValueTypes = e), t
	}
	function Ga(e) {
		function t(r, a, n) {
			if (_r(n) !== e)
				throw new TypeError(
					`Property ${a} expected type of ${e} but got ${_r(n)}`
				)
		}
		return (t.type = e), t
	}
	function pE(e) {
		let t = Object.keys(e)
		function r(a, n, i) {
			let l = []
			for (let d of t)
				try {
					;(0, Yt.validateField)(a, d, i[d], e[d])
				} catch (S) {
					if (S instanceof TypeError) {
						l.push(S.message)
						continue
					}
					throw S
				}
			if (l.length)
				throw new TypeError(`Property ${n} of ${
					a.type
				} expected to have the following:
${l.join(`
`)}`)
		}
		return (r.shapeOf = e), r
	}
	function fE() {
		function e(t) {
			var r
			let a = t
			for (; t; ) {
				let {type: n} = a
				if (n === "OptionalCallExpression") {
					if (a.optional) return
					a = a.callee
					continue
				}
				if (n === "OptionalMemberExpression") {
					if (a.optional) return
					a = a.object
					continue
				}
				break
			}
			throw new TypeError(
				`Non-optional ${
					t.type
				} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${
					(r = a) == null ? void 0 : r.type
				}`
			)
		}
		return e
	}
	function Xi(...e) {
		function t(...r) {
			for (let a of e) a(...r)
		}
		if (
			((t.chainOf = e),
			e.length >= 2 &&
				"type" in e[0] &&
				e[0].type === "array" &&
				!("each" in e[1]))
		)
			throw new Error(
				'An assertValueType("array") validator can only be followed by an assertEach(...) validator.'
			)
		return t
	}
	var TE = new Set([
			"aliases",
			"builder",
			"deprecatedAlias",
			"fields",
			"inherits",
			"visitor",
			"validate",
		]),
		mE = new Set(["default", "optional", "deprecated", "validate"]),
		ka = {}
	function EE(...e) {
		return (t, r = {}) => {
			let a = r.aliases
			if (!a) {
				var n
				r.inherits &&
					(a = (n = ka[r.inherits].aliases) == null ? void 0 : n.slice()),
					a ?? (a = []),
					(r.aliases = a)
			}
			let i = e.filter(l => !a.includes(l))
			a.unshift(...i), Ji(t, r)
		}
	}
	function Ji(e, t = {}) {
		let r = (t.inherits && ka[t.inherits]) || {},
			a = t.fields
		if (!a && ((a = {}), r.fields)) {
			let d = Object.getOwnPropertyNames(r.fields)
			for (let S of d) {
				let g = r.fields[S],
					D = g.default
				if (Array.isArray(D) ? D.length > 0 : D && typeof D == "object")
					throw new Error(
						"field defaults can only be primitives or empty arrays currently"
					)
				a[S] = {
					default: Array.isArray(D) ? [] : D,
					optional: g.optional,
					deprecated: g.deprecated,
					validate: g.validate,
				}
			}
		}
		let n = t.visitor || r.visitor || [],
			i = t.aliases || r.aliases || [],
			l = t.builder || r.builder || t.visitor || []
		for (let d of Object.keys(t))
			if (!TE.has(d)) throw new Error(`Unknown type option "${d}" on ${e}`)
		t.deprecatedAlias && (aE[t.deprecatedAlias] = e)
		for (let d of n.concat(l)) a[d] = a[d] || {}
		for (let d of Object.keys(a)) {
			let S = a[d]
			S.default !== void 0 && !l.includes(d) && (S.optional = !0),
				S.default === void 0
					? (S.default = null)
					: !S.validate &&
					  S.default != null &&
					  (S.validate = Ga(_r(S.default)))
			for (let g of Object.keys(S))
				if (!mE.has(g))
					throw new Error(`Unknown field key "${g}" on ${e}.${d}`)
		}
		;(Zm[e] = t.visitor = n),
			(rE[e] = t.builder = l),
			(tE[e] = t.fields = a),
			(eE[e] = t.aliases = i),
			i.forEach(d => {
				;(Fa[d] = Fa[d] || []), Fa[d].push(e)
			}),
			t.validate && (nE[e] = t.validate),
			(ka[e] = t)
	}
})
var Kt = v(Ae => {
	"use strict"
	Object.defineProperty(Ae, "__esModule", {value: !0})
	Ae.patternLikeCommon =
		Ae.importAttributes =
		Ae.functionTypeAnnotationCommon =
		Ae.functionDeclarationCommon =
		Ae.functionCommon =
		Ae.classMethodOrPropertyCommon =
		Ae.classMethodOrDeclareMethodCommon =
			void 0
	var _e = bt(),
		yE = At(),
		Wi = Ar(),
		SE = qi(),
		Vt = ht(),
		b = Ye(),
		q = (0, b.defineAliasedType)("Standardized")
	q("ArrayExpression", {
		fields: {
			elements: {
				validate: (0, b.arrayOf)(
					(0, b.assertNodeOrValueType)(
						"null",
						"Expression",
						"SpreadElement"
					)
				),
				default: __Process$.env.BABEL_TYPES_8_BREAKING ? void 0 : [],
			},
		},
		visitor: ["elements"],
		aliases: ["Expression"],
	})
	q("AssignmentExpression", {
		fields: {
			operator: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? Object.assign(
							(function () {
								let e = (0, b.assertOneOf)(...Vt.ASSIGNMENT_OPERATORS),
									t = (0, b.assertOneOf)("=")
								return function (r, a, n) {
									;((0, _e.default)("Pattern", r.left) ? t : e)(
										r,
										a,
										n
									)
								}
							})(),
							{type: "string"}
					  )
					: (0, b.assertValueType)("string"),
			},
			left: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.assertNodeType)(
							"Identifier",
							"MemberExpression",
							"OptionalMemberExpression",
							"ArrayPattern",
							"ObjectPattern",
							"TSAsExpression",
							"TSSatisfiesExpression",
							"TSTypeAssertion",
							"TSNonNullExpression"
					  )
					: (0, b.assertNodeType)("LVal", "OptionalMemberExpression"),
			},
			right: {validate: (0, b.assertNodeType)("Expression")},
		},
		builder: ["operator", "left", "right"],
		visitor: ["left", "right"],
		aliases: ["Expression"],
	})
	q("BinaryExpression", {
		builder: ["operator", "left", "right"],
		fields: {
			operator: {validate: (0, b.assertOneOf)(...Vt.BINARY_OPERATORS)},
			left: {
				validate: (function () {
					let e = (0, b.assertNodeType)("Expression"),
						t = (0, b.assertNodeType)("Expression", "PrivateName")
					return Object.assign(
						function (a, n, i) {
							;(a.operator === "in" ? t : e)(a, n, i)
						},
						{oneOfNodeTypes: ["Expression", "PrivateName"]}
					)
				})(),
			},
			right: {validate: (0, b.assertNodeType)("Expression")},
		},
		visitor: ["left", "right"],
		aliases: ["Binary", "Expression"],
	})
	q("InterpreterDirective", {
		builder: ["value"],
		fields: {value: {validate: (0, b.assertValueType)("string")}},
	})
	q("Directive", {
		visitor: ["value"],
		fields: {value: {validate: (0, b.assertNodeType)("DirectiveLiteral")}},
	})
	q("DirectiveLiteral", {
		builder: ["value"],
		fields: {value: {validate: (0, b.assertValueType)("string")}},
	})
	q("BlockStatement", {
		builder: ["body", "directives"],
		visitor: ["directives", "body"],
		fields: {
			directives: {validate: (0, b.arrayOfType)("Directive"), default: []},
			body: (0, b.validateArrayOfType)("Statement"),
		},
		aliases: ["Scopable", "BlockParent", "Block", "Statement"],
	})
	q("BreakStatement", {
		visitor: ["label"],
		fields: {
			label: {validate: (0, b.assertNodeType)("Identifier"), optional: !0},
		},
		aliases: ["Statement", "Terminatorless", "CompletionStatement"],
	})
	q("CallExpression", {
		visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
		builder: ["callee", "arguments"],
		aliases: ["Expression"],
		fields: Object.assign(
			{
				callee: {
					validate: (0, b.assertNodeType)(
						"Expression",
						"Super",
						"V8IntrinsicIdentifier"
					),
				},
				arguments: (0, b.validateArrayOfType)(
					"Expression",
					"SpreadElement",
					"ArgumentPlaceholder"
				),
				typeArguments: {
					validate: (0, b.assertNodeType)("TypeParameterInstantiation"),
					optional: !0,
				},
			},
			{
				optional: {
					validate: (0, b.assertValueType)("boolean"),
					optional: !0,
				},
				typeParameters: {
					validate: (0, b.assertNodeType)("TSTypeParameterInstantiation"),
					optional: !0,
				},
			},
			__Process$.env.BABEL_TYPES_8_BREAKING
				? {}
				: {
						optional: {
							validate: (0, b.assertValueType)("boolean"),
							optional: !0,
						},
				  }
		),
	})
	q("CatchClause", {
		visitor: ["param", "body"],
		fields: {
			param: {
				validate: (0, b.assertNodeType)(
					"Identifier",
					"ArrayPattern",
					"ObjectPattern"
				),
				optional: !0,
			},
			body: {validate: (0, b.assertNodeType)("BlockStatement")},
		},
		aliases: ["Scopable", "BlockParent"],
	})
	q("ConditionalExpression", {
		visitor: ["test", "consequent", "alternate"],
		fields: {
			test: {validate: (0, b.assertNodeType)("Expression")},
			consequent: {validate: (0, b.assertNodeType)("Expression")},
			alternate: {validate: (0, b.assertNodeType)("Expression")},
		},
		aliases: ["Expression", "Conditional"],
	})
	q("ContinueStatement", {
		visitor: ["label"],
		fields: {
			label: {validate: (0, b.assertNodeType)("Identifier"), optional: !0},
		},
		aliases: ["Statement", "Terminatorless", "CompletionStatement"],
	})
	q("DebuggerStatement", {aliases: ["Statement"]})
	q("DoWhileStatement", {
		builder: ["test", "body"],
		visitor: ["body", "test"],
		fields: {
			test: {validate: (0, b.assertNodeType)("Expression")},
			body: {validate: (0, b.assertNodeType)("Statement")},
		},
		aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
	})
	q("EmptyStatement", {aliases: ["Statement"]})
	q("ExpressionStatement", {
		visitor: ["expression"],
		fields: {expression: {validate: (0, b.assertNodeType)("Expression")}},
		aliases: ["Statement", "ExpressionWrapper"],
	})
	q("File", {
		builder: ["program", "comments", "tokens"],
		visitor: ["program"],
		fields: {
			program: {validate: (0, b.assertNodeType)("Program")},
			comments: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.assertEach)(
							(0, b.assertNodeType)("CommentBlock", "CommentLine")
					  )
					: Object.assign(() => {}, {
							each: {oneOfNodeTypes: ["CommentBlock", "CommentLine"]},
					  }),
				optional: !0,
			},
			tokens: {
				validate: (0, b.assertEach)(Object.assign(() => {}, {type: "any"})),
				optional: !0,
			},
		},
	})
	q("ForInStatement", {
		visitor: ["left", "right", "body"],
		aliases: [
			"Scopable",
			"Statement",
			"For",
			"BlockParent",
			"Loop",
			"ForXStatement",
		],
		fields: {
			left: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.assertNodeType)(
							"VariableDeclaration",
							"Identifier",
							"MemberExpression",
							"ArrayPattern",
							"ObjectPattern",
							"TSAsExpression",
							"TSSatisfiesExpression",
							"TSTypeAssertion",
							"TSNonNullExpression"
					  )
					: (0, b.assertNodeType)("VariableDeclaration", "LVal"),
			},
			right: {validate: (0, b.assertNodeType)("Expression")},
			body: {validate: (0, b.assertNodeType)("Statement")},
		},
	})
	q("ForStatement", {
		visitor: ["init", "test", "update", "body"],
		aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
		fields: {
			init: {
				validate: (0, b.assertNodeType)(
					"VariableDeclaration",
					"Expression"
				),
				optional: !0,
			},
			test: {validate: (0, b.assertNodeType)("Expression"), optional: !0},
			update: {validate: (0, b.assertNodeType)("Expression"), optional: !0},
			body: {validate: (0, b.assertNodeType)("Statement")},
		},
	})
	var _t = () => ({
		params: (0, b.validateArrayOfType)(
			"Identifier",
			"Pattern",
			"RestElement"
		),
		generator: {default: !1},
		async: {default: !1},
	})
	Ae.functionCommon = _t
	var lt = () => ({
		returnType: {
			validate: (0, b.assertNodeType)(
				"TypeAnnotation",
				"TSTypeAnnotation",
				"Noop"
			),
			optional: !0,
		},
		typeParameters: {
			validate: (0, b.assertNodeType)(
				"TypeParameterDeclaration",
				"TSTypeParameterDeclaration",
				"Noop"
			),
			optional: !0,
		},
	})
	Ae.functionTypeAnnotationCommon = lt
	var Qi = () =>
		Object.assign({}, _t(), {
			declare: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			id: {validate: (0, b.assertNodeType)("Identifier"), optional: !0},
		})
	Ae.functionDeclarationCommon = Qi
	q("FunctionDeclaration", {
		builder: ["id", "params", "body", "generator", "async"],
		visitor: [
			"id",
			"typeParameters",
			"params",
			"predicate",
			"returnType",
			"body",
		],
		fields: Object.assign({}, Qi(), lt(), {
			body: {validate: (0, b.assertNodeType)("BlockStatement")},
			predicate: {
				validate: (0, b.assertNodeType)(
					"DeclaredPredicate",
					"InferredPredicate"
				),
				optional: !0,
			},
		}),
		aliases: [
			"Scopable",
			"Function",
			"BlockParent",
			"FunctionParent",
			"Statement",
			"Pureish",
			"Declaration",
		],
		validate: __Process$.env.BABEL_TYPES_8_BREAKING
			? (function () {
					let e = (0, b.assertNodeType)("Identifier")
					return function (t, r, a) {
						;(0, _e.default)("ExportDefaultDeclaration", t) ||
							e(a, "id", a.id)
					}
			  })()
			: void 0,
	})
	q("FunctionExpression", {
		inherits: "FunctionDeclaration",
		aliases: [
			"Scopable",
			"Function",
			"BlockParent",
			"FunctionParent",
			"Expression",
			"Pureish",
		],
		fields: Object.assign({}, _t(), lt(), {
			id: {validate: (0, b.assertNodeType)("Identifier"), optional: !0},
			body: {validate: (0, b.assertNodeType)("BlockStatement")},
			predicate: {
				validate: (0, b.assertNodeType)(
					"DeclaredPredicate",
					"InferredPredicate"
				),
				optional: !0,
			},
		}),
	})
	var It = () => ({
		typeAnnotation: {
			validate: (0, b.assertNodeType)(
				"TypeAnnotation",
				"TSTypeAnnotation",
				"Noop"
			),
			optional: !0,
		},
		optional: {validate: (0, b.assertValueType)("boolean"), optional: !0},
		decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
	})
	Ae.patternLikeCommon = It
	q("Identifier", {
		builder: ["name"],
		visitor: ["typeAnnotation", "decorators"],
		aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
		fields: Object.assign({}, It(), {
			name: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.chain)(
							(0, b.assertValueType)("string"),
							Object.assign(
								function (e, t, r) {
									if (!(0, yE.default)(r, !1))
										throw new TypeError(
											`"${r}" is not a valid identifier name`
										)
								},
								{type: "string"}
							)
					  )
					: (0, b.assertValueType)("string"),
			},
		}),
		validate: __Process$.env.BABEL_TYPES_8_BREAKING
			? function (e, t, r) {
					let a = /\.(\w+)$/.exec(t.toString())
					if (!a) return
					let [, n] = a,
						i = {computed: !1}
					if (n === "property") {
						if (
							(0, _e.default)("MemberExpression", e, i) ||
							(0, _e.default)("OptionalMemberExpression", e, i)
						)
							return
					} else if (n === "key") {
						if (
							(0, _e.default)("Property", e, i) ||
							(0, _e.default)("Method", e, i)
						)
							return
					} else if (n === "exported") {
						if ((0, _e.default)("ExportSpecifier", e)) return
					} else if (n === "imported") {
						if ((0, _e.default)("ImportSpecifier", e, {imported: r}))
							return
					} else if (
						n === "meta" &&
						(0, _e.default)("MetaProperty", e, {meta: r})
					)
						return
					if (
						((0, Wi.isKeyword)(r.name) ||
							(0, Wi.isReservedWord)(r.name, !1)) &&
						r.name !== "this"
					)
						throw new TypeError(`"${r.name}" is not a valid identifier`)
			  }
			: void 0,
	})
	q("IfStatement", {
		visitor: ["test", "consequent", "alternate"],
		aliases: ["Statement", "Conditional"],
		fields: {
			test: {validate: (0, b.assertNodeType)("Expression")},
			consequent: {validate: (0, b.assertNodeType)("Statement")},
			alternate: {
				optional: !0,
				validate: (0, b.assertNodeType)("Statement"),
			},
		},
	})
	q("LabeledStatement", {
		visitor: ["label", "body"],
		aliases: ["Statement"],
		fields: {
			label: {validate: (0, b.assertNodeType)("Identifier")},
			body: {validate: (0, b.assertNodeType)("Statement")},
		},
	})
	q("StringLiteral", {
		builder: ["value"],
		fields: {value: {validate: (0, b.assertValueType)("string")}},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"],
	})
	q("NumericLiteral", {
		builder: ["value"],
		deprecatedAlias: "NumberLiteral",
		fields: {
			value: {
				validate: (0, b.chain)(
					(0, b.assertValueType)("number"),
					Object.assign(
						function (e, t, r) {
							if (1 / r < 0 || !Number.isFinite(r)) {
								let a = new Error(
									`NumericLiterals must be non-negative finite numbers. You can use t.valueToNode(${r}) instead.`
								)
							}
						},
						{type: "number"}
					)
				),
			},
		},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"],
	})
	q("NullLiteral", {
		aliases: ["Expression", "Pureish", "Literal", "Immutable"],
	})
	q("BooleanLiteral", {
		builder: ["value"],
		fields: {value: {validate: (0, b.assertValueType)("boolean")}},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"],
	})
	q("RegExpLiteral", {
		builder: ["pattern", "flags"],
		deprecatedAlias: "RegexLiteral",
		aliases: ["Expression", "Pureish", "Literal"],
		fields: {
			pattern: {validate: (0, b.assertValueType)("string")},
			flags: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.chain)(
							(0, b.assertValueType)("string"),
							Object.assign(
								function (e, t, r) {
									let a = /[^gimsuy]/.exec(r)
									if (a)
										throw new TypeError(
											`"${a[0]}" is not a valid RegExp flag`
										)
								},
								{type: "string"}
							)
					  )
					: (0, b.assertValueType)("string"),
				default: "",
			},
		},
	})
	q("LogicalExpression", {
		builder: ["operator", "left", "right"],
		visitor: ["left", "right"],
		aliases: ["Binary", "Expression"],
		fields: {
			operator: {validate: (0, b.assertOneOf)(...Vt.LOGICAL_OPERATORS)},
			left: {validate: (0, b.assertNodeType)("Expression")},
			right: {validate: (0, b.assertNodeType)("Expression")},
		},
	})
	q("MemberExpression", {
		builder: [
			"object",
			"property",
			"computed",
			...(__Process$.env.BABEL_TYPES_8_BREAKING ? [] : ["optional"]),
		],
		visitor: ["object", "property"],
		aliases: ["Expression", "LVal"],
		fields: Object.assign(
			{
				object: {validate: (0, b.assertNodeType)("Expression", "Super")},
				property: {
					validate: (function () {
						let e = (0, b.assertNodeType)("Identifier", "PrivateName"),
							t = (0, b.assertNodeType)("Expression"),
							r = function (a, n, i) {
								;(a.computed ? t : e)(a, n, i)
							}
						return (
							(r.oneOfNodeTypes = [
								"Expression",
								"Identifier",
								"PrivateName",
							]),
							r
						)
					})(),
				},
				computed: {default: !1},
			},
			__Process$.env.BABEL_TYPES_8_BREAKING
				? {}
				: {
						optional: {
							validate: (0, b.assertValueType)("boolean"),
							optional: !0,
						},
				  }
		),
	})
	q("NewExpression", {inherits: "CallExpression"})
	q("Program", {
		visitor: ["directives", "body"],
		builder: ["body", "directives", "sourceType", "interpreter"],
		fields: {
			sourceType: {
				validate: (0, b.assertOneOf)("script", "module"),
				default: "script",
			},
			interpreter: {
				validate: (0, b.assertNodeType)("InterpreterDirective"),
				default: null,
				optional: !0,
			},
			directives: {validate: (0, b.arrayOfType)("Directive"), default: []},
			body: (0, b.validateArrayOfType)("Statement"),
		},
		aliases: ["Scopable", "BlockParent", "Block"],
	})
	q("ObjectExpression", {
		visitor: ["properties"],
		aliases: ["Expression"],
		fields: {
			properties: (0, b.validateArrayOfType)(
				"ObjectMethod",
				"ObjectProperty",
				"SpreadElement"
			),
		},
	})
	q("ObjectMethod", {
		builder: [
			"kind",
			"key",
			"params",
			"body",
			"computed",
			"generator",
			"async",
		],
		visitor: [
			"decorators",
			"key",
			"typeParameters",
			"params",
			"returnType",
			"body",
		],
		fields: Object.assign({}, _t(), lt(), {
			kind: Object.assign(
				{validate: (0, b.assertOneOf)("method", "get", "set")},
				__Process$.env.BABEL_TYPES_8_BREAKING ? {} : {default: "method"}
			),
			computed: {default: !1},
			key: {
				validate: (function () {
					let e = (0, b.assertNodeType)(
							"Identifier",
							"StringLiteral",
							"NumericLiteral",
							"BigIntLiteral"
						),
						t = (0, b.assertNodeType)("Expression"),
						r = function (a, n, i) {
							;(a.computed ? t : e)(a, n, i)
						}
					return (
						(r.oneOfNodeTypes = [
							"Expression",
							"Identifier",
							"StringLiteral",
							"NumericLiteral",
							"BigIntLiteral",
						]),
						r
					)
				})(),
			},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
			body: {validate: (0, b.assertNodeType)("BlockStatement")},
		}),
		aliases: [
			"UserWhitespacable",
			"Function",
			"Scopable",
			"BlockParent",
			"FunctionParent",
			"Method",
			"ObjectMember",
		],
	})
	q("ObjectProperty", {
		builder: [
			"key",
			"value",
			"computed",
			"shorthand",
			...(__Process$.env.BABEL_TYPES_8_BREAKING ? [] : ["decorators"]),
		],
		fields: {
			computed: {default: !1},
			key: {
				validate: (function () {
					let e = (0, b.assertNodeType)(
							"Identifier",
							"StringLiteral",
							"NumericLiteral",
							"BigIntLiteral",
							"DecimalLiteral",
							"PrivateName"
						),
						t = (0, b.assertNodeType)("Expression")
					return Object.assign(
						function (a, n, i) {
							;(a.computed ? t : e)(a, n, i)
						},
						{
							oneOfNodeTypes: [
								"Expression",
								"Identifier",
								"StringLiteral",
								"NumericLiteral",
								"BigIntLiteral",
								"DecimalLiteral",
								"PrivateName",
							],
						}
					)
				})(),
			},
			value: {validate: (0, b.assertNodeType)("Expression", "PatternLike")},
			shorthand: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.chain)(
							(0, b.assertValueType)("boolean"),
							Object.assign(
								function (e, t, r) {
									if (r) {
										if (e.computed)
											throw new TypeError(
												"Property shorthand of ObjectProperty cannot be true if computed is true"
											)
										if (!(0, _e.default)("Identifier", e.key))
											throw new TypeError(
												"Property shorthand of ObjectProperty cannot be true if key is not an Identifier"
											)
									}
								},
								{type: "boolean"}
							)
					  )
					: (0, b.assertValueType)("boolean"),
				default: !1,
			},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
		},
		visitor: ["key", "value", "decorators"],
		aliases: ["UserWhitespacable", "Property", "ObjectMember"],
		validate: __Process$.env.BABEL_TYPES_8_BREAKING
			? (function () {
					let e = (0, b.assertNodeType)(
							"Identifier",
							"Pattern",
							"TSAsExpression",
							"TSSatisfiesExpression",
							"TSNonNullExpression",
							"TSTypeAssertion"
						),
						t = (0, b.assertNodeType)("Expression")
					return function (r, a, n) {
						;((0, _e.default)("ObjectPattern", r) ? e : t)(
							n,
							"value",
							n.value
						)
					}
			  })()
			: void 0,
	})
	q("RestElement", {
		visitor: ["argument", "typeAnnotation"],
		builder: ["argument"],
		aliases: ["LVal", "PatternLike"],
		deprecatedAlias: "RestProperty",
		fields: Object.assign({}, It(), {
			argument: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.assertNodeType)(
							"Identifier",
							"ArrayPattern",
							"ObjectPattern",
							"MemberExpression",
							"TSAsExpression",
							"TSSatisfiesExpression",
							"TSTypeAssertion",
							"TSNonNullExpression"
					  )
					: (0, b.assertNodeType)("LVal"),
			},
		}),
		validate: __Process$.env.BABEL_TYPES_8_BREAKING
			? function (e, t) {
					let r = /(\w+)\[(\d+)\]/.exec(t.toString())
					if (!r) throw new Error("Internal Babel error: malformed key.")
					let [, a, n] = r
					if (e[a].length > +n + 1)
						throw new TypeError(
							`RestElement must be last element of ${a}`
						)
			  }
			: void 0,
	})
	q("ReturnStatement", {
		visitor: ["argument"],
		aliases: ["Statement", "Terminatorless", "CompletionStatement"],
		fields: {
			argument: {
				validate: (0, b.assertNodeType)("Expression"),
				optional: !0,
			},
		},
	})
	q("SequenceExpression", {
		visitor: ["expressions"],
		fields: {expressions: (0, b.validateArrayOfType)("Expression")},
		aliases: ["Expression"],
	})
	q("ParenthesizedExpression", {
		visitor: ["expression"],
		aliases: ["Expression", "ExpressionWrapper"],
		fields: {expression: {validate: (0, b.assertNodeType)("Expression")}},
	})
	q("SwitchCase", {
		visitor: ["test", "consequent"],
		fields: {
			test: {validate: (0, b.assertNodeType)("Expression"), optional: !0},
			consequent: (0, b.validateArrayOfType)("Statement"),
		},
	})
	q("SwitchStatement", {
		visitor: ["discriminant", "cases"],
		aliases: ["Statement", "BlockParent", "Scopable"],
		fields: {
			discriminant: {validate: (0, b.assertNodeType)("Expression")},
			cases: (0, b.validateArrayOfType)("SwitchCase"),
		},
	})
	q("ThisExpression", {aliases: ["Expression"]})
	q("ThrowStatement", {
		visitor: ["argument"],
		aliases: ["Statement", "Terminatorless", "CompletionStatement"],
		fields: {argument: {validate: (0, b.assertNodeType)("Expression")}},
	})
	q("TryStatement", {
		visitor: ["block", "handler", "finalizer"],
		aliases: ["Statement"],
		fields: {
			block: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.chain)(
							(0, b.assertNodeType)("BlockStatement"),
							Object.assign(
								function (e) {
									if (!e.handler && !e.finalizer)
										throw new TypeError(
											"TryStatement expects either a handler or finalizer, or both"
										)
								},
								{oneOfNodeTypes: ["BlockStatement"]}
							)
					  )
					: (0, b.assertNodeType)("BlockStatement"),
			},
			handler: {
				optional: !0,
				validate: (0, b.assertNodeType)("CatchClause"),
			},
			finalizer: {
				optional: !0,
				validate: (0, b.assertNodeType)("BlockStatement"),
			},
		},
	})
	q("UnaryExpression", {
		builder: ["operator", "argument", "prefix"],
		fields: {
			prefix: {default: !0},
			argument: {validate: (0, b.assertNodeType)("Expression")},
			operator: {validate: (0, b.assertOneOf)(...Vt.UNARY_OPERATORS)},
		},
		visitor: ["argument"],
		aliases: ["UnaryLike", "Expression"],
	})
	q("UpdateExpression", {
		builder: ["operator", "argument", "prefix"],
		fields: {
			prefix: {default: !1},
			argument: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.assertNodeType)("Identifier", "MemberExpression")
					: (0, b.assertNodeType)("Expression"),
			},
			operator: {validate: (0, b.assertOneOf)(...Vt.UPDATE_OPERATORS)},
		},
		visitor: ["argument"],
		aliases: ["Expression"],
	})
	q("VariableDeclaration", {
		builder: ["kind", "declarations"],
		visitor: ["declarations"],
		aliases: ["Statement", "Declaration"],
		fields: {
			declare: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			kind: {
				validate: (0, b.assertOneOf)(
					"var",
					"let",
					"const",
					"using",
					"await using"
				),
			},
			declarations: (0, b.validateArrayOfType)("VariableDeclarator"),
		},
		validate: __Process$.env.BABEL_TYPES_8_BREAKING
			? (() => {
					let e = (0, b.assertNodeType)("Identifier", "Placeholder"),
						t = (0, b.assertNodeType)(
							"Identifier",
							"ArrayPattern",
							"ObjectPattern",
							"Placeholder"
						),
						r = e
					return function (a, n, i) {
						let {kind: l, declarations: d} = i,
							S = (0, _e.default)("ForXStatement", a, {left: i})
						if (S && d.length !== 1)
							throw new TypeError(
								`Exactly one VariableDeclarator is required in the VariableDeclaration of a ${a.type}`
							)
						for (let g of d)
							l === "const" || l === "let" || l === "var"
								? !S && !g.init
									? e(g, "id", g.id)
									: t(g, "id", g.id)
								: r(g, "id", g.id)
					}
			  })()
			: void 0,
	})
	q("VariableDeclarator", {
		visitor: ["id", "init"],
		fields: {
			id: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.assertNodeType)(
							"Identifier",
							"ArrayPattern",
							"ObjectPattern"
					  )
					: (0, b.assertNodeType)("LVal"),
			},
			definite: {optional: !0, validate: (0, b.assertValueType)("boolean")},
			init: {optional: !0, validate: (0, b.assertNodeType)("Expression")},
		},
	})
	q("WhileStatement", {
		visitor: ["test", "body"],
		aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
		fields: {
			test: {validate: (0, b.assertNodeType)("Expression")},
			body: {validate: (0, b.assertNodeType)("Statement")},
		},
	})
	q("WithStatement", {
		visitor: ["object", "body"],
		aliases: ["Statement"],
		fields: {
			object: {validate: (0, b.assertNodeType)("Expression")},
			body: {validate: (0, b.assertNodeType)("Statement")},
		},
	})
	q("AssignmentPattern", {
		visitor: ["left", "right", "decorators"],
		builder: ["left", "right"],
		aliases: ["Pattern", "PatternLike", "LVal"],
		fields: Object.assign({}, It(), {
			left: {
				validate: (0, b.assertNodeType)(
					"Identifier",
					"ObjectPattern",
					"ArrayPattern",
					"MemberExpression",
					"TSAsExpression",
					"TSSatisfiesExpression",
					"TSTypeAssertion",
					"TSNonNullExpression"
				),
			},
			right: {validate: (0, b.assertNodeType)("Expression")},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
		}),
	})
	q("ArrayPattern", {
		visitor: ["elements", "typeAnnotation"],
		builder: ["elements"],
		aliases: ["Pattern", "PatternLike", "LVal"],
		fields: Object.assign({}, It(), {
			elements: {
				validate: (0, b.chain)(
					(0, b.assertValueType)("array"),
					(0, b.assertEach)(
						(0, b.assertNodeOrValueType)("null", "PatternLike", "LVal")
					)
				),
			},
		}),
	})
	q("ArrowFunctionExpression", {
		builder: ["params", "body", "async"],
		visitor: ["typeParameters", "params", "predicate", "returnType", "body"],
		aliases: [
			"Scopable",
			"Function",
			"BlockParent",
			"FunctionParent",
			"Expression",
			"Pureish",
		],
		fields: Object.assign({}, _t(), lt(), {
			expression: {validate: (0, b.assertValueType)("boolean")},
			body: {
				validate: (0, b.assertNodeType)("BlockStatement", "Expression"),
			},
			predicate: {
				validate: (0, b.assertNodeType)(
					"DeclaredPredicate",
					"InferredPredicate"
				),
				optional: !0,
			},
		}),
	})
	q("ClassBody", {
		visitor: ["body"],
		fields: {
			body: (0, b.validateArrayOfType)(
				"ClassMethod",
				"ClassPrivateMethod",
				"ClassProperty",
				"ClassPrivateProperty",
				"ClassAccessorProperty",
				"TSDeclareMethod",
				"TSIndexSignature",
				"StaticBlock"
			),
		},
	})
	q("ClassExpression", {
		builder: ["id", "superClass", "body", "decorators"],
		visitor: [
			"decorators",
			"id",
			"typeParameters",
			"superClass",
			"superTypeParameters",
			"mixins",
			"implements",
			"body",
		],
		aliases: ["Scopable", "Class", "Expression"],
		fields: {
			id: {validate: (0, b.assertNodeType)("Identifier"), optional: !0},
			typeParameters: {
				validate: (0, b.assertNodeType)(
					"TypeParameterDeclaration",
					"TSTypeParameterDeclaration",
					"Noop"
				),
				optional: !0,
			},
			body: {validate: (0, b.assertNodeType)("ClassBody")},
			superClass: {
				optional: !0,
				validate: (0, b.assertNodeType)("Expression"),
			},
			superTypeParameters: {
				validate: (0, b.assertNodeType)(
					"TypeParameterInstantiation",
					"TSTypeParameterInstantiation"
				),
				optional: !0,
			},
			implements: {
				validate: (0, b.arrayOfType)(
					"TSExpressionWithTypeArguments",
					"ClassImplements"
				),
				optional: !0,
			},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
			mixins: {
				validate: (0, b.assertNodeType)("InterfaceExtends"),
				optional: !0,
			},
		},
	})
	q("ClassDeclaration", {
		inherits: "ClassExpression",
		aliases: ["Scopable", "Class", "Statement", "Declaration"],
		fields: {
			id: {validate: (0, b.assertNodeType)("Identifier"), optional: !0},
			typeParameters: {
				validate: (0, b.assertNodeType)(
					"TypeParameterDeclaration",
					"TSTypeParameterDeclaration",
					"Noop"
				),
				optional: !0,
			},
			body: {validate: (0, b.assertNodeType)("ClassBody")},
			superClass: {
				optional: !0,
				validate: (0, b.assertNodeType)("Expression"),
			},
			superTypeParameters: {
				validate: (0, b.assertNodeType)(
					"TypeParameterInstantiation",
					"TSTypeParameterInstantiation"
				),
				optional: !0,
			},
			implements: {
				validate: (0, b.arrayOfType)(
					"TSExpressionWithTypeArguments",
					"ClassImplements"
				),
				optional: !0,
			},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
			mixins: {
				validate: (0, b.assertNodeType)("InterfaceExtends"),
				optional: !0,
			},
			declare: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			abstract: {validate: (0, b.assertValueType)("boolean"), optional: !0},
		},
		validate: __Process$.env.BABEL_TYPES_8_BREAKING
			? (function () {
					let e = (0, b.assertNodeType)("Identifier")
					return function (t, r, a) {
						;(0, _e.default)("ExportDefaultDeclaration", t) ||
							e(a, "id", a.id)
					}
			  })()
			: void 0,
	})
	var qa = (Ae.importAttributes = {
		attributes: {
			optional: !0,
			validate: (0, b.arrayOfType)("ImportAttribute"),
		},
		assertions: {
			deprecated: !0,
			optional: !0,
			validate: (0, b.arrayOfType)("ImportAttribute"),
		},
	})
	q("ExportAllDeclaration", {
		builder: ["source"],
		visitor: ["source", "attributes", "assertions"],
		aliases: [
			"Statement",
			"Declaration",
			"ImportOrExportDeclaration",
			"ExportDeclaration",
		],
		fields: Object.assign(
			{
				source: {validate: (0, b.assertNodeType)("StringLiteral")},
				exportKind: (0, b.validateOptional)(
					(0, b.assertOneOf)("type", "value")
				),
			},
			qa
		),
	})
	q("ExportDefaultDeclaration", {
		visitor: ["declaration"],
		aliases: [
			"Statement",
			"Declaration",
			"ImportOrExportDeclaration",
			"ExportDeclaration",
		],
		fields: {
			declaration: (0, b.validateType)(
				"TSDeclareFunction",
				"FunctionDeclaration",
				"ClassDeclaration",
				"Expression"
			),
			exportKind: (0, b.validateOptional)((0, b.assertOneOf)("value")),
		},
	})
	q("ExportNamedDeclaration", {
		builder: ["declaration", "specifiers", "source"],
		visitor: __Process$.env
			? ["declaration", "specifiers", "source", "attributes"]
			: ["declaration", "specifiers", "source", "attributes", "assertions"],
		aliases: [
			"Statement",
			"Declaration",
			"ImportOrExportDeclaration",
			"ExportDeclaration",
		],
		fields: Object.assign(
			{
				declaration: {
					optional: !0,
					validate: __Process$.env.BABEL_TYPES_8_BREAKING
						? (0, b.chain)(
								(0, b.assertNodeType)("Declaration"),
								Object.assign(
									function (e, t, r) {
										if (r && e.specifiers.length)
											throw new TypeError(
												"Only declaration or specifiers is allowed on ExportNamedDeclaration"
											)
										if (r && e.source)
											throw new TypeError(
												"Cannot export a declaration from a source"
											)
									},
									{oneOfNodeTypes: ["Declaration"]}
								)
						  )
						: (0, b.assertNodeType)("Declaration"),
				},
			},
			qa,
			{
				specifiers: {
					default: [],
					validate: (0, b.arrayOf)(
						(function () {
							let e = (0, b.assertNodeType)(
									"ExportSpecifier",
									"ExportDefaultSpecifier",
									"ExportNamespaceSpecifier"
								),
								t = (0, b.assertNodeType)("ExportSpecifier")
							return __Process$.env.BABEL_TYPES_8_BREAKING
								? Object.assign(
										function (r, a, n) {
											;(r.source ? e : t)(r, a, n)
										},
										{
											oneOfNodeTypes: [
												"ExportSpecifier",
												"ExportDefaultSpecifier",
												"ExportNamespaceSpecifier",
											],
										}
								  )
								: e
						})()
					),
				},
				source: {
					validate: (0, b.assertNodeType)("StringLiteral"),
					optional: !0,
				},
				exportKind: (0, b.validateOptional)(
					(0, b.assertOneOf)("type", "value")
				),
			}
		),
	})
	q("ExportSpecifier", {
		visitor: ["local", "exported"],
		aliases: ["ModuleSpecifier"],
		fields: {
			local: {validate: (0, b.assertNodeType)("Identifier")},
			exported: {
				validate: (0, b.assertNodeType)("Identifier", "StringLiteral"),
			},
			exportKind: {
				validate: (0, b.assertOneOf)("type", "value"),
				optional: !0,
			},
		},
	})
	q("ForOfStatement", {
		visitor: ["left", "right", "body"],
		builder: ["left", "right", "body", "await"],
		aliases: [
			"Scopable",
			"Statement",
			"For",
			"BlockParent",
			"Loop",
			"ForXStatement",
		],
		fields: {
			left: {
				validate: (function () {
					if (!__Process$.env.BABEL_TYPES_8_BREAKING)
						return (0, b.assertNodeType)("VariableDeclaration", "LVal")
					let e = (0, b.assertNodeType)("VariableDeclaration"),
						t = (0, b.assertNodeType)(
							"Identifier",
							"MemberExpression",
							"ArrayPattern",
							"ObjectPattern",
							"TSAsExpression",
							"TSSatisfiesExpression",
							"TSTypeAssertion",
							"TSNonNullExpression"
						)
					return Object.assign(
						function (r, a, n) {
							;(0, _e.default)("VariableDeclaration", n)
								? e(r, a, n)
								: t(r, a, n)
						},
						{
							oneOfNodeTypes: [
								"VariableDeclaration",
								"Identifier",
								"MemberExpression",
								"ArrayPattern",
								"ObjectPattern",
								"TSAsExpression",
								"TSSatisfiesExpression",
								"TSTypeAssertion",
								"TSNonNullExpression",
							],
						}
					)
				})(),
			},
			right: {validate: (0, b.assertNodeType)("Expression")},
			body: {validate: (0, b.assertNodeType)("Statement")},
			await: {default: !1},
		},
	})
	q("ImportDeclaration", {
		builder: ["specifiers", "source"],
		visitor: ["specifiers", "source", "attributes", "assertions"],
		aliases: ["Statement", "Declaration", "ImportOrExportDeclaration"],
		fields: Object.assign({}, qa, {
			module: {optional: !0, validate: (0, b.assertValueType)("boolean")},
			phase: {
				default: null,
				validate: (0, b.assertOneOf)("source", "defer"),
			},
			specifiers: (0, b.validateArrayOfType)(
				"ImportSpecifier",
				"ImportDefaultSpecifier",
				"ImportNamespaceSpecifier"
			),
			source: {validate: (0, b.assertNodeType)("StringLiteral")},
			importKind: {
				validate: (0, b.assertOneOf)("type", "typeof", "value"),
				optional: !0,
			},
		}),
	})
	q("ImportDefaultSpecifier", {
		visitor: ["local"],
		aliases: ["ModuleSpecifier"],
		fields: {local: {validate: (0, b.assertNodeType)("Identifier")}},
	})
	q("ImportNamespaceSpecifier", {
		visitor: ["local"],
		aliases: ["ModuleSpecifier"],
		fields: {local: {validate: (0, b.assertNodeType)("Identifier")}},
	})
	q("ImportSpecifier", {
		visitor: ["imported", "local"],
		builder: ["local", "imported"],
		aliases: ["ModuleSpecifier"],
		fields: {
			local: {validate: (0, b.assertNodeType)("Identifier")},
			imported: {
				validate: (0, b.assertNodeType)("Identifier", "StringLiteral"),
			},
			importKind: {
				validate: (0, b.assertOneOf)("type", "typeof", "value"),
				optional: !0,
			},
		},
	})
	q("ImportExpression", {
		visitor: ["source", "options"],
		aliases: ["Expression"],
		fields: {
			phase: {
				default: null,
				validate: (0, b.assertOneOf)("source", "defer"),
			},
			source: {validate: (0, b.assertNodeType)("Expression")},
			options: {validate: (0, b.assertNodeType)("Expression"), optional: !0},
		},
	})
	q("MetaProperty", {
		visitor: ["meta", "property"],
		aliases: ["Expression"],
		fields: {
			meta: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.chain)(
							(0, b.assertNodeType)("Identifier"),
							Object.assign(
								function (e, t, r) {
									let a
									switch (r.name) {
										case "function":
											a = "sent"
											break
										case "new":
											a = "target"
											break
										case "import":
											a = "meta"
											break
									}
									if (
										!(0, _e.default)("Identifier", e.property, {
											name: a,
										})
									)
										throw new TypeError("Unrecognised MetaProperty")
								},
								{oneOfNodeTypes: ["Identifier"]}
							)
					  )
					: (0, b.assertNodeType)("Identifier"),
			},
			property: {validate: (0, b.assertNodeType)("Identifier")},
		},
	})
	var Dr = () => ({
		abstract: {validate: (0, b.assertValueType)("boolean"), optional: !0},
		accessibility: {
			validate: (0, b.assertOneOf)("public", "private", "protected"),
			optional: !0,
		},
		static: {default: !1},
		override: {default: !1},
		computed: {default: !1},
		optional: {validate: (0, b.assertValueType)("boolean"), optional: !0},
		key: {
			validate: (0, b.chain)(
				(function () {
					let e = (0, b.assertNodeType)(
							"Identifier",
							"StringLiteral",
							"NumericLiteral",
							"BigIntLiteral"
						),
						t = (0, b.assertNodeType)("Expression")
					return function (r, a, n) {
						;(r.computed ? t : e)(r, a, n)
					}
				})(),
				(0, b.assertNodeType)(
					"Identifier",
					"StringLiteral",
					"NumericLiteral",
					"BigIntLiteral",
					"Expression"
				)
			),
		},
	})
	Ae.classMethodOrPropertyCommon = Dr
	var Ha = () =>
		Object.assign({}, _t(), Dr(), {
			params: (0, b.validateArrayOfType)(
				"Identifier",
				"Pattern",
				"RestElement",
				"TSParameterProperty"
			),
			kind: {
				validate: (0, b.assertOneOf)("get", "set", "method", "constructor"),
				default: "method",
			},
			access: {
				validate: (0, b.chain)(
					(0, b.assertValueType)("string"),
					(0, b.assertOneOf)("public", "private", "protected")
				),
				optional: !0,
			},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
		})
	Ae.classMethodOrDeclareMethodCommon = Ha
	q("ClassMethod", {
		aliases: [
			"Function",
			"Scopable",
			"BlockParent",
			"FunctionParent",
			"Method",
		],
		builder: [
			"kind",
			"key",
			"params",
			"body",
			"computed",
			"static",
			"generator",
			"async",
		],
		visitor: [
			"decorators",
			"key",
			"typeParameters",
			"params",
			"returnType",
			"body",
		],
		fields: Object.assign({}, Ha(), lt(), {
			body: {validate: (0, b.assertNodeType)("BlockStatement")},
		}),
	})
	q("ObjectPattern", {
		visitor: ["properties", "typeAnnotation", "decorators"],
		builder: ["properties"],
		aliases: ["Pattern", "PatternLike", "LVal"],
		fields: Object.assign({}, It(), {
			properties: (0, b.validateArrayOfType)(
				"RestElement",
				"ObjectProperty"
			),
		}),
	})
	q("SpreadElement", {
		visitor: ["argument"],
		aliases: ["UnaryLike"],
		deprecatedAlias: "SpreadProperty",
		fields: {argument: {validate: (0, b.assertNodeType)("Expression")}},
	})
	q("Super", {aliases: ["Expression"]})
	q("TaggedTemplateExpression", {
		visitor: ["tag", "typeParameters", "quasi"],
		builder: ["tag", "quasi"],
		aliases: ["Expression"],
		fields: {
			tag: {validate: (0, b.assertNodeType)("Expression")},
			quasi: {validate: (0, b.assertNodeType)("TemplateLiteral")},
			typeParameters: {
				validate: (0, b.assertNodeType)(
					"TypeParameterInstantiation",
					"TSTypeParameterInstantiation"
				),
				optional: !0,
			},
		},
	})
	q("TemplateElement", {
		builder: ["value", "tail"],
		fields: {
			value: {
				validate: (0, b.chain)(
					(0, b.assertShape)({
						raw: {validate: (0, b.assertValueType)("string")},
						cooked: {
							validate: (0, b.assertValueType)("string"),
							optional: !0,
						},
					}),
					function (t) {
						let r = t.value.raw,
							a = !1,
							n = () => {
								throw new Error("Internal @babel/types error.")
							},
							{str: i, firstInvalidLoc: l} = (0, SE.readStringContents)(
								"template",
								r,
								0,
								0,
								0,
								{
									unterminated() {
										a = !0
									},
									strictNumericEscape: n,
									invalidEscapeSequence: n,
									numericSeparatorInEscapeSequence: n,
									unexpectedNumericSeparator: n,
									invalidDigit: n,
									invalidCodePoint: n,
								}
							)
						if (!a) throw new Error("Invalid raw")
						t.value.cooked = l ? null : i
					}
				),
			},
			tail: {default: !1},
		},
	})
	q("TemplateLiteral", {
		visitor: ["quasis", "expressions"],
		aliases: ["Expression", "Literal"],
		fields: {
			quasis: (0, b.validateArrayOfType)("TemplateElement"),
			expressions: {
				validate: (0, b.chain)(
					(0, b.assertValueType)("array"),
					(0, b.assertEach)((0, b.assertNodeType)("Expression", "TSType")),
					function (e, t, r) {
						if (e.quasis.length !== r.length + 1)
							throw new TypeError(`Number of ${
								e.type
							} quasis should be exactly one more than the number of expressions.
Expected ${r.length + 1} quasis but got ${e.quasis.length}`)
					}
				),
			},
		},
	})
	q("YieldExpression", {
		builder: ["argument", "delegate"],
		visitor: ["argument"],
		aliases: ["Expression", "Terminatorless"],
		fields: {
			delegate: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.chain)(
							(0, b.assertValueType)("boolean"),
							Object.assign(
								function (e, t, r) {
									if (r && !e.argument)
										throw new TypeError(
											"Property delegate of YieldExpression cannot be true if there is no argument"
										)
								},
								{type: "boolean"}
							)
					  )
					: (0, b.assertValueType)("boolean"),
				default: !1,
			},
			argument: {
				optional: !0,
				validate: (0, b.assertNodeType)("Expression"),
			},
		},
	})
	q("AwaitExpression", {
		builder: ["argument"],
		visitor: ["argument"],
		aliases: ["Expression", "Terminatorless"],
		fields: {argument: {validate: (0, b.assertNodeType)("Expression")}},
	})
	q("Import", {aliases: ["Expression"]})
	q("BigIntLiteral", {
		builder: ["value"],
		fields: {value: {validate: (0, b.assertValueType)("string")}},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"],
	})
	q("ExportNamespaceSpecifier", {
		visitor: ["exported"],
		aliases: ["ModuleSpecifier"],
		fields: {exported: {validate: (0, b.assertNodeType)("Identifier")}},
	})
	q("OptionalMemberExpression", {
		builder: ["object", "property", "computed", "optional"],
		visitor: ["object", "property"],
		aliases: ["Expression"],
		fields: {
			object: {validate: (0, b.assertNodeType)("Expression")},
			property: {
				validate: (function () {
					let e = (0, b.assertNodeType)("Identifier"),
						t = (0, b.assertNodeType)("Expression")
					return Object.assign(
						function (a, n, i) {
							;(a.computed ? t : e)(a, n, i)
						},
						{oneOfNodeTypes: ["Expression", "Identifier"]}
					)
				})(),
			},
			computed: {default: !1},
			optional: {
				validate: __Process$.env.BABEL_TYPES_8_BREAKING
					? (0, b.chain)(
							(0, b.assertValueType)("boolean"),
							(0, b.assertOptionalChainStart)()
					  )
					: (0, b.assertValueType)("boolean"),
			},
		},
	})
	q("OptionalCallExpression", {
		visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
		builder: ["callee", "arguments", "optional"],
		aliases: ["Expression"],
		fields: Object.assign(
			{
				callee: {validate: (0, b.assertNodeType)("Expression")},
				arguments: (0, b.validateArrayOfType)(
					"Expression",
					"SpreadElement",
					"ArgumentPlaceholder"
				),
				optional: {
					validate: __Process$.env.BABEL_TYPES_8_BREAKING
						? (0, b.chain)(
								(0, b.assertValueType)("boolean"),
								(0, b.assertOptionalChainStart)()
						  )
						: (0, b.assertValueType)("boolean"),
				},
				typeArguments: {
					validate: (0, b.assertNodeType)("TypeParameterInstantiation"),
					optional: !0,
				},
			},
			{
				typeParameters: {
					validate: (0, b.assertNodeType)("TSTypeParameterInstantiation"),
					optional: !0,
				},
			}
		),
	})
	q("ClassProperty", {
		visitor: ["decorators", "variance", "key", "typeAnnotation", "value"],
		builder: [
			"key",
			"value",
			"typeAnnotation",
			"decorators",
			"computed",
			"static",
		],
		aliases: ["Property"],
		fields: Object.assign({}, Dr(), {
			value: {validate: (0, b.assertNodeType)("Expression"), optional: !0},
			definite: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			typeAnnotation: {
				validate: (0, b.assertNodeType)(
					"TypeAnnotation",
					"TSTypeAnnotation",
					"Noop"
				),
				optional: !0,
			},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
			readonly: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			declare: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			variance: {validate: (0, b.assertNodeType)("Variance"), optional: !0},
		}),
	})
	q("ClassAccessorProperty", {
		visitor: ["decorators", "key", "typeAnnotation", "value"],
		builder: [
			"key",
			"value",
			"typeAnnotation",
			"decorators",
			"computed",
			"static",
		],
		aliases: ["Property", "Accessor"],
		fields: Object.assign({}, Dr(), {
			key: {
				validate: (0, b.chain)(
					(function () {
						let e = (0, b.assertNodeType)(
								"Identifier",
								"StringLiteral",
								"NumericLiteral",
								"BigIntLiteral",
								"PrivateName"
							),
							t = (0, b.assertNodeType)("Expression")
						return function (r, a, n) {
							;(r.computed ? t : e)(r, a, n)
						}
					})(),
					(0, b.assertNodeType)(
						"Identifier",
						"StringLiteral",
						"NumericLiteral",
						"BigIntLiteral",
						"Expression",
						"PrivateName"
					)
				),
			},
			value: {validate: (0, b.assertNodeType)("Expression"), optional: !0},
			definite: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			typeAnnotation: {
				validate: (0, b.assertNodeType)(
					"TypeAnnotation",
					"TSTypeAnnotation",
					"Noop"
				),
				optional: !0,
			},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
			readonly: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			declare: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			variance: {validate: (0, b.assertNodeType)("Variance"), optional: !0},
		}),
	})
	q("ClassPrivateProperty", {
		visitor: ["decorators", "variance", "key", "typeAnnotation", "value"],
		builder: ["key", "value", "decorators", "static"],
		aliases: ["Property", "Private"],
		fields: {
			key: {validate: (0, b.assertNodeType)("PrivateName")},
			value: {validate: (0, b.assertNodeType)("Expression"), optional: !0},
			typeAnnotation: {
				validate: (0, b.assertNodeType)(
					"TypeAnnotation",
					"TSTypeAnnotation",
					"Noop"
				),
				optional: !0,
			},
			decorators: {validate: (0, b.arrayOfType)("Decorator"), optional: !0},
			static: {validate: (0, b.assertValueType)("boolean"), default: !1},
			readonly: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			optional: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			definite: {validate: (0, b.assertValueType)("boolean"), optional: !0},
			variance: {validate: (0, b.assertNodeType)("Variance"), optional: !0},
		},
	})
	q("ClassPrivateMethod", {
		builder: ["kind", "key", "params", "body", "static"],
		visitor: [
			"decorators",
			"key",
			"typeParameters",
			"params",
			"returnType",
			"body",
		],
		aliases: [
			"Function",
			"Scopable",
			"BlockParent",
			"FunctionParent",
			"Method",
			"Private",
		],
		fields: Object.assign({}, Ha(), lt(), {
			kind: {
				validate: (0, b.assertOneOf)("get", "set", "method"),
				default: "method",
			},
			key: {validate: (0, b.assertNodeType)("PrivateName")},
			body: {validate: (0, b.assertNodeType)("BlockStatement")},
		}),
	})
	q("PrivateName", {
		visitor: ["id"],
		aliases: ["Private"],
		fields: {id: {validate: (0, b.assertNodeType)("Identifier")}},
	})
	q("StaticBlock", {
		visitor: ["body"],
		fields: {body: (0, b.validateArrayOfType)("Statement")},
		aliases: ["Scopable", "BlockParent", "FunctionParent"],
	})
	q("ImportAttribute", {
		visitor: ["key", "value"],
		fields: {
			key: {validate: (0, b.assertNodeType)("Identifier", "StringLiteral")},
			value: {validate: (0, b.assertNodeType)("StringLiteral")},
		},
	})
})
var zi = v(() => {
	"use strict"
	var $i = Kt(),
		N = Ye(),
		X = (0, N.defineAliasedType)("Flow"),
		ja = e => {
			let t = e === "DeclareClass"
			X(e, {
				builder: ["id", "typeParameters", "extends", "body"],
				visitor: [
					"id",
					"typeParameters",
					"extends",
					...(t ? ["mixins", "implements"] : []),
					"body",
				],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: Object.assign(
					{
						id: (0, N.validateType)("Identifier"),
						typeParameters: (0, N.validateOptionalType)(
							"TypeParameterDeclaration"
						),
						extends: (0, N.validateOptional)(
							(0, N.arrayOfType)("InterfaceExtends")
						),
					},
					t
						? {
								mixins: (0, N.validateOptional)(
									(0, N.arrayOfType)("InterfaceExtends")
								),
								implements: (0, N.validateOptional)(
									(0, N.arrayOfType)("ClassImplements")
								),
						  }
						: {},
					{body: (0, N.validateType)("ObjectTypeAnnotation")}
				),
			})
		}
	X("AnyTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("ArrayTypeAnnotation", {
		visitor: ["elementType"],
		aliases: ["FlowType"],
		fields: {elementType: (0, N.validateType)("FlowType")},
	})
	X("BooleanTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("BooleanLiteralTypeAnnotation", {
		builder: ["value"],
		aliases: ["FlowType"],
		fields: {value: (0, N.validate)((0, N.assertValueType)("boolean"))},
	})
	X("NullLiteralTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("ClassImplements", {
		visitor: ["id", "typeParameters"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			typeParameters: (0, N.validateOptionalType)(
				"TypeParameterInstantiation"
			),
		},
	})
	ja("DeclareClass")
	X("DeclareFunction", {
		builder: ["id"],
		visitor: ["id", "predicate"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			predicate: (0, N.validateOptionalType)("DeclaredPredicate"),
		},
	})
	ja("DeclareInterface")
	X("DeclareModule", {
		builder: ["id", "body", "kind"],
		visitor: ["id", "body"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, N.validateType)("Identifier", "StringLiteral"),
			body: (0, N.validateType)("BlockStatement"),
			kind: (0, N.validateOptional)((0, N.assertOneOf)("CommonJS", "ES")),
		},
	})
	X("DeclareModuleExports", {
		visitor: ["typeAnnotation"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {typeAnnotation: (0, N.validateType)("TypeAnnotation")},
	})
	X("DeclareTypeAlias", {
		visitor: ["id", "typeParameters", "right"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			typeParameters: (0, N.validateOptionalType)(
				"TypeParameterDeclaration"
			),
			right: (0, N.validateType)("FlowType"),
		},
	})
	X("DeclareOpaqueType", {
		visitor: ["id", "typeParameters", "supertype"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			typeParameters: (0, N.validateOptionalType)(
				"TypeParameterDeclaration"
			),
			supertype: (0, N.validateOptionalType)("FlowType"),
			impltype: (0, N.validateOptionalType)("FlowType"),
		},
	})
	X("DeclareVariable", {
		visitor: ["id"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {id: (0, N.validateType)("Identifier")},
	})
	X("DeclareExportDeclaration", {
		visitor: ["declaration", "specifiers", "source", "attributes"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: Object.assign(
			{
				declaration: (0, N.validateOptionalType)("Flow"),
				specifiers: (0, N.validateOptional)(
					(0, N.arrayOfType)("ExportSpecifier", "ExportNamespaceSpecifier")
				),
				source: (0, N.validateOptionalType)("StringLiteral"),
				default: (0, N.validateOptional)((0, N.assertValueType)("boolean")),
			},
			$i.importAttributes
		),
	})
	X("DeclareExportAllDeclaration", {
		visitor: ["source", "attributes"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: Object.assign(
			{
				source: (0, N.validateType)("StringLiteral"),
				exportKind: (0, N.validateOptional)(
					(0, N.assertOneOf)("type", "value")
				),
			},
			$i.importAttributes
		),
	})
	X("DeclaredPredicate", {
		visitor: ["value"],
		aliases: ["FlowPredicate"],
		fields: {value: (0, N.validateType)("Flow")},
	})
	X("ExistsTypeAnnotation", {aliases: ["FlowType"]})
	X("FunctionTypeAnnotation", {
		builder: ["typeParameters", "params", "rest", "returnType"],
		visitor: ["typeParameters", "this", "params", "rest", "returnType"],
		aliases: ["FlowType"],
		fields: {
			typeParameters: (0, N.validateOptionalType)(
				"TypeParameterDeclaration"
			),
			params: (0, N.validateArrayOfType)("FunctionTypeParam"),
			rest: (0, N.validateOptionalType)("FunctionTypeParam"),
			this: (0, N.validateOptionalType)("FunctionTypeParam"),
			returnType: (0, N.validateType)("FlowType"),
		},
	})
	X("FunctionTypeParam", {
		visitor: ["name", "typeAnnotation"],
		fields: {
			name: (0, N.validateOptionalType)("Identifier"),
			typeAnnotation: (0, N.validateType)("FlowType"),
			optional: (0, N.validateOptional)((0, N.assertValueType)("boolean")),
		},
	})
	X("GenericTypeAnnotation", {
		visitor: ["id", "typeParameters"],
		aliases: ["FlowType"],
		fields: {
			id: (0, N.validateType)("Identifier", "QualifiedTypeIdentifier"),
			typeParameters: (0, N.validateOptionalType)(
				"TypeParameterInstantiation"
			),
		},
	})
	X("InferredPredicate", {aliases: ["FlowPredicate"]})
	X("InterfaceExtends", {
		visitor: ["id", "typeParameters"],
		fields: {
			id: (0, N.validateType)("Identifier", "QualifiedTypeIdentifier"),
			typeParameters: (0, N.validateOptionalType)(
				"TypeParameterInstantiation"
			),
		},
	})
	ja("InterfaceDeclaration")
	X("InterfaceTypeAnnotation", {
		visitor: ["extends", "body"],
		aliases: ["FlowType"],
		fields: {
			extends: (0, N.validateOptional)(
				(0, N.arrayOfType)("InterfaceExtends")
			),
			body: (0, N.validateType)("ObjectTypeAnnotation"),
		},
	})
	X("IntersectionTypeAnnotation", {
		visitor: ["types"],
		aliases: ["FlowType"],
		fields: {types: (0, N.validate)((0, N.arrayOfType)("FlowType"))},
	})
	X("MixedTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("EmptyTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("NullableTypeAnnotation", {
		visitor: ["typeAnnotation"],
		aliases: ["FlowType"],
		fields: {typeAnnotation: (0, N.validateType)("FlowType")},
	})
	X("NumberLiteralTypeAnnotation", {
		builder: ["value"],
		aliases: ["FlowType"],
		fields: {value: (0, N.validate)((0, N.assertValueType)("number"))},
	})
	X("NumberTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("ObjectTypeAnnotation", {
		visitor: ["properties", "indexers", "callProperties", "internalSlots"],
		aliases: ["FlowType"],
		builder: [
			"properties",
			"indexers",
			"callProperties",
			"internalSlots",
			"exact",
		],
		fields: {
			properties: (0, N.validate)(
				(0, N.arrayOfType)("ObjectTypeProperty", "ObjectTypeSpreadProperty")
			),
			indexers: {
				validate: (0, N.arrayOfType)("ObjectTypeIndexer"),
				optional: !0,
				default: [],
			},
			callProperties: {
				validate: (0, N.arrayOfType)("ObjectTypeCallProperty"),
				optional: !0,
				default: [],
			},
			internalSlots: {
				validate: (0, N.arrayOfType)("ObjectTypeInternalSlot"),
				optional: !0,
				default: [],
			},
			exact: {validate: (0, N.assertValueType)("boolean"), default: !1},
			inexact: (0, N.validateOptional)((0, N.assertValueType)("boolean")),
		},
	})
	X("ObjectTypeInternalSlot", {
		visitor: ["id", "value"],
		builder: ["id", "value", "optional", "static", "method"],
		aliases: ["UserWhitespacable"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			value: (0, N.validateType)("FlowType"),
			optional: (0, N.validate)((0, N.assertValueType)("boolean")),
			static: (0, N.validate)((0, N.assertValueType)("boolean")),
			method: (0, N.validate)((0, N.assertValueType)("boolean")),
		},
	})
	X("ObjectTypeCallProperty", {
		visitor: ["value"],
		aliases: ["UserWhitespacable"],
		fields: {
			value: (0, N.validateType)("FlowType"),
			static: (0, N.validate)((0, N.assertValueType)("boolean")),
		},
	})
	X("ObjectTypeIndexer", {
		visitor: ["variance", "id", "key", "value"],
		builder: ["id", "key", "value", "variance"],
		aliases: ["UserWhitespacable"],
		fields: {
			id: (0, N.validateOptionalType)("Identifier"),
			key: (0, N.validateType)("FlowType"),
			value: (0, N.validateType)("FlowType"),
			static: (0, N.validate)((0, N.assertValueType)("boolean")),
			variance: (0, N.validateOptionalType)("Variance"),
		},
	})
	X("ObjectTypeProperty", {
		visitor: ["key", "value", "variance"],
		aliases: ["UserWhitespacable"],
		fields: {
			key: (0, N.validateType)("Identifier", "StringLiteral"),
			value: (0, N.validateType)("FlowType"),
			kind: (0, N.validate)((0, N.assertOneOf)("init", "get", "set")),
			static: (0, N.validate)((0, N.assertValueType)("boolean")),
			proto: (0, N.validate)((0, N.assertValueType)("boolean")),
			optional: (0, N.validate)((0, N.assertValueType)("boolean")),
			variance: (0, N.validateOptionalType)("Variance"),
			method: (0, N.validate)((0, N.assertValueType)("boolean")),
		},
	})
	X("ObjectTypeSpreadProperty", {
		visitor: ["argument"],
		aliases: ["UserWhitespacable"],
		fields: {argument: (0, N.validateType)("FlowType")},
	})
	X("OpaqueType", {
		visitor: ["id", "typeParameters", "supertype", "impltype"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			typeParameters: (0, N.validateOptionalType)(
				"TypeParameterDeclaration"
			),
			supertype: (0, N.validateOptionalType)("FlowType"),
			impltype: (0, N.validateType)("FlowType"),
		},
	})
	X("QualifiedTypeIdentifier", {
		visitor: ["qualification", "id"],
		builder: ["id", "qualification"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			qualification: (0, N.validateType)(
				"Identifier",
				"QualifiedTypeIdentifier"
			),
		},
	})
	X("StringLiteralTypeAnnotation", {
		builder: ["value"],
		aliases: ["FlowType"],
		fields: {value: (0, N.validate)((0, N.assertValueType)("string"))},
	})
	X("StringTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("SymbolTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("ThisTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("TupleTypeAnnotation", {
		visitor: ["types"],
		aliases: ["FlowType"],
		fields: {types: (0, N.validate)((0, N.arrayOfType)("FlowType"))},
	})
	X("TypeofTypeAnnotation", {
		visitor: ["argument"],
		aliases: ["FlowType"],
		fields: {argument: (0, N.validateType)("FlowType")},
	})
	X("TypeAlias", {
		visitor: ["id", "typeParameters", "right"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			typeParameters: (0, N.validateOptionalType)(
				"TypeParameterDeclaration"
			),
			right: (0, N.validateType)("FlowType"),
		},
	})
	X("TypeAnnotation", {
		visitor: ["typeAnnotation"],
		fields: {typeAnnotation: (0, N.validateType)("FlowType")},
	})
	X("TypeCastExpression", {
		visitor: ["expression", "typeAnnotation"],
		aliases: ["ExpressionWrapper", "Expression"],
		fields: {
			expression: (0, N.validateType)("Expression"),
			typeAnnotation: (0, N.validateType)("TypeAnnotation"),
		},
	})
	X("TypeParameter", {
		visitor: ["bound", "default", "variance"],
		fields: {
			name: (0, N.validate)((0, N.assertValueType)("string")),
			bound: (0, N.validateOptionalType)("TypeAnnotation"),
			default: (0, N.validateOptionalType)("FlowType"),
			variance: (0, N.validateOptionalType)("Variance"),
		},
	})
	X("TypeParameterDeclaration", {
		visitor: ["params"],
		fields: {params: (0, N.validate)((0, N.arrayOfType)("TypeParameter"))},
	})
	X("TypeParameterInstantiation", {
		visitor: ["params"],
		fields: {params: (0, N.validate)((0, N.arrayOfType)("FlowType"))},
	})
	X("UnionTypeAnnotation", {
		visitor: ["types"],
		aliases: ["FlowType"],
		fields: {types: (0, N.validate)((0, N.arrayOfType)("FlowType"))},
	})
	X("Variance", {
		builder: ["kind"],
		fields: {kind: (0, N.validate)((0, N.assertOneOf)("minus", "plus"))},
	})
	X("VoidTypeAnnotation", {aliases: ["FlowType", "FlowBaseAnnotation"]})
	X("EnumDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "body"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			body: (0, N.validateType)(
				"EnumBooleanBody",
				"EnumNumberBody",
				"EnumStringBody",
				"EnumSymbolBody"
			),
		},
	})
	X("EnumBooleanBody", {
		aliases: ["EnumBody"],
		visitor: ["members"],
		fields: {
			explicitType: (0, N.validate)((0, N.assertValueType)("boolean")),
			members: (0, N.validateArrayOfType)("EnumBooleanMember"),
			hasUnknownMembers: (0, N.validate)((0, N.assertValueType)("boolean")),
		},
	})
	X("EnumNumberBody", {
		aliases: ["EnumBody"],
		visitor: ["members"],
		fields: {
			explicitType: (0, N.validate)((0, N.assertValueType)("boolean")),
			members: (0, N.validateArrayOfType)("EnumNumberMember"),
			hasUnknownMembers: (0, N.validate)((0, N.assertValueType)("boolean")),
		},
	})
	X("EnumStringBody", {
		aliases: ["EnumBody"],
		visitor: ["members"],
		fields: {
			explicitType: (0, N.validate)((0, N.assertValueType)("boolean")),
			members: (0, N.validateArrayOfType)(
				"EnumStringMember",
				"EnumDefaultedMember"
			),
			hasUnknownMembers: (0, N.validate)((0, N.assertValueType)("boolean")),
		},
	})
	X("EnumSymbolBody", {
		aliases: ["EnumBody"],
		visitor: ["members"],
		fields: {
			members: (0, N.validateArrayOfType)("EnumDefaultedMember"),
			hasUnknownMembers: (0, N.validate)((0, N.assertValueType)("boolean")),
		},
	})
	X("EnumBooleanMember", {
		aliases: ["EnumMember"],
		builder: ["id"],
		visitor: ["id", "init"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			init: (0, N.validateType)("BooleanLiteral"),
		},
	})
	X("EnumNumberMember", {
		aliases: ["EnumMember"],
		visitor: ["id", "init"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			init: (0, N.validateType)("NumericLiteral"),
		},
	})
	X("EnumStringMember", {
		aliases: ["EnumMember"],
		visitor: ["id", "init"],
		fields: {
			id: (0, N.validateType)("Identifier"),
			init: (0, N.validateType)("StringLiteral"),
		},
	})
	X("EnumDefaultedMember", {
		aliases: ["EnumMember"],
		visitor: ["id"],
		fields: {id: (0, N.validateType)("Identifier")},
	})
	X("IndexedAccessType", {
		visitor: ["objectType", "indexType"],
		aliases: ["FlowType"],
		fields: {
			objectType: (0, N.validateType)("FlowType"),
			indexType: (0, N.validateType)("FlowType"),
		},
	})
	X("OptionalIndexedAccessType", {
		visitor: ["objectType", "indexType"],
		aliases: ["FlowType"],
		fields: {
			objectType: (0, N.validateType)("FlowType"),
			indexType: (0, N.validateType)("FlowType"),
			optional: (0, N.validate)((0, N.assertValueType)("boolean")),
		},
	})
})
var Zi = v(() => {
	"use strict"
	var ue = Ye(),
		Ie = (0, ue.defineAliasedType)("JSX")
	Ie("JSXAttribute", {
		visitor: ["name", "value"],
		aliases: ["Immutable"],
		fields: {
			name: {
				validate: (0, ue.assertNodeType)(
					"JSXIdentifier",
					"JSXNamespacedName"
				),
			},
			value: {
				optional: !0,
				validate: (0, ue.assertNodeType)(
					"JSXElement",
					"JSXFragment",
					"StringLiteral",
					"JSXExpressionContainer"
				),
			},
		},
	})
	Ie("JSXClosingElement", {
		visitor: ["name"],
		aliases: ["Immutable"],
		fields: {
			name: {
				validate: (0, ue.assertNodeType)(
					"JSXIdentifier",
					"JSXMemberExpression",
					"JSXNamespacedName"
				),
			},
		},
	})
	Ie("JSXElement", {
		builder: ["openingElement", "closingElement", "children", "selfClosing"],
		visitor: ["openingElement", "children", "closingElement"],
		aliases: ["Immutable", "Expression"],
		fields: Object.assign(
			{
				openingElement: {
					validate: (0, ue.assertNodeType)("JSXOpeningElement"),
				},
				closingElement: {
					optional: !0,
					validate: (0, ue.assertNodeType)("JSXClosingElement"),
				},
				children: (0, ue.validateArrayOfType)(
					"JSXText",
					"JSXExpressionContainer",
					"JSXSpreadChild",
					"JSXElement",
					"JSXFragment"
				),
			},
			{
				selfClosing: {
					validate: (0, ue.assertValueType)("boolean"),
					optional: !0,
				},
			}
		),
	})
	Ie("JSXEmptyExpression", {})
	Ie("JSXExpressionContainer", {
		visitor: ["expression"],
		aliases: ["Immutable"],
		fields: {
			expression: {
				validate: (0, ue.assertNodeType)(
					"Expression",
					"JSXEmptyExpression"
				),
			},
		},
	})
	Ie("JSXSpreadChild", {
		visitor: ["expression"],
		aliases: ["Immutable"],
		fields: {expression: {validate: (0, ue.assertNodeType)("Expression")}},
	})
	Ie("JSXIdentifier", {
		builder: ["name"],
		fields: {name: {validate: (0, ue.assertValueType)("string")}},
	})
	Ie("JSXMemberExpression", {
		visitor: ["object", "property"],
		fields: {
			object: {
				validate: (0, ue.assertNodeType)(
					"JSXMemberExpression",
					"JSXIdentifier"
				),
			},
			property: {validate: (0, ue.assertNodeType)("JSXIdentifier")},
		},
	})
	Ie("JSXNamespacedName", {
		visitor: ["namespace", "name"],
		fields: {
			namespace: {validate: (0, ue.assertNodeType)("JSXIdentifier")},
			name: {validate: (0, ue.assertNodeType)("JSXIdentifier")},
		},
	})
	Ie("JSXOpeningElement", {
		builder: ["name", "attributes", "selfClosing"],
		visitor: ["name", "typeParameters", "typeArguments", "attributes"],
		aliases: ["Immutable"],
		fields: Object.assign(
			{
				name: {
					validate: (0, ue.assertNodeType)(
						"JSXIdentifier",
						"JSXMemberExpression",
						"JSXNamespacedName"
					),
				},
				selfClosing: {default: !1},
				attributes: (0, ue.validateArrayOfType)(
					"JSXAttribute",
					"JSXSpreadAttribute"
				),
				typeArguments: {
					validate: (0, ue.assertNodeType)("TypeParameterInstantiation"),
					optional: !0,
				},
			},
			{
				typeParameters: {
					validate: (0, ue.assertNodeType)("TSTypeParameterInstantiation"),
					optional: !0,
				},
			}
		),
	})
	Ie("JSXSpreadAttribute", {
		visitor: ["argument"],
		fields: {argument: {validate: (0, ue.assertNodeType)("Expression")}},
	})
	Ie("JSXText", {
		aliases: ["Immutable"],
		builder: ["value"],
		fields: {value: {validate: (0, ue.assertValueType)("string")}},
	})
	Ie("JSXFragment", {
		builder: ["openingFragment", "closingFragment", "children"],
		visitor: ["openingFragment", "children", "closingFragment"],
		aliases: ["Immutable", "Expression"],
		fields: {
			openingFragment: {
				validate: (0, ue.assertNodeType)("JSXOpeningFragment"),
			},
			closingFragment: {
				validate: (0, ue.assertNodeType)("JSXClosingFragment"),
			},
			children: (0, ue.validateArrayOfType)(
				"JSXText",
				"JSXExpressionContainer",
				"JSXSpreadChild",
				"JSXElement",
				"JSXFragment"
			),
		},
	})
	Ie("JSXOpeningFragment", {aliases: ["Immutable"]})
	Ie("JSXClosingFragment", {aliases: ["Immutable"]})
})
var Ka = v(Qe => {
	"use strict"
	Object.defineProperty(Qe, "__esModule", {value: !0})
	Qe.PLACEHOLDERS_FLIPPED_ALIAS =
		Qe.PLACEHOLDERS_ALIAS =
		Qe.PLACEHOLDERS =
			void 0
	var bE = Ye(),
		AE = (Qe.PLACEHOLDERS = [
			"Identifier",
			"StringLiteral",
			"Expression",
			"Statement",
			"Declaration",
			"BlockStatement",
			"ClassBody",
			"Pattern",
		]),
		Va = (Qe.PLACEHOLDERS_ALIAS = {
			Declaration: ["Statement"],
			Pattern: ["PatternLike", "LVal"],
		})
	for (let e of AE) {
		let t = bE.ALIAS_KEYS[e]
		t != null && t.length && (Va[e] = t)
	}
	var Ya = (Qe.PLACEHOLDERS_FLIPPED_ALIAS = {})
	Object.keys(Va).forEach(e => {
		Va[e].forEach(t => {
			hasOwnProperty.call(Ya, t) || (Ya[t] = []), Ya[t].push(e)
		})
	})
})
var eu = v(() => {
	"use strict"
	var xr = Ye(),
		hE = Ka(),
		_E = Kt(),
		Xa = (0, xr.defineAliasedType)("Miscellaneous")
	Xa("Noop", {visitor: []})
	Xa("Placeholder", {
		visitor: [],
		builder: ["expectedNode", "name"],
		fields: Object.assign(
			{
				name: {validate: (0, xr.assertNodeType)("Identifier")},
				expectedNode: {validate: (0, xr.assertOneOf)(...hE.PLACEHOLDERS)},
			},
			(0, _E.patternLikeCommon)()
		),
	})
	Xa("V8IntrinsicIdentifier", {
		builder: ["name"],
		fields: {name: {validate: (0, xr.assertValueType)("string")}},
	})
})
var tu = v(() => {
	"use strict"
	var se = Ye()
	;(0, se.default)("ArgumentPlaceholder", {})
	;(0, se.default)("BindExpression", {
		visitor: ["object", "callee"],
		aliases: ["Expression"],
		fields: __Process$.env.BABEL_TYPES_8_BREAKING
			? {
					object: {validate: (0, se.assertNodeType)("Expression")},
					callee: {validate: (0, se.assertNodeType)("Expression")},
			  }
			: {
					object: {
						validate: Object.assign(() => {}, {
							oneOfNodeTypes: ["Expression"],
						}),
					},
					callee: {
						validate: Object.assign(() => {}, {
							oneOfNodeTypes: ["Expression"],
						}),
					},
			  },
	})
	;(0, se.default)("Decorator", {
		visitor: ["expression"],
		fields: {expression: {validate: (0, se.assertNodeType)("Expression")}},
	})
	;(0, se.default)("DoExpression", {
		visitor: ["body"],
		builder: ["body", "async"],
		aliases: ["Expression"],
		fields: {
			body: {validate: (0, se.assertNodeType)("BlockStatement")},
			async: {validate: (0, se.assertValueType)("boolean"), default: !1},
		},
	})
	;(0, se.default)("ExportDefaultSpecifier", {
		visitor: ["exported"],
		aliases: ["ModuleSpecifier"],
		fields: {exported: {validate: (0, se.assertNodeType)("Identifier")}},
	})
	;(0, se.default)("RecordExpression", {
		visitor: ["properties"],
		aliases: ["Expression"],
		fields: {
			properties: (0, se.validateArrayOfType)(
				"ObjectProperty",
				"SpreadElement"
			),
		},
	})
	;(0, se.default)("TupleExpression", {
		fields: {
			elements: {
				validate: (0, se.arrayOfType)("Expression", "SpreadElement"),
				default: [],
			},
		},
		visitor: ["elements"],
		aliases: ["Expression"],
	})
	;(0, se.default)("DecimalLiteral", {
		builder: ["value"],
		fields: {value: {validate: (0, se.assertValueType)("string")}},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"],
	})
	;(0, se.default)("ModuleExpression", {
		visitor: ["body"],
		fields: {body: {validate: (0, se.assertNodeType)("Program")}},
		aliases: ["Expression"],
	})
	;(0, se.default)("TopicReference", {aliases: ["Expression"]})
	;(0, se.default)("PipelineTopicExpression", {
		builder: ["expression"],
		visitor: ["expression"],
		fields: {expression: {validate: (0, se.assertNodeType)("Expression")}},
		aliases: ["Expression"],
	})
	;(0, se.default)("PipelineBareFunction", {
		builder: ["callee"],
		visitor: ["callee"],
		fields: {callee: {validate: (0, se.assertNodeType)("Expression")}},
		aliases: ["Expression"],
	})
	;(0, se.default)("PipelinePrimaryTopicReference", {aliases: ["Expression"]})
})
var lu = v(() => {
	"use strict"
	var L = Ye(),
		ru = Kt(),
		IE = bt(),
		W = (0, L.defineAliasedType)("TypeScript"),
		Pe = (0, L.assertValueType)("boolean"),
		au = () => ({
			returnType: {
				validate: (0, L.assertNodeType)("TSTypeAnnotation", "Noop"),
				optional: !0,
			},
			typeParameters: {
				validate: (0, L.assertNodeType)(
					"TSTypeParameterDeclaration",
					"Noop"
				),
				optional: !0,
			},
		})
	W("TSParameterProperty", {
		aliases: ["LVal"],
		visitor: ["parameter"],
		fields: {
			accessibility: {
				validate: (0, L.assertOneOf)("public", "private", "protected"),
				optional: !0,
			},
			readonly: {validate: (0, L.assertValueType)("boolean"), optional: !0},
			parameter: {
				validate: (0, L.assertNodeType)("Identifier", "AssignmentPattern"),
			},
			override: {validate: (0, L.assertValueType)("boolean"), optional: !0},
			decorators: {validate: (0, L.arrayOfType)("Decorator"), optional: !0},
		},
	})
	W("TSDeclareFunction", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "typeParameters", "params", "returnType"],
		fields: Object.assign({}, (0, ru.functionDeclarationCommon)(), au()),
	})
	W("TSDeclareMethod", {
		visitor: ["decorators", "key", "typeParameters", "params", "returnType"],
		fields: Object.assign(
			{},
			(0, ru.classMethodOrDeclareMethodCommon)(),
			au()
		),
	})
	W("TSQualifiedName", {
		aliases: ["TSEntityName"],
		visitor: ["left", "right"],
		fields: {
			left: (0, L.validateType)("TSEntityName"),
			right: (0, L.validateType)("Identifier"),
		},
	})
	var Nr = () => ({
			typeParameters: (0, L.validateOptionalType)(
				"TSTypeParameterDeclaration"
			),
			parameters: (0, L.validateArrayOfType)(
				"ArrayPattern",
				"Identifier",
				"ObjectPattern",
				"RestElement"
			),
			typeAnnotation: (0, L.validateOptionalType)("TSTypeAnnotation"),
		}),
		nu = {
			aliases: ["TSTypeElement"],
			visitor: ["typeParameters", "parameters", "typeAnnotation"],
			fields: Nr(),
		}
	W("TSCallSignatureDeclaration", nu)
	W("TSConstructSignatureDeclaration", nu)
	var su = () => ({
		key: (0, L.validateType)("Expression"),
		computed: {default: !1},
		optional: (0, L.validateOptional)(Pe),
	})
	W("TSPropertySignature", {
		aliases: ["TSTypeElement"],
		visitor: ["key", "typeAnnotation"],
		fields: Object.assign({}, su(), {
			readonly: (0, L.validateOptional)(Pe),
			typeAnnotation: (0, L.validateOptionalType)("TSTypeAnnotation"),
			kind: {optional: !0, validate: (0, L.assertOneOf)("get", "set")},
		}),
	})
	W("TSMethodSignature", {
		aliases: ["TSTypeElement"],
		visitor: ["key", "typeParameters", "parameters", "typeAnnotation"],
		fields: Object.assign({}, Nr(), su(), {
			kind: {validate: (0, L.assertOneOf)("method", "get", "set")},
		}),
	})
	W("TSIndexSignature", {
		aliases: ["TSTypeElement"],
		visitor: ["parameters", "typeAnnotation"],
		fields: {
			readonly: (0, L.validateOptional)(Pe),
			static: (0, L.validateOptional)(Pe),
			parameters: (0, L.validateArrayOfType)("Identifier"),
			typeAnnotation: (0, L.validateOptionalType)("TSTypeAnnotation"),
		},
	})
	var gE = [
		"TSAnyKeyword",
		"TSBooleanKeyword",
		"TSBigIntKeyword",
		"TSIntrinsicKeyword",
		"TSNeverKeyword",
		"TSNullKeyword",
		"TSNumberKeyword",
		"TSObjectKeyword",
		"TSStringKeyword",
		"TSSymbolKeyword",
		"TSUndefinedKeyword",
		"TSUnknownKeyword",
		"TSVoidKeyword",
	]
	for (let e of gE)
		W(e, {aliases: ["TSType", "TSBaseType"], visitor: [], fields: {}})
	W("TSThisType", {aliases: ["TSType", "TSBaseType"], visitor: [], fields: {}})
	var iu = {
		aliases: ["TSType"],
		visitor: ["typeParameters", "parameters", "typeAnnotation"],
	}
	W("TSFunctionType", Object.assign({}, iu, {fields: Nr()}))
	W(
		"TSConstructorType",
		Object.assign({}, iu, {
			fields: Object.assign({}, Nr(), {
				abstract: (0, L.validateOptional)(Pe),
			}),
		})
	)
	W("TSTypeReference", {
		aliases: ["TSType"],
		visitor: ["typeName", "typeParameters"],
		fields: {
			typeName: (0, L.validateType)("TSEntityName"),
			typeParameters: (0, L.validateOptionalType)(
				"TSTypeParameterInstantiation"
			),
		},
	})
	W("TSTypePredicate", {
		aliases: ["TSType"],
		visitor: ["parameterName", "typeAnnotation"],
		builder: ["parameterName", "typeAnnotation", "asserts"],
		fields: {
			parameterName: (0, L.validateType)("Identifier", "TSThisType"),
			typeAnnotation: (0, L.validateOptionalType)("TSTypeAnnotation"),
			asserts: (0, L.validateOptional)(Pe),
		},
	})
	W("TSTypeQuery", {
		aliases: ["TSType"],
		visitor: ["exprName", "typeParameters"],
		fields: {
			exprName: (0, L.validateType)("TSEntityName", "TSImportType"),
			typeParameters: (0, L.validateOptionalType)(
				"TSTypeParameterInstantiation"
			),
		},
	})
	W("TSTypeLiteral", {
		aliases: ["TSType"],
		visitor: ["members"],
		fields: {members: (0, L.validateArrayOfType)("TSTypeElement")},
	})
	W("TSArrayType", {
		aliases: ["TSType"],
		visitor: ["elementType"],
		fields: {elementType: (0, L.validateType)("TSType")},
	})
	W("TSTupleType", {
		aliases: ["TSType"],
		visitor: ["elementTypes"],
		fields: {
			elementTypes: (0, L.validateArrayOfType)(
				"TSType",
				"TSNamedTupleMember"
			),
		},
	})
	W("TSOptionalType", {
		aliases: ["TSType"],
		visitor: ["typeAnnotation"],
		fields: {typeAnnotation: (0, L.validateType)("TSType")},
	})
	W("TSRestType", {
		aliases: ["TSType"],
		visitor: ["typeAnnotation"],
		fields: {typeAnnotation: (0, L.validateType)("TSType")},
	})
	W("TSNamedTupleMember", {
		visitor: ["label", "elementType"],
		builder: ["label", "elementType", "optional"],
		fields: {
			label: (0, L.validateType)("Identifier"),
			optional: {validate: Pe, default: !1},
			elementType: (0, L.validateType)("TSType"),
		},
	})
	var uu = {
		aliases: ["TSType"],
		visitor: ["types"],
		fields: {types: (0, L.validateArrayOfType)("TSType")},
	}
	W("TSUnionType", uu)
	W("TSIntersectionType", uu)
	W("TSConditionalType", {
		aliases: ["TSType"],
		visitor: ["checkType", "extendsType", "trueType", "falseType"],
		fields: {
			checkType: (0, L.validateType)("TSType"),
			extendsType: (0, L.validateType)("TSType"),
			trueType: (0, L.validateType)("TSType"),
			falseType: (0, L.validateType)("TSType"),
		},
	})
	W("TSInferType", {
		aliases: ["TSType"],
		visitor: ["typeParameter"],
		fields: {typeParameter: (0, L.validateType)("TSTypeParameter")},
	})
	W("TSParenthesizedType", {
		aliases: ["TSType"],
		visitor: ["typeAnnotation"],
		fields: {typeAnnotation: (0, L.validateType)("TSType")},
	})
	W("TSTypeOperator", {
		aliases: ["TSType"],
		visitor: ["typeAnnotation"],
		fields: {
			operator: (0, L.validate)((0, L.assertValueType)("string")),
			typeAnnotation: (0, L.validateType)("TSType"),
		},
	})
	W("TSIndexedAccessType", {
		aliases: ["TSType"],
		visitor: ["objectType", "indexType"],
		fields: {
			objectType: (0, L.validateType)("TSType"),
			indexType: (0, L.validateType)("TSType"),
		},
	})
	W("TSMappedType", {
		aliases: ["TSType"],
		visitor: ["typeParameter", "nameType", "typeAnnotation"],
		builder: ["typeParameter", "typeAnnotation", "nameType"],
		fields: Object.assign(
			{},
			{typeParameter: (0, L.validateType)("TSTypeParameter")},
			{
				readonly: (0, L.validateOptional)(
					(0, L.assertOneOf)(!0, !1, "+", "-")
				),
				optional: (0, L.validateOptional)(
					(0, L.assertOneOf)(!0, !1, "+", "-")
				),
				typeAnnotation: (0, L.validateOptionalType)("TSType"),
				nameType: (0, L.validateOptionalType)("TSType"),
			}
		),
	})
	W("TSTemplateLiteralType", {
		aliases: ["TSType", "TSBaseType"],
		visitor: ["quasis", "types"],
		fields: {
			quasis: (0, L.validateArrayOfType)("TemplateElement"),
			types: {
				validate: (0, L.chain)(
					(0, L.assertValueType)("array"),
					(0, L.assertEach)((0, L.assertNodeType)("TSType")),
					function (e, t, r) {
						if (e.quasis.length !== r.length + 1)
							throw new TypeError(`Number of ${
								e.type
							} quasis should be exactly one more than the number of types.
Expected ${r.length + 1} quasis but got ${e.quasis.length}`)
					}
				),
			},
		},
	})
	W("TSLiteralType", {
		aliases: ["TSType", "TSBaseType"],
		visitor: ["literal"],
		fields: {
			literal: {
				validate: (function () {
					let e = (0, L.assertNodeType)("NumericLiteral", "BigIntLiteral"),
						t = (0, L.assertOneOf)("-"),
						r = (0, L.assertNodeType)(
							"NumericLiteral",
							"StringLiteral",
							"BooleanLiteral",
							"BigIntLiteral",
							"TemplateLiteral"
						)
					function a(n, i, l) {
						;(0, IE.default)("UnaryExpression", l)
							? (t(l, "operator", l.operator),
							  e(l, "argument", l.argument))
							: r(n, i, l)
					}
					return (
						(a.oneOfNodeTypes = [
							"NumericLiteral",
							"StringLiteral",
							"BooleanLiteral",
							"BigIntLiteral",
							"TemplateLiteral",
							"UnaryExpression",
						]),
						a
					)
				})(),
			},
		},
	})
	W("TSExpressionWithTypeArguments", {
		aliases: ["TSType"],
		visitor: ["expression", "typeParameters"],
		fields: {
			expression: (0, L.validateType)("TSEntityName"),
			typeParameters: (0, L.validateOptionalType)(
				"TSTypeParameterInstantiation"
			),
		},
	})
	W("TSInterfaceDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "typeParameters", "extends", "body"],
		fields: {
			declare: (0, L.validateOptional)(Pe),
			id: (0, L.validateType)("Identifier"),
			typeParameters: (0, L.validateOptionalType)(
				"TSTypeParameterDeclaration"
			),
			extends: (0, L.validateOptional)(
				(0, L.arrayOfType)("TSExpressionWithTypeArguments")
			),
			body: (0, L.validateType)("TSInterfaceBody"),
		},
	})
	W("TSInterfaceBody", {
		visitor: ["body"],
		fields: {body: (0, L.validateArrayOfType)("TSTypeElement")},
	})
	W("TSTypeAliasDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "typeParameters", "typeAnnotation"],
		fields: {
			declare: (0, L.validateOptional)(Pe),
			id: (0, L.validateType)("Identifier"),
			typeParameters: (0, L.validateOptionalType)(
				"TSTypeParameterDeclaration"
			),
			typeAnnotation: (0, L.validateType)("TSType"),
		},
	})
	W("TSInstantiationExpression", {
		aliases: ["Expression"],
		visitor: ["expression", "typeParameters"],
		fields: {
			expression: (0, L.validateType)("Expression"),
			typeParameters: (0, L.validateOptionalType)(
				"TSTypeParameterInstantiation"
			),
		},
	})
	var ou = {
		aliases: ["Expression", "LVal", "PatternLike"],
		visitor: ["expression", "typeAnnotation"],
		fields: {
			expression: (0, L.validateType)("Expression"),
			typeAnnotation: (0, L.validateType)("TSType"),
		},
	}
	W("TSAsExpression", ou)
	W("TSSatisfiesExpression", ou)
	W("TSTypeAssertion", {
		aliases: ["Expression", "LVal", "PatternLike"],
		visitor: ["typeAnnotation", "expression"],
		fields: {
			typeAnnotation: (0, L.validateType)("TSType"),
			expression: (0, L.validateType)("Expression"),
		},
	})
	W("TSEnumBody", {
		visitor: ["members"],
		fields: {members: (0, L.validateArrayOfType)("TSEnumMember")},
	})
	W("TSEnumDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "members"],
		fields: {
			declare: (0, L.validateOptional)(Pe),
			const: (0, L.validateOptional)(Pe),
			id: (0, L.validateType)("Identifier"),
			members: (0, L.validateArrayOfType)("TSEnumMember"),
			initializer: (0, L.validateOptionalType)("Expression"),
			body: (0, L.validateOptionalType)("TSEnumBody"),
		},
	})
	W("TSEnumMember", {
		visitor: ["id", "initializer"],
		fields: {
			id: (0, L.validateType)("Identifier", "StringLiteral"),
			initializer: (0, L.validateOptionalType)("Expression"),
		},
	})
	W("TSModuleDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "body"],
		fields: Object.assign(
			{
				kind: {
					validate: (0, L.assertOneOf)("global", "module", "namespace"),
				},
				declare: (0, L.validateOptional)(Pe),
			},
			{global: (0, L.validateOptional)(Pe)},
			{
				id: (0, L.validateType)("Identifier", "StringLiteral"),
				body: (0, L.validateType)("TSModuleBlock", "TSModuleDeclaration"),
			}
		),
	})
	W("TSModuleBlock", {
		aliases: ["Scopable", "Block", "BlockParent", "FunctionParent"],
		visitor: ["body"],
		fields: {body: (0, L.validateArrayOfType)("Statement")},
	})
	W("TSImportType", {
		aliases: ["TSType"],
		builder: ["argument", "qualifier", "typeParameters"],
		visitor: ["argument", "options", "qualifier", "typeParameters"],
		fields: {
			argument: (0, L.validateType)("StringLiteral"),
			qualifier: (0, L.validateOptionalType)("TSEntityName"),
			typeParameters: (0, L.validateOptionalType)(
				"TSTypeParameterInstantiation"
			),
			options: {
				validate: (0, L.assertNodeType)("ObjectExpression"),
				optional: !0,
			},
		},
	})
	W("TSImportEqualsDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "moduleReference"],
		fields: Object.assign(
			{},
			{isExport: (0, L.validate)(Pe)},
			{
				id: (0, L.validateType)("Identifier"),
				moduleReference: (0, L.validateType)(
					"TSEntityName",
					"TSExternalModuleReference"
				),
				importKind: {
					validate: (0, L.assertOneOf)("type", "value"),
					optional: !0,
				},
			}
		),
	})
	W("TSExternalModuleReference", {
		visitor: ["expression"],
		fields: {expression: (0, L.validateType)("StringLiteral")},
	})
	W("TSNonNullExpression", {
		aliases: ["Expression", "LVal", "PatternLike"],
		visitor: ["expression"],
		fields: {expression: (0, L.validateType)("Expression")},
	})
	W("TSExportAssignment", {
		aliases: ["Statement"],
		visitor: ["expression"],
		fields: {expression: (0, L.validateType)("Expression")},
	})
	W("TSNamespaceExportDeclaration", {
		aliases: ["Statement"],
		visitor: ["id"],
		fields: {id: (0, L.validateType)("Identifier")},
	})
	W("TSTypeAnnotation", {
		visitor: ["typeAnnotation"],
		fields: {typeAnnotation: {validate: (0, L.assertNodeType)("TSType")}},
	})
	W("TSTypeParameterInstantiation", {
		visitor: ["params"],
		fields: {params: (0, L.validateArrayOfType)("TSType")},
	})
	W("TSTypeParameterDeclaration", {
		visitor: ["params"],
		fields: {params: (0, L.validateArrayOfType)("TSTypeParameter")},
	})
	W("TSTypeParameter", {
		builder: ["constraint", "default", "name"],
		visitor: ["constraint", "default"],
		fields: {
			name: {validate: (0, L.assertValueType)("string")},
			in: {validate: (0, L.assertValueType)("boolean"), optional: !0},
			out: {validate: (0, L.assertValueType)("boolean"), optional: !0},
			const: {validate: (0, L.assertValueType)("boolean"), optional: !0},
			constraint: {validate: (0, L.assertNodeType)("TSType"), optional: !0},
			default: {validate: (0, L.assertNodeType)("TSType"), optional: !0},
		},
	})
})
var cu = v(Or => {
	"use strict"
	Object.defineProperty(Or, "__esModule", {value: !0})
	Or.DEPRECATED_ALIASES = void 0
	var Sv = (Or.DEPRECATED_ALIASES = {
		ModuleDeclaration: "ImportOrExportDeclaration",
	})
})
var Be = v(ge => {
	"use strict"
	Object.defineProperty(ge, "__esModule", {value: !0})
	Object.defineProperty(ge, "ALIAS_KEYS", {
		enumerable: !0,
		get: function () {
			return Ce.ALIAS_KEYS
		},
	})
	Object.defineProperty(ge, "BUILDER_KEYS", {
		enumerable: !0,
		get: function () {
			return Ce.BUILDER_KEYS
		},
	})
	Object.defineProperty(ge, "DEPRECATED_ALIASES", {
		enumerable: !0,
		get: function () {
			return Ja.DEPRECATED_ALIASES
		},
	})
	Object.defineProperty(ge, "DEPRECATED_KEYS", {
		enumerable: !0,
		get: function () {
			return Ce.DEPRECATED_KEYS
		},
	})
	Object.defineProperty(ge, "FLIPPED_ALIAS_KEYS", {
		enumerable: !0,
		get: function () {
			return Ce.FLIPPED_ALIAS_KEYS
		},
	})
	Object.defineProperty(ge, "NODE_FIELDS", {
		enumerable: !0,
		get: function () {
			return Ce.NODE_FIELDS
		},
	})
	Object.defineProperty(ge, "NODE_PARENT_VALIDATIONS", {
		enumerable: !0,
		get: function () {
			return Ce.NODE_PARENT_VALIDATIONS
		},
	})
	Object.defineProperty(ge, "PLACEHOLDERS", {
		enumerable: !0,
		get: function () {
			return Wa.PLACEHOLDERS
		},
	})
	Object.defineProperty(ge, "PLACEHOLDERS_ALIAS", {
		enumerable: !0,
		get: function () {
			return Wa.PLACEHOLDERS_ALIAS
		},
	})
	Object.defineProperty(ge, "PLACEHOLDERS_FLIPPED_ALIAS", {
		enumerable: !0,
		get: function () {
			return Wa.PLACEHOLDERS_FLIPPED_ALIAS
		},
	})
	ge.TYPES = void 0
	Object.defineProperty(ge, "VISITOR_KEYS", {
		enumerable: !0,
		get: function () {
			return Ce.VISITOR_KEYS
		},
	})
	Kt()
	zi()
	Zi()
	eu()
	tu()
	lu()
	var Ce = Ye(),
		Wa = Ka(),
		Ja = cu()
	Object.keys(Ja.DEPRECATED_ALIASES).forEach(e => {
		Ce.FLIPPED_ALIAS_KEYS[e] = Ce.FLIPPED_ALIAS_KEYS[Ja.DEPRECATED_ALIASES[e]]
	})
	for (let {types: e, set: t} of Ce.allExpandedTypes)
		for (let r of e) {
			let a = Ce.FLIPPED_ALIAS_KEYS[r]
			a ? a.forEach(t.add, t) : t.add(r)
		}
	var Av = (ge.TYPES = [].concat(
		Object.keys(Ce.VISITOR_KEYS),
		Object.keys(Ce.FLIPPED_ALIAS_KEYS),
		Object.keys(Ce.DEPRECATED_KEYS)
	))
})
var gr = v(gt => {
	"use strict"
	Object.defineProperty(gt, "__esModule", {value: !0})
	gt.default = DE
	gt.validateChild = pu
	gt.validateField = du
	gt.validateInternal = xE
	var Xt = Be()
	function DE(e, t, r) {
		if (!e) return
		let a = Xt.NODE_FIELDS[e.type]
		if (!a) return
		let n = a[t]
		du(e, t, r, n), pu(e, t, r)
	}
	function xE(e, t, r, a, n) {
		if (
			e != null &&
			e.validate &&
			!(e.optional && a == null) &&
			(e.validate(t, r, a), n)
		) {
			var i
			let l = a.type
			if (l == null) return
			;(i = Xt.NODE_PARENT_VALIDATIONS[l]) == null ||
				i.call(Xt.NODE_PARENT_VALIDATIONS, t, r, a)
		}
	}
	function du(e, t, r, a) {
		a != null &&
			a.validate &&
			((a.optional && r == null) || a.validate(e, t, r))
	}
	function pu(e, t, r) {
		var a
		let n = r?.type
		n != null &&
			((a = Xt.NODE_PARENT_VALIDATIONS[n]) == null ||
				a.call(Xt.NODE_PARENT_VALIDATIONS, e, t, r))
	}
})
var Qa = v(p => {
	"use strict"
	Object.defineProperty(p, "__esModule", {value: !0})
	p.anyTypeAnnotation = iS
	p.argumentPlaceholder = Bb
	p.arrayExpression = PE
	p.arrayPattern = gy
	p.arrayTypeAnnotation = uS
	p.arrowFunctionExpression = Dy
	p.assignmentExpression = CE
	p.assignmentPattern = Iy
	p.awaitExpression = Xy
	p.bigIntLiteral = Wy
	p.binaryExpression = LE
	p.bindExpression = wb
	p.blockStatement = BE
	p.booleanLiteral = ty
	p.booleanLiteralTypeAnnotation = lS
	p.booleanTypeAnnotation = oS
	p.breakStatement = wE
	p.callExpression = FE
	p.catchClause = kE
	p.classAccessorProperty = eS
	p.classBody = xy
	p.classDeclaration = Oy
	p.classExpression = Ny
	p.classImplements = dS
	p.classMethod = Gy
	p.classPrivateMethod = rS
	p.classPrivateProperty = tS
	p.classProperty = Zy
	p.conditionalExpression = UE
	p.continueStatement = GE
	p.debuggerStatement = qE
	p.decimalLiteral = Hb
	p.declareClass = pS
	p.declareExportAllDeclaration = hS
	p.declareExportDeclaration = AS
	p.declareFunction = fS
	p.declareInterface = TS
	p.declareModule = mS
	p.declareModuleExports = ES
	p.declareOpaqueType = SS
	p.declareTypeAlias = yS
	p.declareVariable = bS
	p.declaredPredicate = _S
	p.decorator = Fb
	p.directive = RE
	p.directiveLiteral = ME
	p.doExpression = kb
	p.doWhileStatement = HE
	p.emptyStatement = jE
	p.emptyTypeAnnotation = RS
	p.enumBooleanBody = ub
	p.enumBooleanMember = db
	p.enumDeclaration = ib
	p.enumDefaultedMember = Tb
	p.enumNumberBody = ob
	p.enumNumberMember = pb
	p.enumStringBody = lb
	p.enumStringMember = fb
	p.enumSymbolBody = cb
	p.existsTypeAnnotation = IS
	p.exportAllDeclaration = Py
	p.exportDefaultDeclaration = Cy
	p.exportDefaultSpecifier = Ub
	p.exportNamedDeclaration = Ly
	p.exportNamespaceSpecifier = Qy
	p.exportSpecifier = vy
	p.expressionStatement = YE
	p.file = VE
	p.forInStatement = KE
	p.forOfStatement = Ry
	p.forStatement = XE
	p.functionDeclaration = JE
	p.functionExpression = WE
	p.functionTypeAnnotation = gS
	p.functionTypeParam = DS
	p.genericTypeAnnotation = xS
	p.identifier = QE
	p.ifStatement = $E
	p.import = Jy
	p.importAttribute = sS
	p.importDeclaration = My
	p.importDefaultSpecifier = By
	p.importExpression = ky
	p.importNamespaceSpecifier = wy
	p.importSpecifier = Fy
	p.indexedAccessType = mb
	p.inferredPredicate = NS
	p.interfaceDeclaration = PS
	p.interfaceExtends = OS
	p.interfaceTypeAnnotation = CS
	p.interpreterDirective = vE
	p.intersectionTypeAnnotation = LS
	p.jSXAttribute = p.jsxAttribute = yb
	p.jSXClosingElement = p.jsxClosingElement = Sb
	p.jSXClosingFragment = p.jsxClosingFragment = Lb
	p.jSXElement = p.jsxElement = bb
	p.jSXEmptyExpression = p.jsxEmptyExpression = Ab
	p.jSXExpressionContainer = p.jsxExpressionContainer = hb
	p.jSXFragment = p.jsxFragment = Pb
	p.jSXIdentifier = p.jsxIdentifier = Ib
	p.jSXMemberExpression = p.jsxMemberExpression = gb
	p.jSXNamespacedName = p.jsxNamespacedName = Db
	p.jSXOpeningElement = p.jsxOpeningElement = xb
	p.jSXOpeningFragment = p.jsxOpeningFragment = Cb
	p.jSXSpreadAttribute = p.jsxSpreadAttribute = Nb
	p.jSXSpreadChild = p.jsxSpreadChild = _b
	p.jSXText = p.jsxText = Ob
	p.labeledStatement = zE
	p.logicalExpression = ry
	p.memberExpression = ay
	p.metaProperty = Uy
	p.mixedTypeAnnotation = vS
	p.moduleExpression = jb
	p.newExpression = ny
	p.noop = vb
	p.nullLiteral = ey
	p.nullLiteralTypeAnnotation = cS
	p.nullableTypeAnnotation = MS
	p.numberLiteral = uh
	p.numberLiteralTypeAnnotation = BS
	p.numberTypeAnnotation = wS
	p.numericLiteral = fu
	p.objectExpression = iy
	p.objectMethod = uy
	p.objectPattern = qy
	p.objectProperty = oy
	p.objectTypeAnnotation = FS
	p.objectTypeCallProperty = US
	p.objectTypeIndexer = GS
	p.objectTypeInternalSlot = kS
	p.objectTypeProperty = qS
	p.objectTypeSpreadProperty = HS
	p.opaqueType = jS
	p.optionalCallExpression = zy
	p.optionalIndexedAccessType = Eb
	p.optionalMemberExpression = $y
	p.parenthesizedExpression = dy
	p.pipelineBareFunction = Kb
	p.pipelinePrimaryTopicReference = Xb
	p.pipelineTopicExpression = Vb
	p.placeholder = Rb
	p.privateName = aS
	p.program = sy
	p.qualifiedTypeIdentifier = YS
	p.recordExpression = Gb
	p.regExpLiteral = Tu
	p.regexLiteral = oh
	p.restElement = mu
	p.restProperty = lh
	p.returnStatement = ly
	p.sequenceExpression = cy
	p.spreadElement = Eu
	p.spreadProperty = ch
	p.staticBlock = nS
	p.stringLiteral = ZE
	p.stringLiteralTypeAnnotation = VS
	p.stringTypeAnnotation = KS
	p.super = Hy
	p.switchCase = py
	p.switchStatement = fy
	p.symbolTypeAnnotation = XS
	p.taggedTemplateExpression = jy
	p.templateElement = Yy
	p.templateLiteral = Vy
	p.thisExpression = Ty
	p.thisTypeAnnotation = JS
	p.throwStatement = my
	p.topicReference = Yb
	p.tryStatement = Ey
	p.tSAnyKeyword = p.tsAnyKeyword = aA
	p.tSArrayType = p.tsArrayType = IA
	p.tSAsExpression = p.tsAsExpression = jA
	p.tSBigIntKeyword = p.tsBigIntKeyword = sA
	p.tSBooleanKeyword = p.tsBooleanKeyword = nA
	p.tSCallSignatureDeclaration = p.tsCallSignatureDeclaration = zb
	p.tSConditionalType = p.tsConditionalType = CA
	p.tSConstructSignatureDeclaration = p.tsConstructSignatureDeclaration = Zb
	p.tSConstructorType = p.tsConstructorType = SA
	p.tSDeclareFunction = p.tsDeclareFunction = Wb
	p.tSDeclareMethod = p.tsDeclareMethod = Qb
	p.tSEnumBody = p.tsEnumBody = KA
	p.tSEnumDeclaration = p.tsEnumDeclaration = XA
	p.tSEnumMember = p.tsEnumMember = JA
	p.tSExportAssignment = p.tsExportAssignment = th
	p.tSExpressionWithTypeArguments = p.tsExpressionWithTypeArguments = kA
	p.tSExternalModuleReference = p.tsExternalModuleReference = ZA
	p.tSFunctionType = p.tsFunctionType = yA
	p.tSImportEqualsDeclaration = p.tsImportEqualsDeclaration = zA
	p.tSImportType = p.tsImportType = $A
	p.tSIndexSignature = p.tsIndexSignature = rA
	p.tSIndexedAccessType = p.tsIndexedAccessType = MA
	p.tSInferType = p.tsInferType = LA
	p.tSInstantiationExpression = p.tsInstantiationExpression = HA
	p.tSInterfaceBody = p.tsInterfaceBody = GA
	p.tSInterfaceDeclaration = p.tsInterfaceDeclaration = UA
	p.tSIntersectionType = p.tsIntersectionType = PA
	p.tSIntrinsicKeyword = p.tsIntrinsicKeyword = iA
	p.tSLiteralType = p.tsLiteralType = FA
	p.tSMappedType = p.tsMappedType = BA
	p.tSMethodSignature = p.tsMethodSignature = tA
	p.tSModuleBlock = p.tsModuleBlock = QA
	p.tSModuleDeclaration = p.tsModuleDeclaration = WA
	p.tSNamedTupleMember = p.tsNamedTupleMember = NA
	p.tSNamespaceExportDeclaration = p.tsNamespaceExportDeclaration = rh
	p.tSNeverKeyword = p.tsNeverKeyword = uA
	p.tSNonNullExpression = p.tsNonNullExpression = eh
	p.tSNullKeyword = p.tsNullKeyword = oA
	p.tSNumberKeyword = p.tsNumberKeyword = lA
	p.tSObjectKeyword = p.tsObjectKeyword = cA
	p.tSOptionalType = p.tsOptionalType = DA
	p.tSParameterProperty = p.tsParameterProperty = Jb
	p.tSParenthesizedType = p.tsParenthesizedType = vA
	p.tSPropertySignature = p.tsPropertySignature = eA
	p.tSQualifiedName = p.tsQualifiedName = $b
	p.tSRestType = p.tsRestType = xA
	p.tSSatisfiesExpression = p.tsSatisfiesExpression = YA
	p.tSStringKeyword = p.tsStringKeyword = dA
	p.tSSymbolKeyword = p.tsSymbolKeyword = pA
	p.tSTemplateLiteralType = p.tsTemplateLiteralType = wA
	p.tSThisType = p.tsThisType = EA
	p.tSTupleType = p.tsTupleType = gA
	p.tSTypeAliasDeclaration = p.tsTypeAliasDeclaration = qA
	p.tSTypeAnnotation = p.tsTypeAnnotation = ah
	p.tSTypeAssertion = p.tsTypeAssertion = VA
	p.tSTypeLiteral = p.tsTypeLiteral = _A
	p.tSTypeOperator = p.tsTypeOperator = RA
	p.tSTypeParameter = p.tsTypeParameter = ih
	p.tSTypeParameterDeclaration = p.tsTypeParameterDeclaration = sh
	p.tSTypeParameterInstantiation = p.tsTypeParameterInstantiation = nh
	p.tSTypePredicate = p.tsTypePredicate = AA
	p.tSTypeQuery = p.tsTypeQuery = hA
	p.tSTypeReference = p.tsTypeReference = bA
	p.tSUndefinedKeyword = p.tsUndefinedKeyword = fA
	p.tSUnionType = p.tsUnionType = OA
	p.tSUnknownKeyword = p.tsUnknownKeyword = TA
	p.tSVoidKeyword = p.tsVoidKeyword = mA
	p.tupleExpression = qb
	p.tupleTypeAnnotation = WS
	p.typeAlias = $S
	p.typeAnnotation = zS
	p.typeCastExpression = ZS
	p.typeParameter = eb
	p.typeParameterDeclaration = tb
	p.typeParameterInstantiation = rb
	p.typeofTypeAnnotation = QS
	p.unaryExpression = yy
	p.unionTypeAnnotation = ab
	p.updateExpression = Sy
	p.v8IntrinsicIdentifier = Mb
	p.variableDeclaration = by
	p.variableDeclarator = Ay
	p.variance = nb
	p.voidTypeAnnotation = sb
	p.whileStatement = hy
	p.withStatement = _y
	p.yieldExpression = Ky
	var NE = gr(),
		Pr = St(),
		OE = Ye(),
		{validateInternal: c} = NE,
		{NODE_FIELDS: I} = OE
	function PE(e = []) {
		let t = {type: "ArrayExpression", elements: e},
			r = I.ArrayExpression
		return c(r.elements, t, "elements", e, 1), t
	}
	function CE(e, t, r) {
		let a = {type: "AssignmentExpression", operator: e, left: t, right: r},
			n = I.AssignmentExpression
		return (
			c(n.operator, a, "operator", e),
			c(n.left, a, "left", t, 1),
			c(n.right, a, "right", r, 1),
			a
		)
	}
	function LE(e, t, r) {
		let a = {type: "BinaryExpression", operator: e, left: t, right: r},
			n = I.BinaryExpression
		return (
			c(n.operator, a, "operator", e),
			c(n.left, a, "left", t, 1),
			c(n.right, a, "right", r, 1),
			a
		)
	}
	function vE(e) {
		let t = {type: "InterpreterDirective", value: e},
			r = I.InterpreterDirective
		return c(r.value, t, "value", e), t
	}
	function RE(e) {
		let t = {type: "Directive", value: e},
			r = I.Directive
		return c(r.value, t, "value", e, 1), t
	}
	function ME(e) {
		let t = {type: "DirectiveLiteral", value: e},
			r = I.DirectiveLiteral
		return c(r.value, t, "value", e), t
	}
	function BE(e, t = []) {
		let r = {type: "BlockStatement", body: e, directives: t},
			a = I.BlockStatement
		return (
			c(a.body, r, "body", e, 1), c(a.directives, r, "directives", t, 1), r
		)
	}
	function wE(e = null) {
		let t = {type: "BreakStatement", label: e},
			r = I.BreakStatement
		return c(r.label, t, "label", e, 1), t
	}
	function FE(e, t) {
		let r = {type: "CallExpression", callee: e, arguments: t},
			a = I.CallExpression
		return (
			c(a.callee, r, "callee", e, 1), c(a.arguments, r, "arguments", t, 1), r
		)
	}
	function kE(e = null, t) {
		let r = {type: "CatchClause", param: e, body: t},
			a = I.CatchClause
		return c(a.param, r, "param", e, 1), c(a.body, r, "body", t, 1), r
	}
	function UE(e, t, r) {
		let a = {
				type: "ConditionalExpression",
				test: e,
				consequent: t,
				alternate: r,
			},
			n = I.ConditionalExpression
		return (
			c(n.test, a, "test", e, 1),
			c(n.consequent, a, "consequent", t, 1),
			c(n.alternate, a, "alternate", r, 1),
			a
		)
	}
	function GE(e = null) {
		let t = {type: "ContinueStatement", label: e},
			r = I.ContinueStatement
		return c(r.label, t, "label", e, 1), t
	}
	function qE() {
		return {type: "DebuggerStatement"}
	}
	function HE(e, t) {
		let r = {type: "DoWhileStatement", test: e, body: t},
			a = I.DoWhileStatement
		return c(a.test, r, "test", e, 1), c(a.body, r, "body", t, 1), r
	}
	function jE() {
		return {type: "EmptyStatement"}
	}
	function YE(e) {
		let t = {type: "ExpressionStatement", expression: e},
			r = I.ExpressionStatement
		return c(r.expression, t, "expression", e, 1), t
	}
	function VE(e, t = null, r = null) {
		let a = {type: "File", program: e, comments: t, tokens: r},
			n = I.File
		return (
			c(n.program, a, "program", e, 1),
			c(n.comments, a, "comments", t, 1),
			c(n.tokens, a, "tokens", r),
			a
		)
	}
	function KE(e, t, r) {
		let a = {type: "ForInStatement", left: e, right: t, body: r},
			n = I.ForInStatement
		return (
			c(n.left, a, "left", e, 1),
			c(n.right, a, "right", t, 1),
			c(n.body, a, "body", r, 1),
			a
		)
	}
	function XE(e = null, t = null, r = null, a) {
		let n = {type: "ForStatement", init: e, test: t, update: r, body: a},
			i = I.ForStatement
		return (
			c(i.init, n, "init", e, 1),
			c(i.test, n, "test", t, 1),
			c(i.update, n, "update", r, 1),
			c(i.body, n, "body", a, 1),
			n
		)
	}
	function JE(e = null, t, r, a = !1, n = !1) {
		let i = {
				type: "FunctionDeclaration",
				id: e,
				params: t,
				body: r,
				generator: a,
				async: n,
			},
			l = I.FunctionDeclaration
		return (
			c(l.id, i, "id", e, 1),
			c(l.params, i, "params", t, 1),
			c(l.body, i, "body", r, 1),
			c(l.generator, i, "generator", a),
			c(l.async, i, "async", n),
			i
		)
	}
	function WE(e = null, t, r, a = !1, n = !1) {
		let i = {
				type: "FunctionExpression",
				id: e,
				params: t,
				body: r,
				generator: a,
				async: n,
			},
			l = I.FunctionExpression
		return (
			c(l.id, i, "id", e, 1),
			c(l.params, i, "params", t, 1),
			c(l.body, i, "body", r, 1),
			c(l.generator, i, "generator", a),
			c(l.async, i, "async", n),
			i
		)
	}
	function QE(e) {
		let t = {type: "Identifier", name: e},
			r = I.Identifier
		return c(r.name, t, "name", e), t
	}
	function $E(e, t, r = null) {
		let a = {type: "IfStatement", test: e, consequent: t, alternate: r},
			n = I.IfStatement
		return (
			c(n.test, a, "test", e, 1),
			c(n.consequent, a, "consequent", t, 1),
			c(n.alternate, a, "alternate", r, 1),
			a
		)
	}
	function zE(e, t) {
		let r = {type: "LabeledStatement", label: e, body: t},
			a = I.LabeledStatement
		return c(a.label, r, "label", e, 1), c(a.body, r, "body", t, 1), r
	}
	function ZE(e) {
		let t = {type: "StringLiteral", value: e},
			r = I.StringLiteral
		return c(r.value, t, "value", e), t
	}
	function fu(e) {
		let t = {type: "NumericLiteral", value: e},
			r = I.NumericLiteral
		return c(r.value, t, "value", e), t
	}
	function ey() {
		return {type: "NullLiteral"}
	}
	function ty(e) {
		let t = {type: "BooleanLiteral", value: e},
			r = I.BooleanLiteral
		return c(r.value, t, "value", e), t
	}
	function Tu(e, t = "") {
		let r = {type: "RegExpLiteral", pattern: e, flags: t},
			a = I.RegExpLiteral
		return c(a.pattern, r, "pattern", e), c(a.flags, r, "flags", t), r
	}
	function ry(e, t, r) {
		let a = {type: "LogicalExpression", operator: e, left: t, right: r},
			n = I.LogicalExpression
		return (
			c(n.operator, a, "operator", e),
			c(n.left, a, "left", t, 1),
			c(n.right, a, "right", r, 1),
			a
		)
	}
	function ay(e, t, r = !1, a = null) {
		let n = {
				type: "MemberExpression",
				object: e,
				property: t,
				computed: r,
				optional: a,
			},
			i = I.MemberExpression
		return (
			c(i.object, n, "object", e, 1),
			c(i.property, n, "property", t, 1),
			c(i.computed, n, "computed", r),
			c(i.optional, n, "optional", a),
			n
		)
	}
	function ny(e, t) {
		let r = {type: "NewExpression", callee: e, arguments: t},
			a = I.NewExpression
		return (
			c(a.callee, r, "callee", e, 1), c(a.arguments, r, "arguments", t, 1), r
		)
	}
	function sy(e, t = [], r = "script", a = null) {
		let n = {
				type: "Program",
				body: e,
				directives: t,
				sourceType: r,
				interpreter: a,
			},
			i = I.Program
		return (
			c(i.body, n, "body", e, 1),
			c(i.directives, n, "directives", t, 1),
			c(i.sourceType, n, "sourceType", r),
			c(i.interpreter, n, "interpreter", a, 1),
			n
		)
	}
	function iy(e) {
		let t = {type: "ObjectExpression", properties: e},
			r = I.ObjectExpression
		return c(r.properties, t, "properties", e, 1), t
	}
	function uy(e = "method", t, r, a, n = !1, i = !1, l = !1) {
		let d = {
				type: "ObjectMethod",
				kind: e,
				key: t,
				params: r,
				body: a,
				computed: n,
				generator: i,
				async: l,
			},
			S = I.ObjectMethod
		return (
			c(S.kind, d, "kind", e),
			c(S.key, d, "key", t, 1),
			c(S.params, d, "params", r, 1),
			c(S.body, d, "body", a, 1),
			c(S.computed, d, "computed", n),
			c(S.generator, d, "generator", i),
			c(S.async, d, "async", l),
			d
		)
	}
	function oy(e, t, r = !1, a = !1, n = null) {
		let i = {
				type: "ObjectProperty",
				key: e,
				value: t,
				computed: r,
				shorthand: a,
				decorators: n,
			},
			l = I.ObjectProperty
		return (
			c(l.key, i, "key", e, 1),
			c(l.value, i, "value", t, 1),
			c(l.computed, i, "computed", r),
			c(l.shorthand, i, "shorthand", a),
			c(l.decorators, i, "decorators", n, 1),
			i
		)
	}
	function mu(e) {
		let t = {type: "RestElement", argument: e},
			r = I.RestElement
		return c(r.argument, t, "argument", e, 1), t
	}
	function ly(e = null) {
		let t = {type: "ReturnStatement", argument: e},
			r = I.ReturnStatement
		return c(r.argument, t, "argument", e, 1), t
	}
	function cy(e) {
		let t = {type: "SequenceExpression", expressions: e},
			r = I.SequenceExpression
		return c(r.expressions, t, "expressions", e, 1), t
	}
	function dy(e) {
		let t = {type: "ParenthesizedExpression", expression: e},
			r = I.ParenthesizedExpression
		return c(r.expression, t, "expression", e, 1), t
	}
	function py(e = null, t) {
		let r = {type: "SwitchCase", test: e, consequent: t},
			a = I.SwitchCase
		return (
			c(a.test, r, "test", e, 1), c(a.consequent, r, "consequent", t, 1), r
		)
	}
	function fy(e, t) {
		let r = {type: "SwitchStatement", discriminant: e, cases: t},
			a = I.SwitchStatement
		return (
			c(a.discriminant, r, "discriminant", e, 1),
			c(a.cases, r, "cases", t, 1),
			r
		)
	}
	function Ty() {
		return {type: "ThisExpression"}
	}
	function my(e) {
		let t = {type: "ThrowStatement", argument: e},
			r = I.ThrowStatement
		return c(r.argument, t, "argument", e, 1), t
	}
	function Ey(e, t = null, r = null) {
		let a = {type: "TryStatement", block: e, handler: t, finalizer: r},
			n = I.TryStatement
		return (
			c(n.block, a, "block", e, 1),
			c(n.handler, a, "handler", t, 1),
			c(n.finalizer, a, "finalizer", r, 1),
			a
		)
	}
	function yy(e, t, r = !0) {
		let a = {type: "UnaryExpression", operator: e, argument: t, prefix: r},
			n = I.UnaryExpression
		return (
			c(n.operator, a, "operator", e),
			c(n.argument, a, "argument", t, 1),
			c(n.prefix, a, "prefix", r),
			a
		)
	}
	function Sy(e, t, r = !1) {
		let a = {type: "UpdateExpression", operator: e, argument: t, prefix: r},
			n = I.UpdateExpression
		return (
			c(n.operator, a, "operator", e),
			c(n.argument, a, "argument", t, 1),
			c(n.prefix, a, "prefix", r),
			a
		)
	}
	function by(e, t) {
		let r = {type: "VariableDeclaration", kind: e, declarations: t},
			a = I.VariableDeclaration
		return (
			c(a.kind, r, "kind", e), c(a.declarations, r, "declarations", t, 1), r
		)
	}
	function Ay(e, t = null) {
		let r = {type: "VariableDeclarator", id: e, init: t},
			a = I.VariableDeclarator
		return c(a.id, r, "id", e, 1), c(a.init, r, "init", t, 1), r
	}
	function hy(e, t) {
		let r = {type: "WhileStatement", test: e, body: t},
			a = I.WhileStatement
		return c(a.test, r, "test", e, 1), c(a.body, r, "body", t, 1), r
	}
	function _y(e, t) {
		let r = {type: "WithStatement", object: e, body: t},
			a = I.WithStatement
		return c(a.object, r, "object", e, 1), c(a.body, r, "body", t, 1), r
	}
	function Iy(e, t) {
		let r = {type: "AssignmentPattern", left: e, right: t},
			a = I.AssignmentPattern
		return c(a.left, r, "left", e, 1), c(a.right, r, "right", t, 1), r
	}
	function gy(e) {
		let t = {type: "ArrayPattern", elements: e},
			r = I.ArrayPattern
		return c(r.elements, t, "elements", e, 1), t
	}
	function Dy(e, t, r = !1) {
		let a = {
				type: "ArrowFunctionExpression",
				params: e,
				body: t,
				async: r,
				expression: null,
			},
			n = I.ArrowFunctionExpression
		return (
			c(n.params, a, "params", e, 1),
			c(n.body, a, "body", t, 1),
			c(n.async, a, "async", r),
			a
		)
	}
	function xy(e) {
		let t = {type: "ClassBody", body: e},
			r = I.ClassBody
		return c(r.body, t, "body", e, 1), t
	}
	function Ny(e = null, t = null, r, a = null) {
		let n = {
				type: "ClassExpression",
				id: e,
				superClass: t,
				body: r,
				decorators: a,
			},
			i = I.ClassExpression
		return (
			c(i.id, n, "id", e, 1),
			c(i.superClass, n, "superClass", t, 1),
			c(i.body, n, "body", r, 1),
			c(i.decorators, n, "decorators", a, 1),
			n
		)
	}
	function Oy(e = null, t = null, r, a = null) {
		let n = {
				type: "ClassDeclaration",
				id: e,
				superClass: t,
				body: r,
				decorators: a,
			},
			i = I.ClassDeclaration
		return (
			c(i.id, n, "id", e, 1),
			c(i.superClass, n, "superClass", t, 1),
			c(i.body, n, "body", r, 1),
			c(i.decorators, n, "decorators", a, 1),
			n
		)
	}
	function Py(e) {
		let t = {type: "ExportAllDeclaration", source: e},
			r = I.ExportAllDeclaration
		return c(r.source, t, "source", e, 1), t
	}
	function Cy(e) {
		let t = {type: "ExportDefaultDeclaration", declaration: e},
			r = I.ExportDefaultDeclaration
		return c(r.declaration, t, "declaration", e, 1), t
	}
	function Ly(e = null, t = [], r = null) {
		let a = {
				type: "ExportNamedDeclaration",
				declaration: e,
				specifiers: t,
				source: r,
			},
			n = I.ExportNamedDeclaration
		return (
			c(n.declaration, a, "declaration", e, 1),
			c(n.specifiers, a, "specifiers", t, 1),
			c(n.source, a, "source", r, 1),
			a
		)
	}
	function vy(e, t) {
		let r = {type: "ExportSpecifier", local: e, exported: t},
			a = I.ExportSpecifier
		return c(a.local, r, "local", e, 1), c(a.exported, r, "exported", t, 1), r
	}
	function Ry(e, t, r, a = !1) {
		let n = {type: "ForOfStatement", left: e, right: t, body: r, await: a},
			i = I.ForOfStatement
		return (
			c(i.left, n, "left", e, 1),
			c(i.right, n, "right", t, 1),
			c(i.body, n, "body", r, 1),
			c(i.await, n, "await", a),
			n
		)
	}
	function My(e, t) {
		let r = {type: "ImportDeclaration", specifiers: e, source: t},
			a = I.ImportDeclaration
		return (
			c(a.specifiers, r, "specifiers", e, 1),
			c(a.source, r, "source", t, 1),
			r
		)
	}
	function By(e) {
		let t = {type: "ImportDefaultSpecifier", local: e},
			r = I.ImportDefaultSpecifier
		return c(r.local, t, "local", e, 1), t
	}
	function wy(e) {
		let t = {type: "ImportNamespaceSpecifier", local: e},
			r = I.ImportNamespaceSpecifier
		return c(r.local, t, "local", e, 1), t
	}
	function Fy(e, t) {
		let r = {type: "ImportSpecifier", local: e, imported: t},
			a = I.ImportSpecifier
		return c(a.local, r, "local", e, 1), c(a.imported, r, "imported", t, 1), r
	}
	function ky(e, t = null) {
		let r = {type: "ImportExpression", source: e, options: t},
			a = I.ImportExpression
		return c(a.source, r, "source", e, 1), c(a.options, r, "options", t, 1), r
	}
	function Uy(e, t) {
		let r = {type: "MetaProperty", meta: e, property: t},
			a = I.MetaProperty
		return c(a.meta, r, "meta", e, 1), c(a.property, r, "property", t, 1), r
	}
	function Gy(e = "method", t, r, a, n = !1, i = !1, l = !1, d = !1) {
		let S = {
				type: "ClassMethod",
				kind: e,
				key: t,
				params: r,
				body: a,
				computed: n,
				static: i,
				generator: l,
				async: d,
			},
			g = I.ClassMethod
		return (
			c(g.kind, S, "kind", e),
			c(g.key, S, "key", t, 1),
			c(g.params, S, "params", r, 1),
			c(g.body, S, "body", a, 1),
			c(g.computed, S, "computed", n),
			c(g.static, S, "static", i),
			c(g.generator, S, "generator", l),
			c(g.async, S, "async", d),
			S
		)
	}
	function qy(e) {
		let t = {type: "ObjectPattern", properties: e},
			r = I.ObjectPattern
		return c(r.properties, t, "properties", e, 1), t
	}
	function Eu(e) {
		let t = {type: "SpreadElement", argument: e},
			r = I.SpreadElement
		return c(r.argument, t, "argument", e, 1), t
	}
	function Hy() {
		return {type: "Super"}
	}
	function jy(e, t) {
		let r = {type: "TaggedTemplateExpression", tag: e, quasi: t},
			a = I.TaggedTemplateExpression
		return c(a.tag, r, "tag", e, 1), c(a.quasi, r, "quasi", t, 1), r
	}
	function Yy(e, t = !1) {
		let r = {type: "TemplateElement", value: e, tail: t},
			a = I.TemplateElement
		return c(a.value, r, "value", e), c(a.tail, r, "tail", t), r
	}
	function Vy(e, t) {
		let r = {type: "TemplateLiteral", quasis: e, expressions: t},
			a = I.TemplateLiteral
		return (
			c(a.quasis, r, "quasis", e, 1),
			c(a.expressions, r, "expressions", t, 1),
			r
		)
	}
	function Ky(e = null, t = !1) {
		let r = {type: "YieldExpression", argument: e, delegate: t},
			a = I.YieldExpression
		return (
			c(a.argument, r, "argument", e, 1), c(a.delegate, r, "delegate", t), r
		)
	}
	function Xy(e) {
		let t = {type: "AwaitExpression", argument: e},
			r = I.AwaitExpression
		return c(r.argument, t, "argument", e, 1), t
	}
	function Jy() {
		return {type: "Import"}
	}
	function Wy(e) {
		let t = {type: "BigIntLiteral", value: e},
			r = I.BigIntLiteral
		return c(r.value, t, "value", e), t
	}
	function Qy(e) {
		let t = {type: "ExportNamespaceSpecifier", exported: e},
			r = I.ExportNamespaceSpecifier
		return c(r.exported, t, "exported", e, 1), t
	}
	function $y(e, t, r = !1, a) {
		let n = {
				type: "OptionalMemberExpression",
				object: e,
				property: t,
				computed: r,
				optional: a,
			},
			i = I.OptionalMemberExpression
		return (
			c(i.object, n, "object", e, 1),
			c(i.property, n, "property", t, 1),
			c(i.computed, n, "computed", r),
			c(i.optional, n, "optional", a),
			n
		)
	}
	function zy(e, t, r) {
		let a = {
				type: "OptionalCallExpression",
				callee: e,
				arguments: t,
				optional: r,
			},
			n = I.OptionalCallExpression
		return (
			c(n.callee, a, "callee", e, 1),
			c(n.arguments, a, "arguments", t, 1),
			c(n.optional, a, "optional", r),
			a
		)
	}
	function Zy(e, t = null, r = null, a = null, n = !1, i = !1) {
		let l = {
				type: "ClassProperty",
				key: e,
				value: t,
				typeAnnotation: r,
				decorators: a,
				computed: n,
				static: i,
			},
			d = I.ClassProperty
		return (
			c(d.key, l, "key", e, 1),
			c(d.value, l, "value", t, 1),
			c(d.typeAnnotation, l, "typeAnnotation", r, 1),
			c(d.decorators, l, "decorators", a, 1),
			c(d.computed, l, "computed", n),
			c(d.static, l, "static", i),
			l
		)
	}
	function eS(e, t = null, r = null, a = null, n = !1, i = !1) {
		let l = {
				type: "ClassAccessorProperty",
				key: e,
				value: t,
				typeAnnotation: r,
				decorators: a,
				computed: n,
				static: i,
			},
			d = I.ClassAccessorProperty
		return (
			c(d.key, l, "key", e, 1),
			c(d.value, l, "value", t, 1),
			c(d.typeAnnotation, l, "typeAnnotation", r, 1),
			c(d.decorators, l, "decorators", a, 1),
			c(d.computed, l, "computed", n),
			c(d.static, l, "static", i),
			l
		)
	}
	function tS(e, t = null, r = null, a = !1) {
		let n = {
				type: "ClassPrivateProperty",
				key: e,
				value: t,
				decorators: r,
				static: a,
			},
			i = I.ClassPrivateProperty
		return (
			c(i.key, n, "key", e, 1),
			c(i.value, n, "value", t, 1),
			c(i.decorators, n, "decorators", r, 1),
			c(i.static, n, "static", a),
			n
		)
	}
	function rS(e = "method", t, r, a, n = !1) {
		let i = {
				type: "ClassPrivateMethod",
				kind: e,
				key: t,
				params: r,
				body: a,
				static: n,
			},
			l = I.ClassPrivateMethod
		return (
			c(l.kind, i, "kind", e),
			c(l.key, i, "key", t, 1),
			c(l.params, i, "params", r, 1),
			c(l.body, i, "body", a, 1),
			c(l.static, i, "static", n),
			i
		)
	}
	function aS(e) {
		let t = {type: "PrivateName", id: e},
			r = I.PrivateName
		return c(r.id, t, "id", e, 1), t
	}
	function nS(e) {
		let t = {type: "StaticBlock", body: e},
			r = I.StaticBlock
		return c(r.body, t, "body", e, 1), t
	}
	function sS(e, t) {
		let r = {type: "ImportAttribute", key: e, value: t},
			a = I.ImportAttribute
		return c(a.key, r, "key", e, 1), c(a.value, r, "value", t, 1), r
	}
	function iS() {
		return {type: "AnyTypeAnnotation"}
	}
	function uS(e) {
		let t = {type: "ArrayTypeAnnotation", elementType: e},
			r = I.ArrayTypeAnnotation
		return c(r.elementType, t, "elementType", e, 1), t
	}
	function oS() {
		return {type: "BooleanTypeAnnotation"}
	}
	function lS(e) {
		let t = {type: "BooleanLiteralTypeAnnotation", value: e},
			r = I.BooleanLiteralTypeAnnotation
		return c(r.value, t, "value", e), t
	}
	function cS() {
		return {type: "NullLiteralTypeAnnotation"}
	}
	function dS(e, t = null) {
		let r = {type: "ClassImplements", id: e, typeParameters: t},
			a = I.ClassImplements
		return (
			c(a.id, r, "id", e, 1),
			c(a.typeParameters, r, "typeParameters", t, 1),
			r
		)
	}
	function pS(e, t = null, r = null, a) {
		let n = {
				type: "DeclareClass",
				id: e,
				typeParameters: t,
				extends: r,
				body: a,
			},
			i = I.DeclareClass
		return (
			c(i.id, n, "id", e, 1),
			c(i.typeParameters, n, "typeParameters", t, 1),
			c(i.extends, n, "extends", r, 1),
			c(i.body, n, "body", a, 1),
			n
		)
	}
	function fS(e) {
		let t = {type: "DeclareFunction", id: e},
			r = I.DeclareFunction
		return c(r.id, t, "id", e, 1), t
	}
	function TS(e, t = null, r = null, a) {
		let n = {
				type: "DeclareInterface",
				id: e,
				typeParameters: t,
				extends: r,
				body: a,
			},
			i = I.DeclareInterface
		return (
			c(i.id, n, "id", e, 1),
			c(i.typeParameters, n, "typeParameters", t, 1),
			c(i.extends, n, "extends", r, 1),
			c(i.body, n, "body", a, 1),
			n
		)
	}
	function mS(e, t, r = null) {
		let a = {type: "DeclareModule", id: e, body: t, kind: r},
			n = I.DeclareModule
		return (
			c(n.id, a, "id", e, 1),
			c(n.body, a, "body", t, 1),
			c(n.kind, a, "kind", r),
			a
		)
	}
	function ES(e) {
		let t = {type: "DeclareModuleExports", typeAnnotation: e},
			r = I.DeclareModuleExports
		return c(r.typeAnnotation, t, "typeAnnotation", e, 1), t
	}
	function yS(e, t = null, r) {
		let a = {type: "DeclareTypeAlias", id: e, typeParameters: t, right: r},
			n = I.DeclareTypeAlias
		return (
			c(n.id, a, "id", e, 1),
			c(n.typeParameters, a, "typeParameters", t, 1),
			c(n.right, a, "right", r, 1),
			a
		)
	}
	function SS(e, t = null, r = null) {
		let a = {
				type: "DeclareOpaqueType",
				id: e,
				typeParameters: t,
				supertype: r,
			},
			n = I.DeclareOpaqueType
		return (
			c(n.id, a, "id", e, 1),
			c(n.typeParameters, a, "typeParameters", t, 1),
			c(n.supertype, a, "supertype", r, 1),
			a
		)
	}
	function bS(e) {
		let t = {type: "DeclareVariable", id: e},
			r = I.DeclareVariable
		return c(r.id, t, "id", e, 1), t
	}
	function AS(e = null, t = null, r = null, a = null) {
		let n = {
				type: "DeclareExportDeclaration",
				declaration: e,
				specifiers: t,
				source: r,
				attributes: a,
			},
			i = I.DeclareExportDeclaration
		return (
			c(i.declaration, n, "declaration", e, 1),
			c(i.specifiers, n, "specifiers", t, 1),
			c(i.source, n, "source", r, 1),
			c(i.attributes, n, "attributes", a, 1),
			n
		)
	}
	function hS(e, t = null) {
		let r = {type: "DeclareExportAllDeclaration", source: e, attributes: t},
			a = I.DeclareExportAllDeclaration
		return (
			c(a.source, r, "source", e, 1),
			c(a.attributes, r, "attributes", t, 1),
			r
		)
	}
	function _S(e) {
		let t = {type: "DeclaredPredicate", value: e},
			r = I.DeclaredPredicate
		return c(r.value, t, "value", e, 1), t
	}
	function IS() {
		return {type: "ExistsTypeAnnotation"}
	}
	function gS(e = null, t, r = null, a) {
		let n = {
				type: "FunctionTypeAnnotation",
				typeParameters: e,
				params: t,
				rest: r,
				returnType: a,
			},
			i = I.FunctionTypeAnnotation
		return (
			c(i.typeParameters, n, "typeParameters", e, 1),
			c(i.params, n, "params", t, 1),
			c(i.rest, n, "rest", r, 1),
			c(i.returnType, n, "returnType", a, 1),
			n
		)
	}
	function DS(e = null, t) {
		let r = {type: "FunctionTypeParam", name: e, typeAnnotation: t},
			a = I.FunctionTypeParam
		return (
			c(a.name, r, "name", e, 1),
			c(a.typeAnnotation, r, "typeAnnotation", t, 1),
			r
		)
	}
	function xS(e, t = null) {
		let r = {type: "GenericTypeAnnotation", id: e, typeParameters: t},
			a = I.GenericTypeAnnotation
		return (
			c(a.id, r, "id", e, 1),
			c(a.typeParameters, r, "typeParameters", t, 1),
			r
		)
	}
	function NS() {
		return {type: "InferredPredicate"}
	}
	function OS(e, t = null) {
		let r = {type: "InterfaceExtends", id: e, typeParameters: t},
			a = I.InterfaceExtends
		return (
			c(a.id, r, "id", e, 1),
			c(a.typeParameters, r, "typeParameters", t, 1),
			r
		)
	}
	function PS(e, t = null, r = null, a) {
		let n = {
				type: "InterfaceDeclaration",
				id: e,
				typeParameters: t,
				extends: r,
				body: a,
			},
			i = I.InterfaceDeclaration
		return (
			c(i.id, n, "id", e, 1),
			c(i.typeParameters, n, "typeParameters", t, 1),
			c(i.extends, n, "extends", r, 1),
			c(i.body, n, "body", a, 1),
			n
		)
	}
	function CS(e = null, t) {
		let r = {type: "InterfaceTypeAnnotation", extends: e, body: t},
			a = I.InterfaceTypeAnnotation
		return c(a.extends, r, "extends", e, 1), c(a.body, r, "body", t, 1), r
	}
	function LS(e) {
		let t = {type: "IntersectionTypeAnnotation", types: e},
			r = I.IntersectionTypeAnnotation
		return c(r.types, t, "types", e, 1), t
	}
	function vS() {
		return {type: "MixedTypeAnnotation"}
	}
	function RS() {
		return {type: "EmptyTypeAnnotation"}
	}
	function MS(e) {
		let t = {type: "NullableTypeAnnotation", typeAnnotation: e},
			r = I.NullableTypeAnnotation
		return c(r.typeAnnotation, t, "typeAnnotation", e, 1), t
	}
	function BS(e) {
		let t = {type: "NumberLiteralTypeAnnotation", value: e},
			r = I.NumberLiteralTypeAnnotation
		return c(r.value, t, "value", e), t
	}
	function wS() {
		return {type: "NumberTypeAnnotation"}
	}
	function FS(e, t = [], r = [], a = [], n = !1) {
		let i = {
				type: "ObjectTypeAnnotation",
				properties: e,
				indexers: t,
				callProperties: r,
				internalSlots: a,
				exact: n,
			},
			l = I.ObjectTypeAnnotation
		return (
			c(l.properties, i, "properties", e, 1),
			c(l.indexers, i, "indexers", t, 1),
			c(l.callProperties, i, "callProperties", r, 1),
			c(l.internalSlots, i, "internalSlots", a, 1),
			c(l.exact, i, "exact", n),
			i
		)
	}
	function kS(e, t, r, a, n) {
		let i = {
				type: "ObjectTypeInternalSlot",
				id: e,
				value: t,
				optional: r,
				static: a,
				method: n,
			},
			l = I.ObjectTypeInternalSlot
		return (
			c(l.id, i, "id", e, 1),
			c(l.value, i, "value", t, 1),
			c(l.optional, i, "optional", r),
			c(l.static, i, "static", a),
			c(l.method, i, "method", n),
			i
		)
	}
	function US(e) {
		let t = {type: "ObjectTypeCallProperty", value: e, static: null},
			r = I.ObjectTypeCallProperty
		return c(r.value, t, "value", e, 1), t
	}
	function GS(e = null, t, r, a = null) {
		let n = {
				type: "ObjectTypeIndexer",
				id: e,
				key: t,
				value: r,
				variance: a,
				static: null,
			},
			i = I.ObjectTypeIndexer
		return (
			c(i.id, n, "id", e, 1),
			c(i.key, n, "key", t, 1),
			c(i.value, n, "value", r, 1),
			c(i.variance, n, "variance", a, 1),
			n
		)
	}
	function qS(e, t, r = null) {
		let a = {
				type: "ObjectTypeProperty",
				key: e,
				value: t,
				variance: r,
				kind: null,
				method: null,
				optional: null,
				proto: null,
				static: null,
			},
			n = I.ObjectTypeProperty
		return (
			c(n.key, a, "key", e, 1),
			c(n.value, a, "value", t, 1),
			c(n.variance, a, "variance", r, 1),
			a
		)
	}
	function HS(e) {
		let t = {type: "ObjectTypeSpreadProperty", argument: e},
			r = I.ObjectTypeSpreadProperty
		return c(r.argument, t, "argument", e, 1), t
	}
	function jS(e, t = null, r = null, a) {
		let n = {
				type: "OpaqueType",
				id: e,
				typeParameters: t,
				supertype: r,
				impltype: a,
			},
			i = I.OpaqueType
		return (
			c(i.id, n, "id", e, 1),
			c(i.typeParameters, n, "typeParameters", t, 1),
			c(i.supertype, n, "supertype", r, 1),
			c(i.impltype, n, "impltype", a, 1),
			n
		)
	}
	function YS(e, t) {
		let r = {type: "QualifiedTypeIdentifier", id: e, qualification: t},
			a = I.QualifiedTypeIdentifier
		return (
			c(a.id, r, "id", e, 1), c(a.qualification, r, "qualification", t, 1), r
		)
	}
	function VS(e) {
		let t = {type: "StringLiteralTypeAnnotation", value: e},
			r = I.StringLiteralTypeAnnotation
		return c(r.value, t, "value", e), t
	}
	function KS() {
		return {type: "StringTypeAnnotation"}
	}
	function XS() {
		return {type: "SymbolTypeAnnotation"}
	}
	function JS() {
		return {type: "ThisTypeAnnotation"}
	}
	function WS(e) {
		let t = {type: "TupleTypeAnnotation", types: e},
			r = I.TupleTypeAnnotation
		return c(r.types, t, "types", e, 1), t
	}
	function QS(e) {
		let t = {type: "TypeofTypeAnnotation", argument: e},
			r = I.TypeofTypeAnnotation
		return c(r.argument, t, "argument", e, 1), t
	}
	function $S(e, t = null, r) {
		let a = {type: "TypeAlias", id: e, typeParameters: t, right: r},
			n = I.TypeAlias
		return (
			c(n.id, a, "id", e, 1),
			c(n.typeParameters, a, "typeParameters", t, 1),
			c(n.right, a, "right", r, 1),
			a
		)
	}
	function zS(e) {
		let t = {type: "TypeAnnotation", typeAnnotation: e},
			r = I.TypeAnnotation
		return c(r.typeAnnotation, t, "typeAnnotation", e, 1), t
	}
	function ZS(e, t) {
		let r = {type: "TypeCastExpression", expression: e, typeAnnotation: t},
			a = I.TypeCastExpression
		return (
			c(a.expression, r, "expression", e, 1),
			c(a.typeAnnotation, r, "typeAnnotation", t, 1),
			r
		)
	}
	function eb(e = null, t = null, r = null) {
		let a = {
				type: "TypeParameter",
				bound: e,
				default: t,
				variance: r,
				name: null,
			},
			n = I.TypeParameter
		return (
			c(n.bound, a, "bound", e, 1),
			c(n.default, a, "default", t, 1),
			c(n.variance, a, "variance", r, 1),
			a
		)
	}
	function tb(e) {
		let t = {type: "TypeParameterDeclaration", params: e},
			r = I.TypeParameterDeclaration
		return c(r.params, t, "params", e, 1), t
	}
	function rb(e) {
		let t = {type: "TypeParameterInstantiation", params: e},
			r = I.TypeParameterInstantiation
		return c(r.params, t, "params", e, 1), t
	}
	function ab(e) {
		let t = {type: "UnionTypeAnnotation", types: e},
			r = I.UnionTypeAnnotation
		return c(r.types, t, "types", e, 1), t
	}
	function nb(e) {
		let t = {type: "Variance", kind: e},
			r = I.Variance
		return c(r.kind, t, "kind", e), t
	}
	function sb() {
		return {type: "VoidTypeAnnotation"}
	}
	function ib(e, t) {
		let r = {type: "EnumDeclaration", id: e, body: t},
			a = I.EnumDeclaration
		return c(a.id, r, "id", e, 1), c(a.body, r, "body", t, 1), r
	}
	function ub(e) {
		let t = {
				type: "EnumBooleanBody",
				members: e,
				explicitType: null,
				hasUnknownMembers: null,
			},
			r = I.EnumBooleanBody
		return c(r.members, t, "members", e, 1), t
	}
	function ob(e) {
		let t = {
				type: "EnumNumberBody",
				members: e,
				explicitType: null,
				hasUnknownMembers: null,
			},
			r = I.EnumNumberBody
		return c(r.members, t, "members", e, 1), t
	}
	function lb(e) {
		let t = {
				type: "EnumStringBody",
				members: e,
				explicitType: null,
				hasUnknownMembers: null,
			},
			r = I.EnumStringBody
		return c(r.members, t, "members", e, 1), t
	}
	function cb(e) {
		let t = {type: "EnumSymbolBody", members: e, hasUnknownMembers: null},
			r = I.EnumSymbolBody
		return c(r.members, t, "members", e, 1), t
	}
	function db(e) {
		let t = {type: "EnumBooleanMember", id: e, init: null},
			r = I.EnumBooleanMember
		return c(r.id, t, "id", e, 1), t
	}
	function pb(e, t) {
		let r = {type: "EnumNumberMember", id: e, init: t},
			a = I.EnumNumberMember
		return c(a.id, r, "id", e, 1), c(a.init, r, "init", t, 1), r
	}
	function fb(e, t) {
		let r = {type: "EnumStringMember", id: e, init: t},
			a = I.EnumStringMember
		return c(a.id, r, "id", e, 1), c(a.init, r, "init", t, 1), r
	}
	function Tb(e) {
		let t = {type: "EnumDefaultedMember", id: e},
			r = I.EnumDefaultedMember
		return c(r.id, t, "id", e, 1), t
	}
	function mb(e, t) {
		let r = {type: "IndexedAccessType", objectType: e, indexType: t},
			a = I.IndexedAccessType
		return (
			c(a.objectType, r, "objectType", e, 1),
			c(a.indexType, r, "indexType", t, 1),
			r
		)
	}
	function Eb(e, t) {
		let r = {
				type: "OptionalIndexedAccessType",
				objectType: e,
				indexType: t,
				optional: null,
			},
			a = I.OptionalIndexedAccessType
		return (
			c(a.objectType, r, "objectType", e, 1),
			c(a.indexType, r, "indexType", t, 1),
			r
		)
	}
	function yb(e, t = null) {
		let r = {type: "JSXAttribute", name: e, value: t},
			a = I.JSXAttribute
		return c(a.name, r, "name", e, 1), c(a.value, r, "value", t, 1), r
	}
	function Sb(e) {
		let t = {type: "JSXClosingElement", name: e},
			r = I.JSXClosingElement
		return c(r.name, t, "name", e, 1), t
	}
	function bb(e, t = null, r, a = null) {
		let n = {
				type: "JSXElement",
				openingElement: e,
				closingElement: t,
				children: r,
				selfClosing: a,
			},
			i = I.JSXElement
		return (
			c(i.openingElement, n, "openingElement", e, 1),
			c(i.closingElement, n, "closingElement", t, 1),
			c(i.children, n, "children", r, 1),
			c(i.selfClosing, n, "selfClosing", a),
			n
		)
	}
	function Ab() {
		return {type: "JSXEmptyExpression"}
	}
	function hb(e) {
		let t = {type: "JSXExpressionContainer", expression: e},
			r = I.JSXExpressionContainer
		return c(r.expression, t, "expression", e, 1), t
	}
	function _b(e) {
		let t = {type: "JSXSpreadChild", expression: e},
			r = I.JSXSpreadChild
		return c(r.expression, t, "expression", e, 1), t
	}
	function Ib(e) {
		let t = {type: "JSXIdentifier", name: e},
			r = I.JSXIdentifier
		return c(r.name, t, "name", e), t
	}
	function gb(e, t) {
		let r = {type: "JSXMemberExpression", object: e, property: t},
			a = I.JSXMemberExpression
		return (
			c(a.object, r, "object", e, 1), c(a.property, r, "property", t, 1), r
		)
	}
	function Db(e, t) {
		let r = {type: "JSXNamespacedName", namespace: e, name: t},
			a = I.JSXNamespacedName
		return c(a.namespace, r, "namespace", e, 1), c(a.name, r, "name", t, 1), r
	}
	function xb(e, t, r = !1) {
		let a = {
				type: "JSXOpeningElement",
				name: e,
				attributes: t,
				selfClosing: r,
			},
			n = I.JSXOpeningElement
		return (
			c(n.name, a, "name", e, 1),
			c(n.attributes, a, "attributes", t, 1),
			c(n.selfClosing, a, "selfClosing", r),
			a
		)
	}
	function Nb(e) {
		let t = {type: "JSXSpreadAttribute", argument: e},
			r = I.JSXSpreadAttribute
		return c(r.argument, t, "argument", e, 1), t
	}
	function Ob(e) {
		let t = {type: "JSXText", value: e},
			r = I.JSXText
		return c(r.value, t, "value", e), t
	}
	function Pb(e, t, r) {
		let a = {
				type: "JSXFragment",
				openingFragment: e,
				closingFragment: t,
				children: r,
			},
			n = I.JSXFragment
		return (
			c(n.openingFragment, a, "openingFragment", e, 1),
			c(n.closingFragment, a, "closingFragment", t, 1),
			c(n.children, a, "children", r, 1),
			a
		)
	}
	function Cb() {
		return {type: "JSXOpeningFragment"}
	}
	function Lb() {
		return {type: "JSXClosingFragment"}
	}
	function vb() {
		return {type: "Noop"}
	}
	function Rb(e, t) {
		let r = {type: "Placeholder", expectedNode: e, name: t},
			a = I.Placeholder
		return (
			c(a.expectedNode, r, "expectedNode", e), c(a.name, r, "name", t, 1), r
		)
	}
	function Mb(e) {
		let t = {type: "V8IntrinsicIdentifier", name: e},
			r = I.V8IntrinsicIdentifier
		return c(r.name, t, "name", e), t
	}
	function Bb() {
		return {type: "ArgumentPlaceholder"}
	}
	function wb(e, t) {
		let r = {type: "BindExpression", object: e, callee: t},
			a = I.BindExpression
		return c(a.object, r, "object", e, 1), c(a.callee, r, "callee", t, 1), r
	}
	function Fb(e) {
		let t = {type: "Decorator", expression: e},
			r = I.Decorator
		return c(r.expression, t, "expression", e, 1), t
	}
	function kb(e, t = !1) {
		let r = {type: "DoExpression", body: e, async: t},
			a = I.DoExpression
		return c(a.body, r, "body", e, 1), c(a.async, r, "async", t), r
	}
	function Ub(e) {
		let t = {type: "ExportDefaultSpecifier", exported: e},
			r = I.ExportDefaultSpecifier
		return c(r.exported, t, "exported", e, 1), t
	}
	function Gb(e) {
		let t = {type: "RecordExpression", properties: e},
			r = I.RecordExpression
		return c(r.properties, t, "properties", e, 1), t
	}
	function qb(e = []) {
		let t = {type: "TupleExpression", elements: e},
			r = I.TupleExpression
		return c(r.elements, t, "elements", e, 1), t
	}
	function Hb(e) {
		let t = {type: "DecimalLiteral", value: e},
			r = I.DecimalLiteral
		return c(r.value, t, "value", e), t
	}
	function jb(e) {
		let t = {type: "ModuleExpression", body: e},
			r = I.ModuleExpression
		return c(r.body, t, "body", e, 1), t
	}
	function Yb() {
		return {type: "TopicReference"}
	}
	function Vb(e) {
		let t = {type: "PipelineTopicExpression", expression: e},
			r = I.PipelineTopicExpression
		return c(r.expression, t, "expression", e, 1), t
	}
	function Kb(e) {
		let t = {type: "PipelineBareFunction", callee: e},
			r = I.PipelineBareFunction
		return c(r.callee, t, "callee", e, 1), t
	}
	function Xb() {
		return {type: "PipelinePrimaryTopicReference"}
	}
	function Jb(e) {
		let t = {type: "TSParameterProperty", parameter: e},
			r = I.TSParameterProperty
		return c(r.parameter, t, "parameter", e, 1), t
	}
	function Wb(e = null, t = null, r, a = null) {
		let n = {
				type: "TSDeclareFunction",
				id: e,
				typeParameters: t,
				params: r,
				returnType: a,
			},
			i = I.TSDeclareFunction
		return (
			c(i.id, n, "id", e, 1),
			c(i.typeParameters, n, "typeParameters", t, 1),
			c(i.params, n, "params", r, 1),
			c(i.returnType, n, "returnType", a, 1),
			n
		)
	}
	function Qb(e = null, t, r = null, a, n = null) {
		let i = {
				type: "TSDeclareMethod",
				decorators: e,
				key: t,
				typeParameters: r,
				params: a,
				returnType: n,
			},
			l = I.TSDeclareMethod
		return (
			c(l.decorators, i, "decorators", e, 1),
			c(l.key, i, "key", t, 1),
			c(l.typeParameters, i, "typeParameters", r, 1),
			c(l.params, i, "params", a, 1),
			c(l.returnType, i, "returnType", n, 1),
			i
		)
	}
	function $b(e, t) {
		let r = {type: "TSQualifiedName", left: e, right: t},
			a = I.TSQualifiedName
		return c(a.left, r, "left", e, 1), c(a.right, r, "right", t, 1), r
	}
	function zb(e = null, t, r = null) {
		let a = {
				type: "TSCallSignatureDeclaration",
				typeParameters: e,
				parameters: t,
				typeAnnotation: r,
			},
			n = I.TSCallSignatureDeclaration
		return (
			c(n.typeParameters, a, "typeParameters", e, 1),
			c(n.parameters, a, "parameters", t, 1),
			c(n.typeAnnotation, a, "typeAnnotation", r, 1),
			a
		)
	}
	function Zb(e = null, t, r = null) {
		let a = {
				type: "TSConstructSignatureDeclaration",
				typeParameters: e,
				parameters: t,
				typeAnnotation: r,
			},
			n = I.TSConstructSignatureDeclaration
		return (
			c(n.typeParameters, a, "typeParameters", e, 1),
			c(n.parameters, a, "parameters", t, 1),
			c(n.typeAnnotation, a, "typeAnnotation", r, 1),
			a
		)
	}
	function eA(e, t = null) {
		let r = {type: "TSPropertySignature", key: e, typeAnnotation: t},
			a = I.TSPropertySignature
		return (
			c(a.key, r, "key", e, 1),
			c(a.typeAnnotation, r, "typeAnnotation", t, 1),
			r
		)
	}
	function tA(e, t = null, r, a = null) {
		let n = {
				type: "TSMethodSignature",
				key: e,
				typeParameters: t,
				parameters: r,
				typeAnnotation: a,
				kind: null,
			},
			i = I.TSMethodSignature
		return (
			c(i.key, n, "key", e, 1),
			c(i.typeParameters, n, "typeParameters", t, 1),
			c(i.parameters, n, "parameters", r, 1),
			c(i.typeAnnotation, n, "typeAnnotation", a, 1),
			n
		)
	}
	function rA(e, t = null) {
		let r = {type: "TSIndexSignature", parameters: e, typeAnnotation: t},
			a = I.TSIndexSignature
		return (
			c(a.parameters, r, "parameters", e, 1),
			c(a.typeAnnotation, r, "typeAnnotation", t, 1),
			r
		)
	}
	function aA() {
		return {type: "TSAnyKeyword"}
	}
	function nA() {
		return {type: "TSBooleanKeyword"}
	}
	function sA() {
		return {type: "TSBigIntKeyword"}
	}
	function iA() {
		return {type: "TSIntrinsicKeyword"}
	}
	function uA() {
		return {type: "TSNeverKeyword"}
	}
	function oA() {
		return {type: "TSNullKeyword"}
	}
	function lA() {
		return {type: "TSNumberKeyword"}
	}
	function cA() {
		return {type: "TSObjectKeyword"}
	}
	function dA() {
		return {type: "TSStringKeyword"}
	}
	function pA() {
		return {type: "TSSymbolKeyword"}
	}
	function fA() {
		return {type: "TSUndefinedKeyword"}
	}
	function TA() {
		return {type: "TSUnknownKeyword"}
	}
	function mA() {
		return {type: "TSVoidKeyword"}
	}
	function EA() {
		return {type: "TSThisType"}
	}
	function yA(e = null, t, r = null) {
		let a = {
				type: "TSFunctionType",
				typeParameters: e,
				parameters: t,
				typeAnnotation: r,
			},
			n = I.TSFunctionType
		return (
			c(n.typeParameters, a, "typeParameters", e, 1),
			c(n.parameters, a, "parameters", t, 1),
			c(n.typeAnnotation, a, "typeAnnotation", r, 1),
			a
		)
	}
	function SA(e = null, t, r = null) {
		let a = {
				type: "TSConstructorType",
				typeParameters: e,
				parameters: t,
				typeAnnotation: r,
			},
			n = I.TSConstructorType
		return (
			c(n.typeParameters, a, "typeParameters", e, 1),
			c(n.parameters, a, "parameters", t, 1),
			c(n.typeAnnotation, a, "typeAnnotation", r, 1),
			a
		)
	}
	function bA(e, t = null) {
		let r = {type: "TSTypeReference", typeName: e, typeParameters: t},
			a = I.TSTypeReference
		return (
			c(a.typeName, r, "typeName", e, 1),
			c(a.typeParameters, r, "typeParameters", t, 1),
			r
		)
	}
	function AA(e, t = null, r = null) {
		let a = {
				type: "TSTypePredicate",
				parameterName: e,
				typeAnnotation: t,
				asserts: r,
			},
			n = I.TSTypePredicate
		return (
			c(n.parameterName, a, "parameterName", e, 1),
			c(n.typeAnnotation, a, "typeAnnotation", t, 1),
			c(n.asserts, a, "asserts", r),
			a
		)
	}
	function hA(e, t = null) {
		let r = {type: "TSTypeQuery", exprName: e, typeParameters: t},
			a = I.TSTypeQuery
		return (
			c(a.exprName, r, "exprName", e, 1),
			c(a.typeParameters, r, "typeParameters", t, 1),
			r
		)
	}
	function _A(e) {
		let t = {type: "TSTypeLiteral", members: e},
			r = I.TSTypeLiteral
		return c(r.members, t, "members", e, 1), t
	}
	function IA(e) {
		let t = {type: "TSArrayType", elementType: e},
			r = I.TSArrayType
		return c(r.elementType, t, "elementType", e, 1), t
	}
	function gA(e) {
		let t = {type: "TSTupleType", elementTypes: e},
			r = I.TSTupleType
		return c(r.elementTypes, t, "elementTypes", e, 1), t
	}
	function DA(e) {
		let t = {type: "TSOptionalType", typeAnnotation: e},
			r = I.TSOptionalType
		return c(r.typeAnnotation, t, "typeAnnotation", e, 1), t
	}
	function xA(e) {
		let t = {type: "TSRestType", typeAnnotation: e},
			r = I.TSRestType
		return c(r.typeAnnotation, t, "typeAnnotation", e, 1), t
	}
	function NA(e, t, r = !1) {
		let a = {
				type: "TSNamedTupleMember",
				label: e,
				elementType: t,
				optional: r,
			},
			n = I.TSNamedTupleMember
		return (
			c(n.label, a, "label", e, 1),
			c(n.elementType, a, "elementType", t, 1),
			c(n.optional, a, "optional", r),
			a
		)
	}
	function OA(e) {
		let t = {type: "TSUnionType", types: e},
			r = I.TSUnionType
		return c(r.types, t, "types", e, 1), t
	}
	function PA(e) {
		let t = {type: "TSIntersectionType", types: e},
			r = I.TSIntersectionType
		return c(r.types, t, "types", e, 1), t
	}
	function CA(e, t, r, a) {
		let n = {
				type: "TSConditionalType",
				checkType: e,
				extendsType: t,
				trueType: r,
				falseType: a,
			},
			i = I.TSConditionalType
		return (
			c(i.checkType, n, "checkType", e, 1),
			c(i.extendsType, n, "extendsType", t, 1),
			c(i.trueType, n, "trueType", r, 1),
			c(i.falseType, n, "falseType", a, 1),
			n
		)
	}
	function LA(e) {
		let t = {type: "TSInferType", typeParameter: e},
			r = I.TSInferType
		return c(r.typeParameter, t, "typeParameter", e, 1), t
	}
	function vA(e) {
		let t = {type: "TSParenthesizedType", typeAnnotation: e},
			r = I.TSParenthesizedType
		return c(r.typeAnnotation, t, "typeAnnotation", e, 1), t
	}
	function RA(e) {
		let t = {type: "TSTypeOperator", typeAnnotation: e, operator: null},
			r = I.TSTypeOperator
		return c(r.typeAnnotation, t, "typeAnnotation", e, 1), t
	}
	function MA(e, t) {
		let r = {type: "TSIndexedAccessType", objectType: e, indexType: t},
			a = I.TSIndexedAccessType
		return (
			c(a.objectType, r, "objectType", e, 1),
			c(a.indexType, r, "indexType", t, 1),
			r
		)
	}
	function BA(e, t = null, r = null) {
		let a = {
				type: "TSMappedType",
				typeParameter: e,
				typeAnnotation: t,
				nameType: r,
			},
			n = I.TSMappedType
		return (
			c(n.typeParameter, a, "typeParameter", e, 1),
			c(n.typeAnnotation, a, "typeAnnotation", t, 1),
			c(n.nameType, a, "nameType", r, 1),
			a
		)
	}
	function wA(e, t) {
		let r = {type: "TSTemplateLiteralType", quasis: e, types: t},
			a = I.TSTemplateLiteralType
		return c(a.quasis, r, "quasis", e, 1), c(a.types, r, "types", t, 1), r
	}
	function FA(e) {
		let t = {type: "TSLiteralType", literal: e},
			r = I.TSLiteralType
		return c(r.literal, t, "literal", e, 1), t
	}
	function kA(e, t = null) {
		let r = {
				type: "TSExpressionWithTypeArguments",
				expression: e,
				typeParameters: t,
			},
			a = I.TSExpressionWithTypeArguments
		return (
			c(a.expression, r, "expression", e, 1),
			c(a.typeParameters, r, "typeParameters", t, 1),
			r
		)
	}
	function UA(e, t = null, r = null, a) {
		let n = {
				type: "TSInterfaceDeclaration",
				id: e,
				typeParameters: t,
				extends: r,
				body: a,
			},
			i = I.TSInterfaceDeclaration
		return (
			c(i.id, n, "id", e, 1),
			c(i.typeParameters, n, "typeParameters", t, 1),
			c(i.extends, n, "extends", r, 1),
			c(i.body, n, "body", a, 1),
			n
		)
	}
	function GA(e) {
		let t = {type: "TSInterfaceBody", body: e},
			r = I.TSInterfaceBody
		return c(r.body, t, "body", e, 1), t
	}
	function qA(e, t = null, r) {
		let a = {
				type: "TSTypeAliasDeclaration",
				id: e,
				typeParameters: t,
				typeAnnotation: r,
			},
			n = I.TSTypeAliasDeclaration
		return (
			c(n.id, a, "id", e, 1),
			c(n.typeParameters, a, "typeParameters", t, 1),
			c(n.typeAnnotation, a, "typeAnnotation", r, 1),
			a
		)
	}
	function HA(e, t = null) {
		let r = {
				type: "TSInstantiationExpression",
				expression: e,
				typeParameters: t,
			},
			a = I.TSInstantiationExpression
		return (
			c(a.expression, r, "expression", e, 1),
			c(a.typeParameters, r, "typeParameters", t, 1),
			r
		)
	}
	function jA(e, t) {
		let r = {type: "TSAsExpression", expression: e, typeAnnotation: t},
			a = I.TSAsExpression
		return (
			c(a.expression, r, "expression", e, 1),
			c(a.typeAnnotation, r, "typeAnnotation", t, 1),
			r
		)
	}
	function YA(e, t) {
		let r = {type: "TSSatisfiesExpression", expression: e, typeAnnotation: t},
			a = I.TSSatisfiesExpression
		return (
			c(a.expression, r, "expression", e, 1),
			c(a.typeAnnotation, r, "typeAnnotation", t, 1),
			r
		)
	}
	function VA(e, t) {
		let r = {type: "TSTypeAssertion", typeAnnotation: e, expression: t},
			a = I.TSTypeAssertion
		return (
			c(a.typeAnnotation, r, "typeAnnotation", e, 1),
			c(a.expression, r, "expression", t, 1),
			r
		)
	}
	function KA(e) {
		let t = {type: "TSEnumBody", members: e},
			r = I.TSEnumBody
		return c(r.members, t, "members", e, 1), t
	}
	function XA(e, t) {
		let r = {type: "TSEnumDeclaration", id: e, members: t},
			a = I.TSEnumDeclaration
		return c(a.id, r, "id", e, 1), c(a.members, r, "members", t, 1), r
	}
	function JA(e, t = null) {
		let r = {type: "TSEnumMember", id: e, initializer: t},
			a = I.TSEnumMember
		return c(a.id, r, "id", e, 1), c(a.initializer, r, "initializer", t, 1), r
	}
	function WA(e, t) {
		let r = {type: "TSModuleDeclaration", id: e, body: t, kind: null},
			a = I.TSModuleDeclaration
		return c(a.id, r, "id", e, 1), c(a.body, r, "body", t, 1), r
	}
	function QA(e) {
		let t = {type: "TSModuleBlock", body: e},
			r = I.TSModuleBlock
		return c(r.body, t, "body", e, 1), t
	}
	function $A(e, t = null, r = null) {
		let a = {
				type: "TSImportType",
				argument: e,
				qualifier: t,
				typeParameters: r,
			},
			n = I.TSImportType
		return (
			c(n.argument, a, "argument", e, 1),
			c(n.qualifier, a, "qualifier", t, 1),
			c(n.typeParameters, a, "typeParameters", r, 1),
			a
		)
	}
	function zA(e, t) {
		let r = {
				type: "TSImportEqualsDeclaration",
				id: e,
				moduleReference: t,
				isExport: null,
			},
			a = I.TSImportEqualsDeclaration
		return (
			c(a.id, r, "id", e, 1),
			c(a.moduleReference, r, "moduleReference", t, 1),
			r
		)
	}
	function ZA(e) {
		let t = {type: "TSExternalModuleReference", expression: e},
			r = I.TSExternalModuleReference
		return c(r.expression, t, "expression", e, 1), t
	}
	function eh(e) {
		let t = {type: "TSNonNullExpression", expression: e},
			r = I.TSNonNullExpression
		return c(r.expression, t, "expression", e, 1), t
	}
	function th(e) {
		let t = {type: "TSExportAssignment", expression: e},
			r = I.TSExportAssignment
		return c(r.expression, t, "expression", e, 1), t
	}
	function rh(e) {
		let t = {type: "TSNamespaceExportDeclaration", id: e},
			r = I.TSNamespaceExportDeclaration
		return c(r.id, t, "id", e, 1), t
	}
	function ah(e) {
		let t = {type: "TSTypeAnnotation", typeAnnotation: e},
			r = I.TSTypeAnnotation
		return c(r.typeAnnotation, t, "typeAnnotation", e, 1), t
	}
	function nh(e) {
		let t = {type: "TSTypeParameterInstantiation", params: e},
			r = I.TSTypeParameterInstantiation
		return c(r.params, t, "params", e, 1), t
	}
	function sh(e) {
		let t = {type: "TSTypeParameterDeclaration", params: e},
			r = I.TSTypeParameterDeclaration
		return c(r.params, t, "params", e, 1), t
	}
	function ih(e = null, t = null, r) {
		let a = {type: "TSTypeParameter", constraint: e, default: t, name: r},
			n = I.TSTypeParameter
		return (
			c(n.constraint, a, "constraint", e, 1),
			c(n.default, a, "default", t, 1),
			c(n.name, a, "name", r),
			a
		)
	}
	function uh(e) {
		return (
			(0, Pr.default)("NumberLiteral", "NumericLiteral", "The node type "),
			fu(e)
		)
	}
	function oh(e, t = "") {
		return (
			(0, Pr.default)("RegexLiteral", "RegExpLiteral", "The node type "),
			Tu(e, t)
		)
	}
	function lh(e) {
		return (
			(0, Pr.default)("RestProperty", "RestElement", "The node type "), mu(e)
		)
	}
	function ch(e) {
		return (
			(0, Pr.default)("SpreadProperty", "SpreadElement", "The node type "),
			Eu(e)
		)
	}
})
var yu = v(o => {
	"use strict"
	Object.defineProperty(o, "__esModule", {value: !0})
	o.JSXIdentifier =
		o.JSXFragment =
		o.JSXExpressionContainer =
		o.JSXEmptyExpression =
		o.JSXElement =
		o.JSXClosingFragment =
		o.JSXClosingElement =
		o.JSXAttribute =
		o.IntersectionTypeAnnotation =
		o.InterpreterDirective =
		o.InterfaceTypeAnnotation =
		o.InterfaceExtends =
		o.InterfaceDeclaration =
		o.InferredPredicate =
		o.IndexedAccessType =
		o.ImportSpecifier =
		o.ImportNamespaceSpecifier =
		o.ImportExpression =
		o.ImportDefaultSpecifier =
		o.ImportDeclaration =
		o.ImportAttribute =
		o.Import =
		o.IfStatement =
		o.Identifier =
		o.GenericTypeAnnotation =
		o.FunctionTypeParam =
		o.FunctionTypeAnnotation =
		o.FunctionExpression =
		o.FunctionDeclaration =
		o.ForStatement =
		o.ForOfStatement =
		o.ForInStatement =
		o.File =
		o.ExpressionStatement =
		o.ExportSpecifier =
		o.ExportNamespaceSpecifier =
		o.ExportNamedDeclaration =
		o.ExportDefaultSpecifier =
		o.ExportDefaultDeclaration =
		o.ExportAllDeclaration =
		o.ExistsTypeAnnotation =
		o.EnumSymbolBody =
		o.EnumStringMember =
		o.EnumStringBody =
		o.EnumNumberMember =
		o.EnumNumberBody =
		o.EnumDefaultedMember =
		o.EnumDeclaration =
		o.EnumBooleanMember =
		o.EnumBooleanBody =
		o.EmptyTypeAnnotation =
		o.EmptyStatement =
		o.DoWhileStatement =
		o.DoExpression =
		o.DirectiveLiteral =
		o.Directive =
		o.Decorator =
		o.DeclaredPredicate =
		o.DeclareVariable =
		o.DeclareTypeAlias =
		o.DeclareOpaqueType =
		o.DeclareModuleExports =
		o.DeclareModule =
		o.DeclareInterface =
		o.DeclareFunction =
		o.DeclareExportDeclaration =
		o.DeclareExportAllDeclaration =
		o.DeclareClass =
		o.DecimalLiteral =
		o.DebuggerStatement =
		o.ContinueStatement =
		o.ConditionalExpression =
		o.ClassProperty =
		o.ClassPrivateProperty =
		o.ClassPrivateMethod =
		o.ClassMethod =
		o.ClassImplements =
		o.ClassExpression =
		o.ClassDeclaration =
		o.ClassBody =
		o.ClassAccessorProperty =
		o.CatchClause =
		o.CallExpression =
		o.BreakStatement =
		o.BooleanTypeAnnotation =
		o.BooleanLiteralTypeAnnotation =
		o.BooleanLiteral =
		o.BlockStatement =
		o.BindExpression =
		o.BinaryExpression =
		o.BigIntLiteral =
		o.AwaitExpression =
		o.AssignmentPattern =
		o.AssignmentExpression =
		o.ArrowFunctionExpression =
		o.ArrayTypeAnnotation =
		o.ArrayPattern =
		o.ArrayExpression =
		o.ArgumentPlaceholder =
		o.AnyTypeAnnotation =
			void 0
	o.TSNumberKeyword =
		o.TSNullKeyword =
		o.TSNonNullExpression =
		o.TSNeverKeyword =
		o.TSNamespaceExportDeclaration =
		o.TSNamedTupleMember =
		o.TSModuleDeclaration =
		o.TSModuleBlock =
		o.TSMethodSignature =
		o.TSMappedType =
		o.TSLiteralType =
		o.TSIntrinsicKeyword =
		o.TSIntersectionType =
		o.TSInterfaceDeclaration =
		o.TSInterfaceBody =
		o.TSInstantiationExpression =
		o.TSInferType =
		o.TSIndexedAccessType =
		o.TSIndexSignature =
		o.TSImportType =
		o.TSImportEqualsDeclaration =
		o.TSFunctionType =
		o.TSExternalModuleReference =
		o.TSExpressionWithTypeArguments =
		o.TSExportAssignment =
		o.TSEnumMember =
		o.TSEnumDeclaration =
		o.TSEnumBody =
		o.TSDeclareMethod =
		o.TSDeclareFunction =
		o.TSConstructorType =
		o.TSConstructSignatureDeclaration =
		o.TSConditionalType =
		o.TSCallSignatureDeclaration =
		o.TSBooleanKeyword =
		o.TSBigIntKeyword =
		o.TSAsExpression =
		o.TSArrayType =
		o.TSAnyKeyword =
		o.SymbolTypeAnnotation =
		o.SwitchStatement =
		o.SwitchCase =
		o.Super =
		o.StringTypeAnnotation =
		o.StringLiteralTypeAnnotation =
		o.StringLiteral =
		o.StaticBlock =
		o.SpreadProperty =
		o.SpreadElement =
		o.SequenceExpression =
		o.ReturnStatement =
		o.RestProperty =
		o.RestElement =
		o.RegexLiteral =
		o.RegExpLiteral =
		o.RecordExpression =
		o.QualifiedTypeIdentifier =
		o.Program =
		o.PrivateName =
		o.Placeholder =
		o.PipelineTopicExpression =
		o.PipelinePrimaryTopicReference =
		o.PipelineBareFunction =
		o.ParenthesizedExpression =
		o.OptionalMemberExpression =
		o.OptionalIndexedAccessType =
		o.OptionalCallExpression =
		o.OpaqueType =
		o.ObjectTypeSpreadProperty =
		o.ObjectTypeProperty =
		o.ObjectTypeInternalSlot =
		o.ObjectTypeIndexer =
		o.ObjectTypeCallProperty =
		o.ObjectTypeAnnotation =
		o.ObjectProperty =
		o.ObjectPattern =
		o.ObjectMethod =
		o.ObjectExpression =
		o.NumericLiteral =
		o.NumberTypeAnnotation =
		o.NumberLiteralTypeAnnotation =
		o.NumberLiteral =
		o.NullableTypeAnnotation =
		o.NullLiteralTypeAnnotation =
		o.NullLiteral =
		o.Noop =
		o.NewExpression =
		o.ModuleExpression =
		o.MixedTypeAnnotation =
		o.MetaProperty =
		o.MemberExpression =
		o.LogicalExpression =
		o.LabeledStatement =
		o.JSXText =
		o.JSXSpreadChild =
		o.JSXSpreadAttribute =
		o.JSXOpeningFragment =
		o.JSXOpeningElement =
		o.JSXNamespacedName =
		o.JSXMemberExpression =
			void 0
	o.YieldExpression =
		o.WithStatement =
		o.WhileStatement =
		o.VoidTypeAnnotation =
		o.Variance =
		o.VariableDeclarator =
		o.VariableDeclaration =
		o.V8IntrinsicIdentifier =
		o.UpdateExpression =
		o.UnionTypeAnnotation =
		o.UnaryExpression =
		o.TypeofTypeAnnotation =
		o.TypeParameterInstantiation =
		o.TypeParameterDeclaration =
		o.TypeParameter =
		o.TypeCastExpression =
		o.TypeAnnotation =
		o.TypeAlias =
		o.TupleTypeAnnotation =
		o.TupleExpression =
		o.TryStatement =
		o.TopicReference =
		o.ThrowStatement =
		o.ThisTypeAnnotation =
		o.ThisExpression =
		o.TemplateLiteral =
		o.TemplateElement =
		o.TaggedTemplateExpression =
		o.TSVoidKeyword =
		o.TSUnknownKeyword =
		o.TSUnionType =
		o.TSUndefinedKeyword =
		o.TSTypeReference =
		o.TSTypeQuery =
		o.TSTypePredicate =
		o.TSTypeParameterInstantiation =
		o.TSTypeParameterDeclaration =
		o.TSTypeParameter =
		o.TSTypeOperator =
		o.TSTypeLiteral =
		o.TSTypeAssertion =
		o.TSTypeAnnotation =
		o.TSTypeAliasDeclaration =
		o.TSTupleType =
		o.TSThisType =
		o.TSTemplateLiteralType =
		o.TSSymbolKeyword =
		o.TSStringKeyword =
		o.TSSatisfiesExpression =
		o.TSRestType =
		o.TSQualifiedName =
		o.TSPropertySignature =
		o.TSParenthesizedType =
		o.TSParameterProperty =
		o.TSOptionalType =
		o.TSObjectKeyword =
			void 0
	var Jt = Qa(),
		gv = St()
	function h(e) {
		return Jt[e]
	}
	var Dv = (o.ArrayExpression = h("arrayExpression")),
		xv = (o.AssignmentExpression = h("assignmentExpression")),
		Nv = (o.BinaryExpression = h("binaryExpression")),
		Ov = (o.InterpreterDirective = h("interpreterDirective")),
		Pv = (o.Directive = h("directive")),
		Cv = (o.DirectiveLiteral = h("directiveLiteral")),
		Lv = (o.BlockStatement = h("blockStatement")),
		vv = (o.BreakStatement = h("breakStatement")),
		Rv = (o.CallExpression = h("callExpression")),
		Mv = (o.CatchClause = h("catchClause")),
		Bv = (o.ConditionalExpression = h("conditionalExpression")),
		wv = (o.ContinueStatement = h("continueStatement")),
		Fv = (o.DebuggerStatement = h("debuggerStatement")),
		kv = (o.DoWhileStatement = h("doWhileStatement")),
		Uv = (o.EmptyStatement = h("emptyStatement")),
		Gv = (o.ExpressionStatement = h("expressionStatement")),
		qv = (o.File = h("file")),
		Hv = (o.ForInStatement = h("forInStatement")),
		jv = (o.ForStatement = h("forStatement")),
		Yv = (o.FunctionDeclaration = h("functionDeclaration")),
		Vv = (o.FunctionExpression = h("functionExpression")),
		Kv = (o.Identifier = h("identifier")),
		Xv = (o.IfStatement = h("ifStatement")),
		Jv = (o.LabeledStatement = h("labeledStatement")),
		Wv = (o.StringLiteral = h("stringLiteral")),
		Qv = (o.NumericLiteral = h("numericLiteral")),
		$v = (o.NullLiteral = h("nullLiteral")),
		zv = (o.BooleanLiteral = h("booleanLiteral")),
		Zv = (o.RegExpLiteral = h("regExpLiteral")),
		eR = (o.LogicalExpression = h("logicalExpression")),
		tR = (o.MemberExpression = h("memberExpression")),
		rR = (o.NewExpression = h("newExpression")),
		aR = (o.Program = h("program")),
		nR = (o.ObjectExpression = h("objectExpression")),
		sR = (o.ObjectMethod = h("objectMethod")),
		iR = (o.ObjectProperty = h("objectProperty")),
		uR = (o.RestElement = h("restElement")),
		oR = (o.ReturnStatement = h("returnStatement")),
		lR = (o.SequenceExpression = h("sequenceExpression")),
		cR = (o.ParenthesizedExpression = h("parenthesizedExpression")),
		dR = (o.SwitchCase = h("switchCase")),
		pR = (o.SwitchStatement = h("switchStatement")),
		fR = (o.ThisExpression = h("thisExpression")),
		TR = (o.ThrowStatement = h("throwStatement")),
		mR = (o.TryStatement = h("tryStatement")),
		ER = (o.UnaryExpression = h("unaryExpression")),
		yR = (o.UpdateExpression = h("updateExpression")),
		SR = (o.VariableDeclaration = h("variableDeclaration")),
		bR = (o.VariableDeclarator = h("variableDeclarator")),
		AR = (o.WhileStatement = h("whileStatement")),
		hR = (o.WithStatement = h("withStatement")),
		_R = (o.AssignmentPattern = h("assignmentPattern")),
		IR = (o.ArrayPattern = h("arrayPattern")),
		gR = (o.ArrowFunctionExpression = h("arrowFunctionExpression")),
		DR = (o.ClassBody = h("classBody")),
		xR = (o.ClassExpression = h("classExpression")),
		NR = (o.ClassDeclaration = h("classDeclaration")),
		OR = (o.ExportAllDeclaration = h("exportAllDeclaration")),
		PR = (o.ExportDefaultDeclaration = h("exportDefaultDeclaration")),
		CR = (o.ExportNamedDeclaration = h("exportNamedDeclaration")),
		LR = (o.ExportSpecifier = h("exportSpecifier")),
		vR = (o.ForOfStatement = h("forOfStatement")),
		RR = (o.ImportDeclaration = h("importDeclaration")),
		MR = (o.ImportDefaultSpecifier = h("importDefaultSpecifier")),
		BR = (o.ImportNamespaceSpecifier = h("importNamespaceSpecifier")),
		wR = (o.ImportSpecifier = h("importSpecifier")),
		FR = (o.ImportExpression = h("importExpression")),
		kR = (o.MetaProperty = h("metaProperty")),
		UR = (o.ClassMethod = h("classMethod")),
		GR = (o.ObjectPattern = h("objectPattern")),
		qR = (o.SpreadElement = h("spreadElement")),
		HR = (o.Super = h("super")),
		jR = (o.TaggedTemplateExpression = h("taggedTemplateExpression")),
		YR = (o.TemplateElement = h("templateElement")),
		VR = (o.TemplateLiteral = h("templateLiteral")),
		KR = (o.YieldExpression = h("yieldExpression")),
		XR = (o.AwaitExpression = h("awaitExpression")),
		JR = (o.Import = h("import")),
		WR = (o.BigIntLiteral = h("bigIntLiteral")),
		QR = (o.ExportNamespaceSpecifier = h("exportNamespaceSpecifier")),
		$R = (o.OptionalMemberExpression = h("optionalMemberExpression")),
		zR = (o.OptionalCallExpression = h("optionalCallExpression")),
		ZR = (o.ClassProperty = h("classProperty")),
		e6 = (o.ClassAccessorProperty = h("classAccessorProperty")),
		t6 = (o.ClassPrivateProperty = h("classPrivateProperty")),
		r6 = (o.ClassPrivateMethod = h("classPrivateMethod")),
		a6 = (o.PrivateName = h("privateName")),
		n6 = (o.StaticBlock = h("staticBlock")),
		s6 = (o.ImportAttribute = h("importAttribute")),
		i6 = (o.AnyTypeAnnotation = h("anyTypeAnnotation")),
		u6 = (o.ArrayTypeAnnotation = h("arrayTypeAnnotation")),
		o6 = (o.BooleanTypeAnnotation = h("booleanTypeAnnotation")),
		l6 = (o.BooleanLiteralTypeAnnotation = h("booleanLiteralTypeAnnotation")),
		c6 = (o.NullLiteralTypeAnnotation = h("nullLiteralTypeAnnotation")),
		d6 = (o.ClassImplements = h("classImplements")),
		p6 = (o.DeclareClass = h("declareClass")),
		f6 = (o.DeclareFunction = h("declareFunction")),
		T6 = (o.DeclareInterface = h("declareInterface")),
		m6 = (o.DeclareModule = h("declareModule")),
		E6 = (o.DeclareModuleExports = h("declareModuleExports")),
		y6 = (o.DeclareTypeAlias = h("declareTypeAlias")),
		S6 = (o.DeclareOpaqueType = h("declareOpaqueType")),
		b6 = (o.DeclareVariable = h("declareVariable")),
		A6 = (o.DeclareExportDeclaration = h("declareExportDeclaration")),
		h6 = (o.DeclareExportAllDeclaration = h("declareExportAllDeclaration")),
		_6 = (o.DeclaredPredicate = h("declaredPredicate")),
		I6 = (o.ExistsTypeAnnotation = h("existsTypeAnnotation")),
		g6 = (o.FunctionTypeAnnotation = h("functionTypeAnnotation")),
		D6 = (o.FunctionTypeParam = h("functionTypeParam")),
		x6 = (o.GenericTypeAnnotation = h("genericTypeAnnotation")),
		N6 = (o.InferredPredicate = h("inferredPredicate")),
		O6 = (o.InterfaceExtends = h("interfaceExtends")),
		P6 = (o.InterfaceDeclaration = h("interfaceDeclaration")),
		C6 = (o.InterfaceTypeAnnotation = h("interfaceTypeAnnotation")),
		L6 = (o.IntersectionTypeAnnotation = h("intersectionTypeAnnotation")),
		v6 = (o.MixedTypeAnnotation = h("mixedTypeAnnotation")),
		R6 = (o.EmptyTypeAnnotation = h("emptyTypeAnnotation")),
		M6 = (o.NullableTypeAnnotation = h("nullableTypeAnnotation")),
		B6 = (o.NumberLiteralTypeAnnotation = h("numberLiteralTypeAnnotation")),
		w6 = (o.NumberTypeAnnotation = h("numberTypeAnnotation")),
		F6 = (o.ObjectTypeAnnotation = h("objectTypeAnnotation")),
		k6 = (o.ObjectTypeInternalSlot = h("objectTypeInternalSlot")),
		U6 = (o.ObjectTypeCallProperty = h("objectTypeCallProperty")),
		G6 = (o.ObjectTypeIndexer = h("objectTypeIndexer")),
		q6 = (o.ObjectTypeProperty = h("objectTypeProperty")),
		H6 = (o.ObjectTypeSpreadProperty = h("objectTypeSpreadProperty")),
		j6 = (o.OpaqueType = h("opaqueType")),
		Y6 = (o.QualifiedTypeIdentifier = h("qualifiedTypeIdentifier")),
		V6 = (o.StringLiteralTypeAnnotation = h("stringLiteralTypeAnnotation")),
		K6 = (o.StringTypeAnnotation = h("stringTypeAnnotation")),
		X6 = (o.SymbolTypeAnnotation = h("symbolTypeAnnotation")),
		J6 = (o.ThisTypeAnnotation = h("thisTypeAnnotation")),
		W6 = (o.TupleTypeAnnotation = h("tupleTypeAnnotation")),
		Q6 = (o.TypeofTypeAnnotation = h("typeofTypeAnnotation")),
		$6 = (o.TypeAlias = h("typeAlias")),
		z6 = (o.TypeAnnotation = h("typeAnnotation")),
		Z6 = (o.TypeCastExpression = h("typeCastExpression")),
		eM = (o.TypeParameter = h("typeParameter")),
		tM = (o.TypeParameterDeclaration = h("typeParameterDeclaration")),
		rM = (o.TypeParameterInstantiation = h("typeParameterInstantiation")),
		aM = (o.UnionTypeAnnotation = h("unionTypeAnnotation")),
		nM = (o.Variance = h("variance")),
		sM = (o.VoidTypeAnnotation = h("voidTypeAnnotation")),
		iM = (o.EnumDeclaration = h("enumDeclaration")),
		uM = (o.EnumBooleanBody = h("enumBooleanBody")),
		oM = (o.EnumNumberBody = h("enumNumberBody")),
		lM = (o.EnumStringBody = h("enumStringBody")),
		cM = (o.EnumSymbolBody = h("enumSymbolBody")),
		dM = (o.EnumBooleanMember = h("enumBooleanMember")),
		pM = (o.EnumNumberMember = h("enumNumberMember")),
		fM = (o.EnumStringMember = h("enumStringMember")),
		TM = (o.EnumDefaultedMember = h("enumDefaultedMember")),
		mM = (o.IndexedAccessType = h("indexedAccessType")),
		EM = (o.OptionalIndexedAccessType = h("optionalIndexedAccessType")),
		yM = (o.JSXAttribute = h("jsxAttribute")),
		SM = (o.JSXClosingElement = h("jsxClosingElement")),
		bM = (o.JSXElement = h("jsxElement")),
		AM = (o.JSXEmptyExpression = h("jsxEmptyExpression")),
		hM = (o.JSXExpressionContainer = h("jsxExpressionContainer")),
		_M = (o.JSXSpreadChild = h("jsxSpreadChild")),
		IM = (o.JSXIdentifier = h("jsxIdentifier")),
		gM = (o.JSXMemberExpression = h("jsxMemberExpression")),
		DM = (o.JSXNamespacedName = h("jsxNamespacedName")),
		xM = (o.JSXOpeningElement = h("jsxOpeningElement")),
		NM = (o.JSXSpreadAttribute = h("jsxSpreadAttribute")),
		OM = (o.JSXText = h("jsxText")),
		PM = (o.JSXFragment = h("jsxFragment")),
		CM = (o.JSXOpeningFragment = h("jsxOpeningFragment")),
		LM = (o.JSXClosingFragment = h("jsxClosingFragment")),
		vM = (o.Noop = h("noop")),
		RM = (o.Placeholder = h("placeholder")),
		MM = (o.V8IntrinsicIdentifier = h("v8IntrinsicIdentifier")),
		BM = (o.ArgumentPlaceholder = h("argumentPlaceholder")),
		wM = (o.BindExpression = h("bindExpression")),
		FM = (o.Decorator = h("decorator")),
		kM = (o.DoExpression = h("doExpression")),
		UM = (o.ExportDefaultSpecifier = h("exportDefaultSpecifier")),
		GM = (o.RecordExpression = h("recordExpression")),
		qM = (o.TupleExpression = h("tupleExpression")),
		HM = (o.DecimalLiteral = h("decimalLiteral")),
		jM = (o.ModuleExpression = h("moduleExpression")),
		YM = (o.TopicReference = h("topicReference")),
		VM = (o.PipelineTopicExpression = h("pipelineTopicExpression")),
		KM = (o.PipelineBareFunction = h("pipelineBareFunction")),
		XM = (o.PipelinePrimaryTopicReference = h(
			"pipelinePrimaryTopicReference"
		)),
		JM = (o.TSParameterProperty = h("tsParameterProperty")),
		WM = (o.TSDeclareFunction = h("tsDeclareFunction")),
		QM = (o.TSDeclareMethod = h("tsDeclareMethod")),
		$M = (o.TSQualifiedName = h("tsQualifiedName")),
		zM = (o.TSCallSignatureDeclaration = h("tsCallSignatureDeclaration")),
		ZM = (o.TSConstructSignatureDeclaration = h(
			"tsConstructSignatureDeclaration"
		)),
		e4 = (o.TSPropertySignature = h("tsPropertySignature")),
		t4 = (o.TSMethodSignature = h("tsMethodSignature")),
		r4 = (o.TSIndexSignature = h("tsIndexSignature")),
		a4 = (o.TSAnyKeyword = h("tsAnyKeyword")),
		n4 = (o.TSBooleanKeyword = h("tsBooleanKeyword")),
		s4 = (o.TSBigIntKeyword = h("tsBigIntKeyword")),
		i4 = (o.TSIntrinsicKeyword = h("tsIntrinsicKeyword")),
		u4 = (o.TSNeverKeyword = h("tsNeverKeyword")),
		o4 = (o.TSNullKeyword = h("tsNullKeyword")),
		l4 = (o.TSNumberKeyword = h("tsNumberKeyword")),
		c4 = (o.TSObjectKeyword = h("tsObjectKeyword")),
		d4 = (o.TSStringKeyword = h("tsStringKeyword")),
		p4 = (o.TSSymbolKeyword = h("tsSymbolKeyword")),
		f4 = (o.TSUndefinedKeyword = h("tsUndefinedKeyword")),
		T4 = (o.TSUnknownKeyword = h("tsUnknownKeyword")),
		m4 = (o.TSVoidKeyword = h("tsVoidKeyword")),
		E4 = (o.TSThisType = h("tsThisType")),
		y4 = (o.TSFunctionType = h("tsFunctionType")),
		S4 = (o.TSConstructorType = h("tsConstructorType")),
		b4 = (o.TSTypeReference = h("tsTypeReference")),
		A4 = (o.TSTypePredicate = h("tsTypePredicate")),
		h4 = (o.TSTypeQuery = h("tsTypeQuery")),
		_4 = (o.TSTypeLiteral = h("tsTypeLiteral")),
		I4 = (o.TSArrayType = h("tsArrayType")),
		g4 = (o.TSTupleType = h("tsTupleType")),
		D4 = (o.TSOptionalType = h("tsOptionalType")),
		x4 = (o.TSRestType = h("tsRestType")),
		N4 = (o.TSNamedTupleMember = h("tsNamedTupleMember")),
		O4 = (o.TSUnionType = h("tsUnionType")),
		P4 = (o.TSIntersectionType = h("tsIntersectionType")),
		C4 = (o.TSConditionalType = h("tsConditionalType")),
		L4 = (o.TSInferType = h("tsInferType")),
		v4 = (o.TSParenthesizedType = h("tsParenthesizedType")),
		R4 = (o.TSTypeOperator = h("tsTypeOperator")),
		M4 = (o.TSIndexedAccessType = h("tsIndexedAccessType")),
		B4 = (o.TSMappedType = h("tsMappedType")),
		w4 = (o.TSTemplateLiteralType = h("tsTemplateLiteralType")),
		F4 = (o.TSLiteralType = h("tsLiteralType")),
		k4 = (o.TSExpressionWithTypeArguments = h(
			"tsExpressionWithTypeArguments"
		)),
		U4 = (o.TSInterfaceDeclaration = h("tsInterfaceDeclaration")),
		G4 = (o.TSInterfaceBody = h("tsInterfaceBody")),
		q4 = (o.TSTypeAliasDeclaration = h("tsTypeAliasDeclaration")),
		H4 = (o.TSInstantiationExpression = h("tsInstantiationExpression")),
		j4 = (o.TSAsExpression = h("tsAsExpression")),
		Y4 = (o.TSSatisfiesExpression = h("tsSatisfiesExpression")),
		V4 = (o.TSTypeAssertion = h("tsTypeAssertion")),
		K4 = (o.TSEnumBody = h("tsEnumBody")),
		X4 = (o.TSEnumDeclaration = h("tsEnumDeclaration")),
		J4 = (o.TSEnumMember = h("tsEnumMember")),
		W4 = (o.TSModuleDeclaration = h("tsModuleDeclaration")),
		Q4 = (o.TSModuleBlock = h("tsModuleBlock")),
		$4 = (o.TSImportType = h("tsImportType")),
		z4 = (o.TSImportEqualsDeclaration = h("tsImportEqualsDeclaration")),
		Z4 = (o.TSExternalModuleReference = h("tsExternalModuleReference")),
		e8 = (o.TSNonNullExpression = h("tsNonNullExpression")),
		t8 = (o.TSExportAssignment = h("tsExportAssignment")),
		r8 = (o.TSNamespaceExportDeclaration = h("tsNamespaceExportDeclaration")),
		a8 = (o.TSTypeAnnotation = h("tsTypeAnnotation")),
		n8 = (o.TSTypeParameterInstantiation = h("tsTypeParameterInstantiation")),
		s8 = (o.TSTypeParameterDeclaration = h("tsTypeParameterDeclaration")),
		i8 = (o.TSTypeParameter = h("tsTypeParameter")),
		u8 = (o.NumberLiteral = Jt.numberLiteral),
		o8 = (o.RegexLiteral = Jt.regexLiteral),
		l8 = (o.RestProperty = Jt.restProperty),
		c8 = (o.SpreadProperty = Jt.spreadProperty)
})
var Le = v($e => {
	"use strict"
	Object.defineProperty($e, "__esModule", {value: !0})
	var $a = Qa()
	Object.keys($a).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			(e in $e && $e[e] === $a[e]) ||
			Object.defineProperty($e, e, {
				enumerable: !0,
				get: function () {
					return $a[e]
				},
			})
	})
	var za = yu()
	Object.keys(za).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			(e in $e && $e[e] === za[e]) ||
			Object.defineProperty($e, e, {
				enumerable: !0,
				get: function () {
					return za[e]
				},
			})
	})
})
var Su = v(Za => {
	"use strict"
	Object.defineProperty(Za, "__esModule", {value: !0})
	Za.default = fh
	var dh = Le(),
		ph = Dt()
	function fh(e, t) {
		let r = e.value.split(/\r\n|\n|\r/),
			a = 0
		for (let i = 0; i < r.length; i++) /[^ \t]/.exec(r[i]) && (a = i)
		let n = ""
		for (let i = 0; i < r.length; i++) {
			let l = r[i],
				d = i === 0,
				S = i === r.length - 1,
				g = i === a,
				D = l.replace(/\t/g, " ")
			d || (D = D.replace(/^ +/, "")),
				S || (D = D.replace(/ +$/, "")),
				D && (g || (D += " "), (n += D))
		}
		n && t.push((0, ph.inherits)((0, dh.stringLiteral)(n), e))
	}
})
var bu = v(tn => {
	"use strict"
	Object.defineProperty(tn, "__esModule", {value: !0})
	tn.default = mh
	var en = ce(),
		Th = Su()
	function mh(e) {
		let t = []
		for (let r = 0; r < e.children.length; r++) {
			let a = e.children[r]
			if ((0, en.isJSXText)(a)) {
				;(0, Th.default)(a, t)
				continue
			}
			;(0, en.isJSXExpressionContainer)(a) && (a = a.expression),
				!(0, en.isJSXEmptyExpression)(a) && t.push(a)
		}
		return t
	}
})
var an = v(rn => {
	"use strict"
	Object.defineProperty(rn, "__esModule", {value: !0})
	rn.default = yh
	var Eh = Be()
	function yh(e) {
		return !!(e && Eh.VISITOR_KEYS[e.type])
	}
})
var Au = v(nn => {
	"use strict"
	Object.defineProperty(nn, "__esModule", {value: !0})
	nn.default = bh
	var Sh = an()
	function bh(e) {
		if (!(0, Sh.default)(e)) {
			var t
			let r = (t = e?.type) != null ? t : JSON.stringify(e)
			throw new TypeError(`Not a valid node of type "${r}"`)
		}
	}
})
var hu = v(m => {
	"use strict"
	Object.defineProperty(m, "__esModule", {value: !0})
	m.assertAccessor = FD
	m.assertAnyTypeAnnotation = r_
	m.assertArgumentPlaceholder = LI
	m.assertArrayExpression = hh
	m.assertArrayPattern = b1
	m.assertArrayTypeAnnotation = a_
	m.assertArrowFunctionExpression = A1
	m.assertAssignmentExpression = _h
	m.assertAssignmentPattern = S1
	m.assertAwaitExpression = j1
	m.assertBigIntLiteral = V1
	m.assertBinary = sD
	m.assertBinaryExpression = Ih
	m.assertBindExpression = vI
	m.assertBlock = oD
	m.assertBlockParent = uD
	m.assertBlockStatement = Nh
	m.assertBooleanLiteral = Jh
	m.assertBooleanLiteralTypeAnnotation = s_
	m.assertBooleanTypeAnnotation = n_
	m.assertBreakStatement = Oh
	m.assertCallExpression = Ph
	m.assertCatchClause = Ch
	m.assertClass = RD
	m.assertClassAccessorProperty = Q1
	m.assertClassBody = h1
	m.assertClassDeclaration = I1
	m.assertClassExpression = _1
	m.assertClassImplements = u_
	m.assertClassMethod = B1
	m.assertClassPrivateMethod = z1
	m.assertClassPrivateProperty = $1
	m.assertClassProperty = W1
	m.assertCompletionStatement = dD
	m.assertConditional = pD
	m.assertConditionalExpression = Lh
	m.assertContinueStatement = vh
	m.assertDebuggerStatement = Rh
	m.assertDecimalLiteral = kI
	m.assertDeclaration = hD
	m.assertDeclareClass = o_
	m.assertDeclareExportAllDeclaration = y_
	m.assertDeclareExportDeclaration = E_
	m.assertDeclareFunction = l_
	m.assertDeclareInterface = c_
	m.assertDeclareModule = d_
	m.assertDeclareModuleExports = p_
	m.assertDeclareOpaqueType = T_
	m.assertDeclareTypeAlias = f_
	m.assertDeclareVariable = m_
	m.assertDeclaredPredicate = S_
	m.assertDecorator = RI
	m.assertDirective = Dh
	m.assertDirectiveLiteral = xh
	m.assertDoExpression = MI
	m.assertDoWhileStatement = Mh
	m.assertEmptyStatement = Bh
	m.assertEmptyTypeAnnotation = P_
	m.assertEnumBody = YD
	m.assertEnumBooleanBody = aI
	m.assertEnumBooleanMember = uI
	m.assertEnumDeclaration = rI
	m.assertEnumDefaultedMember = cI
	m.assertEnumMember = VD
	m.assertEnumNumberBody = nI
	m.assertEnumNumberMember = oI
	m.assertEnumStringBody = sI
	m.assertEnumStringMember = lI
	m.assertEnumSymbolBody = iI
	m.assertExistsTypeAnnotation = b_
	m.assertExportAllDeclaration = g1
	m.assertExportDeclaration = BD
	m.assertExportDefaultDeclaration = D1
	m.assertExportDefaultSpecifier = BI
	m.assertExportNamedDeclaration = x1
	m.assertExportNamespaceSpecifier = K1
	m.assertExportSpecifier = N1
	m.assertExpression = nD
	m.assertExpressionStatement = wh
	m.assertExpressionWrapper = mD
	m.assertFile = Fh
	m.assertFlow = UD
	m.assertFlowBaseAnnotation = qD
	m.assertFlowDeclaration = HD
	m.assertFlowPredicate = jD
	m.assertFlowType = GD
	m.assertFor = ED
	m.assertForInStatement = kh
	m.assertForOfStatement = O1
	m.assertForStatement = Uh
	m.assertForXStatement = yD
	m.assertFunction = SD
	m.assertFunctionDeclaration = Gh
	m.assertFunctionExpression = qh
	m.assertFunctionParent = bD
	m.assertFunctionTypeAnnotation = A_
	m.assertFunctionTypeParam = h_
	m.assertGenericTypeAnnotation = __
	m.assertIdentifier = Hh
	m.assertIfStatement = jh
	m.assertImmutable = xD
	m.assertImport = Y1
	m.assertImportAttribute = t_
	m.assertImportDeclaration = P1
	m.assertImportDefaultSpecifier = C1
	m.assertImportExpression = R1
	m.assertImportNamespaceSpecifier = L1
	m.assertImportOrExportDeclaration = MD
	m.assertImportSpecifier = v1
	m.assertIndexedAccessType = dI
	m.assertInferredPredicate = I_
	m.assertInterfaceDeclaration = D_
	m.assertInterfaceExtends = g_
	m.assertInterfaceTypeAnnotation = x_
	m.assertInterpreterDirective = gh
	m.assertIntersectionTypeAnnotation = N_
	m.assertJSX = KD
	m.assertJSXAttribute = fI
	m.assertJSXClosingElement = TI
	m.assertJSXClosingFragment = NI
	m.assertJSXElement = mI
	m.assertJSXEmptyExpression = EI
	m.assertJSXExpressionContainer = yI
	m.assertJSXFragment = DI
	m.assertJSXIdentifier = bI
	m.assertJSXMemberExpression = AI
	m.assertJSXNamespacedName = hI
	m.assertJSXOpeningElement = _I
	m.assertJSXOpeningFragment = xI
	m.assertJSXSpreadAttribute = II
	m.assertJSXSpreadChild = SI
	m.assertJSXText = gI
	m.assertLVal = ID
	m.assertLabeledStatement = Yh
	m.assertLiteral = DD
	m.assertLogicalExpression = Qh
	m.assertLoop = fD
	m.assertMemberExpression = $h
	m.assertMetaProperty = M1
	m.assertMethod = OD
	m.assertMiscellaneous = XD
	m.assertMixedTypeAnnotation = O_
	m.assertModuleDeclaration = rx
	m.assertModuleExpression = UI
	m.assertModuleSpecifier = wD
	m.assertNewExpression = zh
	m.assertNoop = OI
	m.assertNullLiteral = Xh
	m.assertNullLiteralTypeAnnotation = i_
	m.assertNullableTypeAnnotation = C_
	m.assertNumberLiteral = zD
	m.assertNumberLiteralTypeAnnotation = L_
	m.assertNumberTypeAnnotation = v_
	m.assertNumericLiteral = Kh
	m.assertObjectExpression = e1
	m.assertObjectMember = PD
	m.assertObjectMethod = t1
	m.assertObjectPattern = w1
	m.assertObjectProperty = r1
	m.assertObjectTypeAnnotation = R_
	m.assertObjectTypeCallProperty = B_
	m.assertObjectTypeIndexer = w_
	m.assertObjectTypeInternalSlot = M_
	m.assertObjectTypeProperty = F_
	m.assertObjectTypeSpreadProperty = k_
	m.assertOpaqueType = U_
	m.assertOptionalCallExpression = J1
	m.assertOptionalIndexedAccessType = pI
	m.assertOptionalMemberExpression = X1
	m.assertParenthesizedExpression = i1
	m.assertPattern = vD
	m.assertPatternLike = _D
	m.assertPipelineBareFunction = HI
	m.assertPipelinePrimaryTopicReference = jI
	m.assertPipelineTopicExpression = qI
	m.assertPlaceholder = PI
	m.assertPrivate = kD
	m.assertPrivateName = Z1
	m.assertProgram = Zh
	m.assertProperty = CD
	m.assertPureish = AD
	m.assertQualifiedTypeIdentifier = G_
	m.assertRecordExpression = wI
	m.assertRegExpLiteral = Wh
	m.assertRegexLiteral = ZD
	m.assertRestElement = a1
	m.assertRestProperty = ex
	m.assertReturnStatement = n1
	m.assertScopable = iD
	m.assertSequenceExpression = s1
	m.assertSpreadElement = F1
	m.assertSpreadProperty = tx
	m.assertStandardized = aD
	m.assertStatement = lD
	m.assertStaticBlock = e_
	m.assertStringLiteral = Vh
	m.assertStringLiteralTypeAnnotation = q_
	m.assertStringTypeAnnotation = H_
	m.assertSuper = k1
	m.assertSwitchCase = u1
	m.assertSwitchStatement = o1
	m.assertSymbolTypeAnnotation = j_
	m.assertTSAnyKeyword = ZI
	m.assertTSArrayType = bg
	m.assertTSAsExpression = Ug
	m.assertTSBaseType = $D
	m.assertTSBigIntKeyword = tg
	m.assertTSBooleanKeyword = eg
	m.assertTSCallSignatureDeclaration = JI
	m.assertTSConditionalType = xg
	m.assertTSConstructSignatureDeclaration = WI
	m.assertTSConstructorType = Tg
	m.assertTSDeclareFunction = VI
	m.assertTSDeclareMethod = KI
	m.assertTSEntityName = gD
	m.assertTSEnumBody = Hg
	m.assertTSEnumDeclaration = jg
	m.assertTSEnumMember = Yg
	m.assertTSExportAssignment = $g
	m.assertTSExpressionWithTypeArguments = Mg
	m.assertTSExternalModuleReference = Wg
	m.assertTSFunctionType = fg
	m.assertTSImportEqualsDeclaration = Jg
	m.assertTSImportType = Xg
	m.assertTSIndexSignature = zI
	m.assertTSIndexedAccessType = Cg
	m.assertTSInferType = Ng
	m.assertTSInstantiationExpression = kg
	m.assertTSInterfaceBody = wg
	m.assertTSInterfaceDeclaration = Bg
	m.assertTSIntersectionType = Dg
	m.assertTSIntrinsicKeyword = rg
	m.assertTSLiteralType = Rg
	m.assertTSMappedType = Lg
	m.assertTSMethodSignature = $I
	m.assertTSModuleBlock = Kg
	m.assertTSModuleDeclaration = Vg
	m.assertTSNamedTupleMember = Ig
	m.assertTSNamespaceExportDeclaration = zg
	m.assertTSNeverKeyword = ag
	m.assertTSNonNullExpression = Qg
	m.assertTSNullKeyword = ng
	m.assertTSNumberKeyword = sg
	m.assertTSObjectKeyword = ig
	m.assertTSOptionalType = hg
	m.assertTSParameterProperty = YI
	m.assertTSParenthesizedType = Og
	m.assertTSPropertySignature = QI
	m.assertTSQualifiedName = XI
	m.assertTSRestType = _g
	m.assertTSSatisfiesExpression = Gg
	m.assertTSStringKeyword = ug
	m.assertTSSymbolKeyword = og
	m.assertTSTemplateLiteralType = vg
	m.assertTSThisType = pg
	m.assertTSTupleType = Ag
	m.assertTSType = QD
	m.assertTSTypeAliasDeclaration = Fg
	m.assertTSTypeAnnotation = Zg
	m.assertTSTypeAssertion = qg
	m.assertTSTypeElement = WD
	m.assertTSTypeLiteral = Sg
	m.assertTSTypeOperator = Pg
	m.assertTSTypeParameter = rD
	m.assertTSTypeParameterDeclaration = tD
	m.assertTSTypeParameterInstantiation = eD
	m.assertTSTypePredicate = Eg
	m.assertTSTypeQuery = yg
	m.assertTSTypeReference = mg
	m.assertTSUndefinedKeyword = lg
	m.assertTSUnionType = gg
	m.assertTSUnknownKeyword = cg
	m.assertTSVoidKeyword = dg
	m.assertTaggedTemplateExpression = U1
	m.assertTemplateElement = G1
	m.assertTemplateLiteral = q1
	m.assertTerminatorless = cD
	m.assertThisExpression = l1
	m.assertThisTypeAnnotation = Y_
	m.assertThrowStatement = c1
	m.assertTopicReference = GI
	m.assertTryStatement = d1
	m.assertTupleExpression = FI
	m.assertTupleTypeAnnotation = V_
	m.assertTypeAlias = X_
	m.assertTypeAnnotation = J_
	m.assertTypeCastExpression = W_
	m.assertTypeParameter = Q_
	m.assertTypeParameterDeclaration = $_
	m.assertTypeParameterInstantiation = z_
	m.assertTypeScript = JD
	m.assertTypeofTypeAnnotation = K_
	m.assertUnaryExpression = p1
	m.assertUnaryLike = LD
	m.assertUnionTypeAnnotation = Z_
	m.assertUpdateExpression = f1
	m.assertUserWhitespacable = ND
	m.assertV8IntrinsicIdentifier = CI
	m.assertVariableDeclaration = T1
	m.assertVariableDeclarator = m1
	m.assertVariance = eI
	m.assertVoidTypeAnnotation = tI
	m.assertWhile = TD
	m.assertWhileStatement = E1
	m.assertWithStatement = y1
	m.assertYieldExpression = H1
	var Ah = bt(),
		Wt = St()
	function E(e, t, r) {
		if (!(0, Ah.default)(e, t, r))
			throw new Error(
				`Expected type "${e}" with option ${JSON.stringify(
					r
				)}, but instead got "${t.type}".`
			)
	}
	function hh(e, t) {
		E("ArrayExpression", e, t)
	}
	function _h(e, t) {
		E("AssignmentExpression", e, t)
	}
	function Ih(e, t) {
		E("BinaryExpression", e, t)
	}
	function gh(e, t) {
		E("InterpreterDirective", e, t)
	}
	function Dh(e, t) {
		E("Directive", e, t)
	}
	function xh(e, t) {
		E("DirectiveLiteral", e, t)
	}
	function Nh(e, t) {
		E("BlockStatement", e, t)
	}
	function Oh(e, t) {
		E("BreakStatement", e, t)
	}
	function Ph(e, t) {
		E("CallExpression", e, t)
	}
	function Ch(e, t) {
		E("CatchClause", e, t)
	}
	function Lh(e, t) {
		E("ConditionalExpression", e, t)
	}
	function vh(e, t) {
		E("ContinueStatement", e, t)
	}
	function Rh(e, t) {
		E("DebuggerStatement", e, t)
	}
	function Mh(e, t) {
		E("DoWhileStatement", e, t)
	}
	function Bh(e, t) {
		E("EmptyStatement", e, t)
	}
	function wh(e, t) {
		E("ExpressionStatement", e, t)
	}
	function Fh(e, t) {
		E("File", e, t)
	}
	function kh(e, t) {
		E("ForInStatement", e, t)
	}
	function Uh(e, t) {
		E("ForStatement", e, t)
	}
	function Gh(e, t) {
		E("FunctionDeclaration", e, t)
	}
	function qh(e, t) {
		E("FunctionExpression", e, t)
	}
	function Hh(e, t) {
		E("Identifier", e, t)
	}
	function jh(e, t) {
		E("IfStatement", e, t)
	}
	function Yh(e, t) {
		E("LabeledStatement", e, t)
	}
	function Vh(e, t) {
		E("StringLiteral", e, t)
	}
	function Kh(e, t) {
		E("NumericLiteral", e, t)
	}
	function Xh(e, t) {
		E("NullLiteral", e, t)
	}
	function Jh(e, t) {
		E("BooleanLiteral", e, t)
	}
	function Wh(e, t) {
		E("RegExpLiteral", e, t)
	}
	function Qh(e, t) {
		E("LogicalExpression", e, t)
	}
	function $h(e, t) {
		E("MemberExpression", e, t)
	}
	function zh(e, t) {
		E("NewExpression", e, t)
	}
	function Zh(e, t) {
		E("Program", e, t)
	}
	function e1(e, t) {
		E("ObjectExpression", e, t)
	}
	function t1(e, t) {
		E("ObjectMethod", e, t)
	}
	function r1(e, t) {
		E("ObjectProperty", e, t)
	}
	function a1(e, t) {
		E("RestElement", e, t)
	}
	function n1(e, t) {
		E("ReturnStatement", e, t)
	}
	function s1(e, t) {
		E("SequenceExpression", e, t)
	}
	function i1(e, t) {
		E("ParenthesizedExpression", e, t)
	}
	function u1(e, t) {
		E("SwitchCase", e, t)
	}
	function o1(e, t) {
		E("SwitchStatement", e, t)
	}
	function l1(e, t) {
		E("ThisExpression", e, t)
	}
	function c1(e, t) {
		E("ThrowStatement", e, t)
	}
	function d1(e, t) {
		E("TryStatement", e, t)
	}
	function p1(e, t) {
		E("UnaryExpression", e, t)
	}
	function f1(e, t) {
		E("UpdateExpression", e, t)
	}
	function T1(e, t) {
		E("VariableDeclaration", e, t)
	}
	function m1(e, t) {
		E("VariableDeclarator", e, t)
	}
	function E1(e, t) {
		E("WhileStatement", e, t)
	}
	function y1(e, t) {
		E("WithStatement", e, t)
	}
	function S1(e, t) {
		E("AssignmentPattern", e, t)
	}
	function b1(e, t) {
		E("ArrayPattern", e, t)
	}
	function A1(e, t) {
		E("ArrowFunctionExpression", e, t)
	}
	function h1(e, t) {
		E("ClassBody", e, t)
	}
	function _1(e, t) {
		E("ClassExpression", e, t)
	}
	function I1(e, t) {
		E("ClassDeclaration", e, t)
	}
	function g1(e, t) {
		E("ExportAllDeclaration", e, t)
	}
	function D1(e, t) {
		E("ExportDefaultDeclaration", e, t)
	}
	function x1(e, t) {
		E("ExportNamedDeclaration", e, t)
	}
	function N1(e, t) {
		E("ExportSpecifier", e, t)
	}
	function O1(e, t) {
		E("ForOfStatement", e, t)
	}
	function P1(e, t) {
		E("ImportDeclaration", e, t)
	}
	function C1(e, t) {
		E("ImportDefaultSpecifier", e, t)
	}
	function L1(e, t) {
		E("ImportNamespaceSpecifier", e, t)
	}
	function v1(e, t) {
		E("ImportSpecifier", e, t)
	}
	function R1(e, t) {
		E("ImportExpression", e, t)
	}
	function M1(e, t) {
		E("MetaProperty", e, t)
	}
	function B1(e, t) {
		E("ClassMethod", e, t)
	}
	function w1(e, t) {
		E("ObjectPattern", e, t)
	}
	function F1(e, t) {
		E("SpreadElement", e, t)
	}
	function k1(e, t) {
		E("Super", e, t)
	}
	function U1(e, t) {
		E("TaggedTemplateExpression", e, t)
	}
	function G1(e, t) {
		E("TemplateElement", e, t)
	}
	function q1(e, t) {
		E("TemplateLiteral", e, t)
	}
	function H1(e, t) {
		E("YieldExpression", e, t)
	}
	function j1(e, t) {
		E("AwaitExpression", e, t)
	}
	function Y1(e, t) {
		E("Import", e, t)
	}
	function V1(e, t) {
		E("BigIntLiteral", e, t)
	}
	function K1(e, t) {
		E("ExportNamespaceSpecifier", e, t)
	}
	function X1(e, t) {
		E("OptionalMemberExpression", e, t)
	}
	function J1(e, t) {
		E("OptionalCallExpression", e, t)
	}
	function W1(e, t) {
		E("ClassProperty", e, t)
	}
	function Q1(e, t) {
		E("ClassAccessorProperty", e, t)
	}
	function $1(e, t) {
		E("ClassPrivateProperty", e, t)
	}
	function z1(e, t) {
		E("ClassPrivateMethod", e, t)
	}
	function Z1(e, t) {
		E("PrivateName", e, t)
	}
	function e_(e, t) {
		E("StaticBlock", e, t)
	}
	function t_(e, t) {
		E("ImportAttribute", e, t)
	}
	function r_(e, t) {
		E("AnyTypeAnnotation", e, t)
	}
	function a_(e, t) {
		E("ArrayTypeAnnotation", e, t)
	}
	function n_(e, t) {
		E("BooleanTypeAnnotation", e, t)
	}
	function s_(e, t) {
		E("BooleanLiteralTypeAnnotation", e, t)
	}
	function i_(e, t) {
		E("NullLiteralTypeAnnotation", e, t)
	}
	function u_(e, t) {
		E("ClassImplements", e, t)
	}
	function o_(e, t) {
		E("DeclareClass", e, t)
	}
	function l_(e, t) {
		E("DeclareFunction", e, t)
	}
	function c_(e, t) {
		E("DeclareInterface", e, t)
	}
	function d_(e, t) {
		E("DeclareModule", e, t)
	}
	function p_(e, t) {
		E("DeclareModuleExports", e, t)
	}
	function f_(e, t) {
		E("DeclareTypeAlias", e, t)
	}
	function T_(e, t) {
		E("DeclareOpaqueType", e, t)
	}
	function m_(e, t) {
		E("DeclareVariable", e, t)
	}
	function E_(e, t) {
		E("DeclareExportDeclaration", e, t)
	}
	function y_(e, t) {
		E("DeclareExportAllDeclaration", e, t)
	}
	function S_(e, t) {
		E("DeclaredPredicate", e, t)
	}
	function b_(e, t) {
		E("ExistsTypeAnnotation", e, t)
	}
	function A_(e, t) {
		E("FunctionTypeAnnotation", e, t)
	}
	function h_(e, t) {
		E("FunctionTypeParam", e, t)
	}
	function __(e, t) {
		E("GenericTypeAnnotation", e, t)
	}
	function I_(e, t) {
		E("InferredPredicate", e, t)
	}
	function g_(e, t) {
		E("InterfaceExtends", e, t)
	}
	function D_(e, t) {
		E("InterfaceDeclaration", e, t)
	}
	function x_(e, t) {
		E("InterfaceTypeAnnotation", e, t)
	}
	function N_(e, t) {
		E("IntersectionTypeAnnotation", e, t)
	}
	function O_(e, t) {
		E("MixedTypeAnnotation", e, t)
	}
	function P_(e, t) {
		E("EmptyTypeAnnotation", e, t)
	}
	function C_(e, t) {
		E("NullableTypeAnnotation", e, t)
	}
	function L_(e, t) {
		E("NumberLiteralTypeAnnotation", e, t)
	}
	function v_(e, t) {
		E("NumberTypeAnnotation", e, t)
	}
	function R_(e, t) {
		E("ObjectTypeAnnotation", e, t)
	}
	function M_(e, t) {
		E("ObjectTypeInternalSlot", e, t)
	}
	function B_(e, t) {
		E("ObjectTypeCallProperty", e, t)
	}
	function w_(e, t) {
		E("ObjectTypeIndexer", e, t)
	}
	function F_(e, t) {
		E("ObjectTypeProperty", e, t)
	}
	function k_(e, t) {
		E("ObjectTypeSpreadProperty", e, t)
	}
	function U_(e, t) {
		E("OpaqueType", e, t)
	}
	function G_(e, t) {
		E("QualifiedTypeIdentifier", e, t)
	}
	function q_(e, t) {
		E("StringLiteralTypeAnnotation", e, t)
	}
	function H_(e, t) {
		E("StringTypeAnnotation", e, t)
	}
	function j_(e, t) {
		E("SymbolTypeAnnotation", e, t)
	}
	function Y_(e, t) {
		E("ThisTypeAnnotation", e, t)
	}
	function V_(e, t) {
		E("TupleTypeAnnotation", e, t)
	}
	function K_(e, t) {
		E("TypeofTypeAnnotation", e, t)
	}
	function X_(e, t) {
		E("TypeAlias", e, t)
	}
	function J_(e, t) {
		E("TypeAnnotation", e, t)
	}
	function W_(e, t) {
		E("TypeCastExpression", e, t)
	}
	function Q_(e, t) {
		E("TypeParameter", e, t)
	}
	function $_(e, t) {
		E("TypeParameterDeclaration", e, t)
	}
	function z_(e, t) {
		E("TypeParameterInstantiation", e, t)
	}
	function Z_(e, t) {
		E("UnionTypeAnnotation", e, t)
	}
	function eI(e, t) {
		E("Variance", e, t)
	}
	function tI(e, t) {
		E("VoidTypeAnnotation", e, t)
	}
	function rI(e, t) {
		E("EnumDeclaration", e, t)
	}
	function aI(e, t) {
		E("EnumBooleanBody", e, t)
	}
	function nI(e, t) {
		E("EnumNumberBody", e, t)
	}
	function sI(e, t) {
		E("EnumStringBody", e, t)
	}
	function iI(e, t) {
		E("EnumSymbolBody", e, t)
	}
	function uI(e, t) {
		E("EnumBooleanMember", e, t)
	}
	function oI(e, t) {
		E("EnumNumberMember", e, t)
	}
	function lI(e, t) {
		E("EnumStringMember", e, t)
	}
	function cI(e, t) {
		E("EnumDefaultedMember", e, t)
	}
	function dI(e, t) {
		E("IndexedAccessType", e, t)
	}
	function pI(e, t) {
		E("OptionalIndexedAccessType", e, t)
	}
	function fI(e, t) {
		E("JSXAttribute", e, t)
	}
	function TI(e, t) {
		E("JSXClosingElement", e, t)
	}
	function mI(e, t) {
		E("JSXElement", e, t)
	}
	function EI(e, t) {
		E("JSXEmptyExpression", e, t)
	}
	function yI(e, t) {
		E("JSXExpressionContainer", e, t)
	}
	function SI(e, t) {
		E("JSXSpreadChild", e, t)
	}
	function bI(e, t) {
		E("JSXIdentifier", e, t)
	}
	function AI(e, t) {
		E("JSXMemberExpression", e, t)
	}
	function hI(e, t) {
		E("JSXNamespacedName", e, t)
	}
	function _I(e, t) {
		E("JSXOpeningElement", e, t)
	}
	function II(e, t) {
		E("JSXSpreadAttribute", e, t)
	}
	function gI(e, t) {
		E("JSXText", e, t)
	}
	function DI(e, t) {
		E("JSXFragment", e, t)
	}
	function xI(e, t) {
		E("JSXOpeningFragment", e, t)
	}
	function NI(e, t) {
		E("JSXClosingFragment", e, t)
	}
	function OI(e, t) {
		E("Noop", e, t)
	}
	function PI(e, t) {
		E("Placeholder", e, t)
	}
	function CI(e, t) {
		E("V8IntrinsicIdentifier", e, t)
	}
	function LI(e, t) {
		E("ArgumentPlaceholder", e, t)
	}
	function vI(e, t) {
		E("BindExpression", e, t)
	}
	function RI(e, t) {
		E("Decorator", e, t)
	}
	function MI(e, t) {
		E("DoExpression", e, t)
	}
	function BI(e, t) {
		E("ExportDefaultSpecifier", e, t)
	}
	function wI(e, t) {
		E("RecordExpression", e, t)
	}
	function FI(e, t) {
		E("TupleExpression", e, t)
	}
	function kI(e, t) {
		E("DecimalLiteral", e, t)
	}
	function UI(e, t) {
		E("ModuleExpression", e, t)
	}
	function GI(e, t) {
		E("TopicReference", e, t)
	}
	function qI(e, t) {
		E("PipelineTopicExpression", e, t)
	}
	function HI(e, t) {
		E("PipelineBareFunction", e, t)
	}
	function jI(e, t) {
		E("PipelinePrimaryTopicReference", e, t)
	}
	function YI(e, t) {
		E("TSParameterProperty", e, t)
	}
	function VI(e, t) {
		E("TSDeclareFunction", e, t)
	}
	function KI(e, t) {
		E("TSDeclareMethod", e, t)
	}
	function XI(e, t) {
		E("TSQualifiedName", e, t)
	}
	function JI(e, t) {
		E("TSCallSignatureDeclaration", e, t)
	}
	function WI(e, t) {
		E("TSConstructSignatureDeclaration", e, t)
	}
	function QI(e, t) {
		E("TSPropertySignature", e, t)
	}
	function $I(e, t) {
		E("TSMethodSignature", e, t)
	}
	function zI(e, t) {
		E("TSIndexSignature", e, t)
	}
	function ZI(e, t) {
		E("TSAnyKeyword", e, t)
	}
	function eg(e, t) {
		E("TSBooleanKeyword", e, t)
	}
	function tg(e, t) {
		E("TSBigIntKeyword", e, t)
	}
	function rg(e, t) {
		E("TSIntrinsicKeyword", e, t)
	}
	function ag(e, t) {
		E("TSNeverKeyword", e, t)
	}
	function ng(e, t) {
		E("TSNullKeyword", e, t)
	}
	function sg(e, t) {
		E("TSNumberKeyword", e, t)
	}
	function ig(e, t) {
		E("TSObjectKeyword", e, t)
	}
	function ug(e, t) {
		E("TSStringKeyword", e, t)
	}
	function og(e, t) {
		E("TSSymbolKeyword", e, t)
	}
	function lg(e, t) {
		E("TSUndefinedKeyword", e, t)
	}
	function cg(e, t) {
		E("TSUnknownKeyword", e, t)
	}
	function dg(e, t) {
		E("TSVoidKeyword", e, t)
	}
	function pg(e, t) {
		E("TSThisType", e, t)
	}
	function fg(e, t) {
		E("TSFunctionType", e, t)
	}
	function Tg(e, t) {
		E("TSConstructorType", e, t)
	}
	function mg(e, t) {
		E("TSTypeReference", e, t)
	}
	function Eg(e, t) {
		E("TSTypePredicate", e, t)
	}
	function yg(e, t) {
		E("TSTypeQuery", e, t)
	}
	function Sg(e, t) {
		E("TSTypeLiteral", e, t)
	}
	function bg(e, t) {
		E("TSArrayType", e, t)
	}
	function Ag(e, t) {
		E("TSTupleType", e, t)
	}
	function hg(e, t) {
		E("TSOptionalType", e, t)
	}
	function _g(e, t) {
		E("TSRestType", e, t)
	}
	function Ig(e, t) {
		E("TSNamedTupleMember", e, t)
	}
	function gg(e, t) {
		E("TSUnionType", e, t)
	}
	function Dg(e, t) {
		E("TSIntersectionType", e, t)
	}
	function xg(e, t) {
		E("TSConditionalType", e, t)
	}
	function Ng(e, t) {
		E("TSInferType", e, t)
	}
	function Og(e, t) {
		E("TSParenthesizedType", e, t)
	}
	function Pg(e, t) {
		E("TSTypeOperator", e, t)
	}
	function Cg(e, t) {
		E("TSIndexedAccessType", e, t)
	}
	function Lg(e, t) {
		E("TSMappedType", e, t)
	}
	function vg(e, t) {
		E("TSTemplateLiteralType", e, t)
	}
	function Rg(e, t) {
		E("TSLiteralType", e, t)
	}
	function Mg(e, t) {
		E("TSExpressionWithTypeArguments", e, t)
	}
	function Bg(e, t) {
		E("TSInterfaceDeclaration", e, t)
	}
	function wg(e, t) {
		E("TSInterfaceBody", e, t)
	}
	function Fg(e, t) {
		E("TSTypeAliasDeclaration", e, t)
	}
	function kg(e, t) {
		E("TSInstantiationExpression", e, t)
	}
	function Ug(e, t) {
		E("TSAsExpression", e, t)
	}
	function Gg(e, t) {
		E("TSSatisfiesExpression", e, t)
	}
	function qg(e, t) {
		E("TSTypeAssertion", e, t)
	}
	function Hg(e, t) {
		E("TSEnumBody", e, t)
	}
	function jg(e, t) {
		E("TSEnumDeclaration", e, t)
	}
	function Yg(e, t) {
		E("TSEnumMember", e, t)
	}
	function Vg(e, t) {
		E("TSModuleDeclaration", e, t)
	}
	function Kg(e, t) {
		E("TSModuleBlock", e, t)
	}
	function Xg(e, t) {
		E("TSImportType", e, t)
	}
	function Jg(e, t) {
		E("TSImportEqualsDeclaration", e, t)
	}
	function Wg(e, t) {
		E("TSExternalModuleReference", e, t)
	}
	function Qg(e, t) {
		E("TSNonNullExpression", e, t)
	}
	function $g(e, t) {
		E("TSExportAssignment", e, t)
	}
	function zg(e, t) {
		E("TSNamespaceExportDeclaration", e, t)
	}
	function Zg(e, t) {
		E("TSTypeAnnotation", e, t)
	}
	function eD(e, t) {
		E("TSTypeParameterInstantiation", e, t)
	}
	function tD(e, t) {
		E("TSTypeParameterDeclaration", e, t)
	}
	function rD(e, t) {
		E("TSTypeParameter", e, t)
	}
	function aD(e, t) {
		E("Standardized", e, t)
	}
	function nD(e, t) {
		E("Expression", e, t)
	}
	function sD(e, t) {
		E("Binary", e, t)
	}
	function iD(e, t) {
		E("Scopable", e, t)
	}
	function uD(e, t) {
		E("BlockParent", e, t)
	}
	function oD(e, t) {
		E("Block", e, t)
	}
	function lD(e, t) {
		E("Statement", e, t)
	}
	function cD(e, t) {
		E("Terminatorless", e, t)
	}
	function dD(e, t) {
		E("CompletionStatement", e, t)
	}
	function pD(e, t) {
		E("Conditional", e, t)
	}
	function fD(e, t) {
		E("Loop", e, t)
	}
	function TD(e, t) {
		E("While", e, t)
	}
	function mD(e, t) {
		E("ExpressionWrapper", e, t)
	}
	function ED(e, t) {
		E("For", e, t)
	}
	function yD(e, t) {
		E("ForXStatement", e, t)
	}
	function SD(e, t) {
		E("Function", e, t)
	}
	function bD(e, t) {
		E("FunctionParent", e, t)
	}
	function AD(e, t) {
		E("Pureish", e, t)
	}
	function hD(e, t) {
		E("Declaration", e, t)
	}
	function _D(e, t) {
		E("PatternLike", e, t)
	}
	function ID(e, t) {
		E("LVal", e, t)
	}
	function gD(e, t) {
		E("TSEntityName", e, t)
	}
	function DD(e, t) {
		E("Literal", e, t)
	}
	function xD(e, t) {
		E("Immutable", e, t)
	}
	function ND(e, t) {
		E("UserWhitespacable", e, t)
	}
	function OD(e, t) {
		E("Method", e, t)
	}
	function PD(e, t) {
		E("ObjectMember", e, t)
	}
	function CD(e, t) {
		E("Property", e, t)
	}
	function LD(e, t) {
		E("UnaryLike", e, t)
	}
	function vD(e, t) {
		E("Pattern", e, t)
	}
	function RD(e, t) {
		E("Class", e, t)
	}
	function MD(e, t) {
		E("ImportOrExportDeclaration", e, t)
	}
	function BD(e, t) {
		E("ExportDeclaration", e, t)
	}
	function wD(e, t) {
		E("ModuleSpecifier", e, t)
	}
	function FD(e, t) {
		E("Accessor", e, t)
	}
	function kD(e, t) {
		E("Private", e, t)
	}
	function UD(e, t) {
		E("Flow", e, t)
	}
	function GD(e, t) {
		E("FlowType", e, t)
	}
	function qD(e, t) {
		E("FlowBaseAnnotation", e, t)
	}
	function HD(e, t) {
		E("FlowDeclaration", e, t)
	}
	function jD(e, t) {
		E("FlowPredicate", e, t)
	}
	function YD(e, t) {
		E("EnumBody", e, t)
	}
	function VD(e, t) {
		E("EnumMember", e, t)
	}
	function KD(e, t) {
		E("JSX", e, t)
	}
	function XD(e, t) {
		E("Miscellaneous", e, t)
	}
	function JD(e, t) {
		E("TypeScript", e, t)
	}
	function WD(e, t) {
		E("TSTypeElement", e, t)
	}
	function QD(e, t) {
		E("TSType", e, t)
	}
	function $D(e, t) {
		E("TSBaseType", e, t)
	}
	function zD(e, t) {
		;(0, Wt.default)("assertNumberLiteral", "assertNumericLiteral"),
			E("NumberLiteral", e, t)
	}
	function ZD(e, t) {
		;(0, Wt.default)("assertRegexLiteral", "assertRegExpLiteral"),
			E("RegexLiteral", e, t)
	}
	function ex(e, t) {
		;(0, Wt.default)("assertRestProperty", "assertRestElement"),
			E("RestProperty", e, t)
	}
	function tx(e, t) {
		;(0, Wt.default)("assertSpreadProperty", "assertSpreadElement"),
			E("SpreadProperty", e, t)
	}
	function rx(e, t) {
		;(0, Wt.default)(
			"assertModuleDeclaration",
			"assertImportOrExportDeclaration"
		),
			E("ModuleDeclaration", e, t)
	}
})
var _u = v(Cr => {
	"use strict"
	Object.defineProperty(Cr, "__esModule", {value: !0})
	Cr.default = void 0
	var Fe = Le(),
		S8 = (Cr.default = ax)
	function ax(e) {
		switch (e) {
			case "string":
				return (0, Fe.stringTypeAnnotation)()
			case "number":
				return (0, Fe.numberTypeAnnotation)()
			case "undefined":
				return (0, Fe.voidTypeAnnotation)()
			case "boolean":
				return (0, Fe.booleanTypeAnnotation)()
			case "function":
				return (0, Fe.genericTypeAnnotation)((0, Fe.identifier)("Function"))
			case "object":
				return (0, Fe.genericTypeAnnotation)((0, Fe.identifier)("Object"))
			case "symbol":
				return (0, Fe.genericTypeAnnotation)((0, Fe.identifier)("Symbol"))
			case "bigint":
				return (0, Fe.anyTypeAnnotation)()
		}
		throw new Error("Invalid typeof value: " + e)
	}
})
var un = v(sn => {
	"use strict"
	Object.defineProperty(sn, "__esModule", {value: !0})
	sn.default = gu
	var Qt = ce()
	function Iu(e) {
		return (0, Qt.isIdentifier)(e)
			? e.name
			: `${e.id.name}.${Iu(e.qualification)}`
	}
	function gu(e) {
		let t = Array.from(e),
			r = new Map(),
			a = new Map(),
			n = new Set(),
			i = []
		for (let l = 0; l < t.length; l++) {
			let d = t[l]
			if (d && !i.includes(d)) {
				if ((0, Qt.isAnyTypeAnnotation)(d)) return [d]
				if ((0, Qt.isFlowBaseAnnotation)(d)) {
					a.set(d.type, d)
					continue
				}
				if ((0, Qt.isUnionTypeAnnotation)(d)) {
					n.has(d.types) || (t.push(...d.types), n.add(d.types))
					continue
				}
				if ((0, Qt.isGenericTypeAnnotation)(d)) {
					let S = Iu(d.id)
					if (r.has(S)) {
						let g = r.get(S)
						g.typeParameters
							? d.typeParameters &&
							  (g.typeParameters.params.push(
									...d.typeParameters.params
							  ),
							  (g.typeParameters.params = gu(g.typeParameters.params)))
							: (g = d.typeParameters)
					} else r.set(S, d)
					continue
				}
				i.push(d)
			}
		}
		for (let [, l] of a) i.push(l)
		for (let [, l] of r) i.push(l)
		return i
	}
})
var Du = v(on => {
	"use strict"
	Object.defineProperty(on, "__esModule", {value: !0})
	on.default = ix
	var nx = Le(),
		sx = un()
	function ix(e) {
		let t = (0, sx.default)(e)
		return t.length === 1 ? t[0] : (0, nx.unionTypeAnnotation)(t)
	}
})
var Ou = v(ln => {
	"use strict"
	Object.defineProperty(ln, "__esModule", {value: !0})
	ln.default = Nu
	var xt = ce()
	function xu(e) {
		return (0, xt.isIdentifier)(e)
			? e.name
			: (0, xt.isThisExpression)(e)
			? "this"
			: `${e.right.name}.${xu(e.left)}`
	}
	function Nu(e) {
		let t = Array.from(e),
			r = new Map(),
			a = new Map(),
			n = new Set(),
			i = []
		for (let l = 0; l < t.length; l++) {
			let d = t[l]
			if (!d || i.includes(d)) continue
			if ((0, xt.isTSAnyKeyword)(d)) return [d]
			if ((0, xt.isTSBaseType)(d)) {
				a.set(d.type, d)
				continue
			}
			if ((0, xt.isTSUnionType)(d)) {
				n.has(d.types) || (t.push(...d.types), n.add(d.types))
				continue
			}
			let S = "typeParameters"
			if ((0, xt.isTSTypeReference)(d) && d[S]) {
				let g = d[S],
					D = xu(d.typeName)
				if (r.has(D)) {
					let x = r.get(D),
						M = x[S]
					M
						? (M.params.push(...g.params), (M.params = Nu(M.params)))
						: (x = g)
				} else r.set(D, d)
				continue
			}
			i.push(d)
		}
		for (let [, l] of a) i.push(l)
		for (let [, l] of r) i.push(l)
		return i
	}
})
var Pu = v(cn => {
	"use strict"
	Object.defineProperty(cn, "__esModule", {value: !0})
	cn.default = cx
	var ux = Le(),
		ox = Ou(),
		lx = ce()
	function cx(e) {
		let t = e.map(a =>
				(0, lx.isTSTypeAnnotation)(a) ? a.typeAnnotation : a
			),
			r = (0, ox.default)(t)
		return r.length === 1 ? r[0] : (0, ux.tsUnionType)(r)
	}
})
var pn = v(dn => {
	"use strict"
	Object.defineProperty(dn, "__esModule", {value: !0})
	dn.buildUndefinedNode = dx
	var Cu = Le()
	function dx() {
		return (0, Cu.unaryExpression)("void", (0, Cu.numericLiteral)(0), !0)
	}
})
var ze = v(Tn => {
	"use strict"
	Object.defineProperty(Tn, "__esModule", {value: !0})
	Tn.default = px
	var Lu = Be(),
		vu = ce(),
		{hasOwn: Ve} = {
			hasOwn: Function.call.bind(Object.prototype.hasOwnProperty),
		}
	function Ru(e, t, r, a) {
		return e && typeof e.type == "string" ? Mu(e, t, r, a) : e
	}
	function fn(e, t, r, a) {
		return Array.isArray(e) ? e.map(n => Ru(n, t, r, a)) : Ru(e, t, r, a)
	}
	function px(e, t = !0, r = !1) {
		return Mu(e, t, r, new Map())
	}
	function Mu(e, t = !0, r = !1, a) {
		if (!e) return e
		let {type: n} = e,
			i = {type: e.type}
		if ((0, vu.isIdentifier)(e))
			(i.name = e.name),
				Ve(e, "optional") &&
					typeof e.optional == "boolean" &&
					(i.optional = e.optional),
				Ve(e, "typeAnnotation") &&
					(i.typeAnnotation = t
						? fn(e.typeAnnotation, !0, r, a)
						: e.typeAnnotation),
				Ve(e, "decorators") &&
					(i.decorators = t ? fn(e.decorators, !0, r, a) : e.decorators)
		else if (Ve(Lu.NODE_FIELDS, n))
			for (let l of Object.keys(Lu.NODE_FIELDS[n]))
				Ve(e, l) &&
					(t
						? (i[l] =
								(0, vu.isFile)(e) && l === "comments"
									? Lr(e.comments, t, r, a)
									: fn(e[l], !0, r, a))
						: (i[l] = e[l]))
		else throw new Error(`Unknown node type: "${n}"`)
		return (
			Ve(e, "loc") && (r ? (i.loc = null) : (i.loc = e.loc)),
			Ve(e, "leadingComments") &&
				(i.leadingComments = Lr(e.leadingComments, t, r, a)),
			Ve(e, "innerComments") &&
				(i.innerComments = Lr(e.innerComments, t, r, a)),
			Ve(e, "trailingComments") &&
				(i.trailingComments = Lr(e.trailingComments, t, r, a)),
			Ve(e, "extra") && (i.extra = Object.assign({}, e.extra)),
			i
		)
	}
	function Lr(e, t, r, a) {
		return !e || !t
			? e
			: e.map(n => {
					let i = a.get(n)
					if (i) return i
					let {type: l, value: d, loc: S} = n,
						g = {type: l, value: d, loc: S}
					return r && (g.loc = null), a.set(n, g), g
			  })
	}
})
var Bu = v(mn => {
	"use strict"
	Object.defineProperty(mn, "__esModule", {value: !0})
	mn.default = Tx
	var fx = ze()
	function Tx(e) {
		return (0, fx.default)(e, !1)
	}
})
var wu = v(En => {
	"use strict"
	Object.defineProperty(En, "__esModule", {value: !0})
	En.default = Ex
	var mx = ze()
	function Ex(e) {
		return (0, mx.default)(e)
	}
})
var Fu = v(yn => {
	"use strict"
	Object.defineProperty(yn, "__esModule", {value: !0})
	yn.default = Sx
	var yx = ze()
	function Sx(e) {
		return (0, yx.default)(e, !0, !0)
	}
})
var ku = v(Sn => {
	"use strict"
	Object.defineProperty(Sn, "__esModule", {value: !0})
	Sn.default = Ax
	var bx = ze()
	function Ax(e) {
		return (0, bx.default)(e, !1, !0)
	}
})
var An = v(bn => {
	"use strict"
	Object.defineProperty(bn, "__esModule", {value: !0})
	bn.default = hx
	function hx(e, t, r) {
		if (!r || !e) return e
		let a = `${t}Comments`
		return (
			e[a]
				? t === "leading"
					? (e[a] = r.concat(e[a]))
					: e[a].push(...r)
				: (e[a] = r),
			e
		)
	}
})
var Uu = v(hn => {
	"use strict"
	Object.defineProperty(hn, "__esModule", {value: !0})
	hn.default = Ix
	var _x = An()
	function Ix(e, t, r, a) {
		return (0, _x.default)(e, t, [
			{type: a ? "CommentLine" : "CommentBlock", value: r},
		])
	}
})
var vr = v(_n => {
	"use strict"
	Object.defineProperty(_n, "__esModule", {value: !0})
	_n.default = gx
	function gx(e, t, r) {
		t &&
			r &&
			(t[e] = Array.from(new Set([].concat(t[e], r[e]).filter(Boolean))))
	}
})
var gn = v(In => {
	"use strict"
	Object.defineProperty(In, "__esModule", {value: !0})
	In.default = xx
	var Dx = vr()
	function xx(e, t) {
		;(0, Dx.default)("innerComments", e, t)
	}
})
var xn = v(Dn => {
	"use strict"
	Object.defineProperty(Dn, "__esModule", {value: !0})
	Dn.default = Ox
	var Nx = vr()
	function Ox(e, t) {
		;(0, Nx.default)("leadingComments", e, t)
	}
})
var On = v(Nn => {
	"use strict"
	Object.defineProperty(Nn, "__esModule", {value: !0})
	Nn.default = Cx
	var Px = vr()
	function Cx(e, t) {
		;(0, Px.default)("trailingComments", e, t)
	}
})
var Cn = v(Pn => {
	"use strict"
	Object.defineProperty(Pn, "__esModule", {value: !0})
	Pn.default = Mx
	var Lx = On(),
		vx = xn(),
		Rx = gn()
	function Mx(e, t) {
		return (
			(0, Lx.default)(e, t), (0, vx.default)(e, t), (0, Rx.default)(e, t), e
		)
	}
})
var Gu = v(Ln => {
	"use strict"
	Object.defineProperty(Ln, "__esModule", {value: !0})
	Ln.default = wx
	var Bx = ht()
	function wx(e) {
		return (
			Bx.COMMENT_KEYS.forEach(t => {
				e[t] = null
			}),
			e
		)
	}
})
var qu = v(k => {
	"use strict"
	Object.defineProperty(k, "__esModule", {value: !0})
	k.WHILE_TYPES =
		k.USERWHITESPACABLE_TYPES =
		k.UNARYLIKE_TYPES =
		k.TYPESCRIPT_TYPES =
		k.TSTYPE_TYPES =
		k.TSTYPEELEMENT_TYPES =
		k.TSENTITYNAME_TYPES =
		k.TSBASETYPE_TYPES =
		k.TERMINATORLESS_TYPES =
		k.STATEMENT_TYPES =
		k.STANDARDIZED_TYPES =
		k.SCOPABLE_TYPES =
		k.PUREISH_TYPES =
		k.PROPERTY_TYPES =
		k.PRIVATE_TYPES =
		k.PATTERN_TYPES =
		k.PATTERNLIKE_TYPES =
		k.OBJECTMEMBER_TYPES =
		k.MODULESPECIFIER_TYPES =
		k.MODULEDECLARATION_TYPES =
		k.MISCELLANEOUS_TYPES =
		k.METHOD_TYPES =
		k.LVAL_TYPES =
		k.LOOP_TYPES =
		k.LITERAL_TYPES =
		k.JSX_TYPES =
		k.IMPORTOREXPORTDECLARATION_TYPES =
		k.IMMUTABLE_TYPES =
		k.FUNCTION_TYPES =
		k.FUNCTIONPARENT_TYPES =
		k.FOR_TYPES =
		k.FORXSTATEMENT_TYPES =
		k.FLOW_TYPES =
		k.FLOWTYPE_TYPES =
		k.FLOWPREDICATE_TYPES =
		k.FLOWDECLARATION_TYPES =
		k.FLOWBASEANNOTATION_TYPES =
		k.EXPRESSION_TYPES =
		k.EXPRESSIONWRAPPER_TYPES =
		k.EXPORTDECLARATION_TYPES =
		k.ENUMMEMBER_TYPES =
		k.ENUMBODY_TYPES =
		k.DECLARATION_TYPES =
		k.CONDITIONAL_TYPES =
		k.COMPLETIONSTATEMENT_TYPES =
		k.CLASS_TYPES =
		k.BLOCK_TYPES =
		k.BLOCKPARENT_TYPES =
		k.BINARY_TYPES =
		k.ACCESSOR_TYPES =
			void 0
	var $ = Be(),
		k8 = (k.STANDARDIZED_TYPES = $.FLIPPED_ALIAS_KEYS.Standardized),
		U8 = (k.EXPRESSION_TYPES = $.FLIPPED_ALIAS_KEYS.Expression),
		G8 = (k.BINARY_TYPES = $.FLIPPED_ALIAS_KEYS.Binary),
		q8 = (k.SCOPABLE_TYPES = $.FLIPPED_ALIAS_KEYS.Scopable),
		H8 = (k.BLOCKPARENT_TYPES = $.FLIPPED_ALIAS_KEYS.BlockParent),
		j8 = (k.BLOCK_TYPES = $.FLIPPED_ALIAS_KEYS.Block),
		Y8 = (k.STATEMENT_TYPES = $.FLIPPED_ALIAS_KEYS.Statement),
		V8 = (k.TERMINATORLESS_TYPES = $.FLIPPED_ALIAS_KEYS.Terminatorless),
		K8 = (k.COMPLETIONSTATEMENT_TYPES =
			$.FLIPPED_ALIAS_KEYS.CompletionStatement),
		X8 = (k.CONDITIONAL_TYPES = $.FLIPPED_ALIAS_KEYS.Conditional),
		J8 = (k.LOOP_TYPES = $.FLIPPED_ALIAS_KEYS.Loop),
		W8 = (k.WHILE_TYPES = $.FLIPPED_ALIAS_KEYS.While),
		Q8 = (k.EXPRESSIONWRAPPER_TYPES = $.FLIPPED_ALIAS_KEYS.ExpressionWrapper),
		$8 = (k.FOR_TYPES = $.FLIPPED_ALIAS_KEYS.For),
		z8 = (k.FORXSTATEMENT_TYPES = $.FLIPPED_ALIAS_KEYS.ForXStatement),
		Z8 = (k.FUNCTION_TYPES = $.FLIPPED_ALIAS_KEYS.Function),
		eB = (k.FUNCTIONPARENT_TYPES = $.FLIPPED_ALIAS_KEYS.FunctionParent),
		tB = (k.PUREISH_TYPES = $.FLIPPED_ALIAS_KEYS.Pureish),
		rB = (k.DECLARATION_TYPES = $.FLIPPED_ALIAS_KEYS.Declaration),
		aB = (k.PATTERNLIKE_TYPES = $.FLIPPED_ALIAS_KEYS.PatternLike),
		nB = (k.LVAL_TYPES = $.FLIPPED_ALIAS_KEYS.LVal),
		sB = (k.TSENTITYNAME_TYPES = $.FLIPPED_ALIAS_KEYS.TSEntityName),
		iB = (k.LITERAL_TYPES = $.FLIPPED_ALIAS_KEYS.Literal),
		uB = (k.IMMUTABLE_TYPES = $.FLIPPED_ALIAS_KEYS.Immutable),
		oB = (k.USERWHITESPACABLE_TYPES = $.FLIPPED_ALIAS_KEYS.UserWhitespacable),
		lB = (k.METHOD_TYPES = $.FLIPPED_ALIAS_KEYS.Method),
		cB = (k.OBJECTMEMBER_TYPES = $.FLIPPED_ALIAS_KEYS.ObjectMember),
		dB = (k.PROPERTY_TYPES = $.FLIPPED_ALIAS_KEYS.Property),
		pB = (k.UNARYLIKE_TYPES = $.FLIPPED_ALIAS_KEYS.UnaryLike),
		fB = (k.PATTERN_TYPES = $.FLIPPED_ALIAS_KEYS.Pattern),
		TB = (k.CLASS_TYPES = $.FLIPPED_ALIAS_KEYS.Class),
		Fx = (k.IMPORTOREXPORTDECLARATION_TYPES =
			$.FLIPPED_ALIAS_KEYS.ImportOrExportDeclaration),
		mB = (k.EXPORTDECLARATION_TYPES = $.FLIPPED_ALIAS_KEYS.ExportDeclaration),
		EB = (k.MODULESPECIFIER_TYPES = $.FLIPPED_ALIAS_KEYS.ModuleSpecifier),
		yB = (k.ACCESSOR_TYPES = $.FLIPPED_ALIAS_KEYS.Accessor),
		SB = (k.PRIVATE_TYPES = $.FLIPPED_ALIAS_KEYS.Private),
		bB = (k.FLOW_TYPES = $.FLIPPED_ALIAS_KEYS.Flow),
		AB = (k.FLOWTYPE_TYPES = $.FLIPPED_ALIAS_KEYS.FlowType),
		hB = (k.FLOWBASEANNOTATION_TYPES =
			$.FLIPPED_ALIAS_KEYS.FlowBaseAnnotation),
		_B = (k.FLOWDECLARATION_TYPES = $.FLIPPED_ALIAS_KEYS.FlowDeclaration),
		IB = (k.FLOWPREDICATE_TYPES = $.FLIPPED_ALIAS_KEYS.FlowPredicate),
		gB = (k.ENUMBODY_TYPES = $.FLIPPED_ALIAS_KEYS.EnumBody),
		DB = (k.ENUMMEMBER_TYPES = $.FLIPPED_ALIAS_KEYS.EnumMember),
		xB = (k.JSX_TYPES = $.FLIPPED_ALIAS_KEYS.JSX),
		NB = (k.MISCELLANEOUS_TYPES = $.FLIPPED_ALIAS_KEYS.Miscellaneous),
		OB = (k.TYPESCRIPT_TYPES = $.FLIPPED_ALIAS_KEYS.TypeScript),
		PB = (k.TSTYPEELEMENT_TYPES = $.FLIPPED_ALIAS_KEYS.TSTypeElement),
		CB = (k.TSTYPE_TYPES = $.FLIPPED_ALIAS_KEYS.TSType),
		LB = (k.TSBASETYPE_TYPES = $.FLIPPED_ALIAS_KEYS.TSBaseType),
		vB = (k.MODULEDECLARATION_TYPES = Fx)
})
var Mn = v(Rn => {
	"use strict"
	Object.defineProperty(Rn, "__esModule", {value: !0})
	Rn.default = kx
	var Rr = ce(),
		vn = Le()
	function kx(e, t) {
		if ((0, Rr.isBlockStatement)(e)) return e
		let r = []
		return (
			(0, Rr.isEmptyStatement)(e)
				? (r = [])
				: ((0, Rr.isStatement)(e) ||
						((0, Rr.isFunction)(t)
							? (e = (0, vn.returnStatement)(e))
							: (e = (0, vn.expressionStatement)(e))),
				  (r = [e])),
			(0, vn.blockStatement)(r)
		)
	}
})
var Hu = v(Bn => {
	"use strict"
	Object.defineProperty(Bn, "__esModule", {value: !0})
	Bn.default = Gx
	var Ux = Mn()
	function Gx(e, t = "body") {
		let r = (0, Ux.default)(e[t], e)
		return (e[t] = r), r
	}
})
var Fn = v(wn => {
	"use strict"
	Object.defineProperty(wn, "__esModule", {value: !0})
	wn.default = jx
	var qx = At(),
		Hx = Ar()
	function jx(e) {
		e = e + ""
		let t = ""
		for (let r of e) t += (0, Hx.isIdentifierChar)(r.codePointAt(0)) ? r : "-"
		return (
			(t = t.replace(/^[-0-9]+/, "")),
			(t = t.replace(/[-\s]+(.)?/g, function (r, a) {
				return a ? a.toUpperCase() : ""
			})),
			(0, qx.default)(t) || (t = `_${t}`),
			t || "_"
		)
	}
})
var ju = v(kn => {
	"use strict"
	Object.defineProperty(kn, "__esModule", {value: !0})
	kn.default = Vx
	var Yx = Fn()
	function Vx(e) {
		return (
			(e = (0, Yx.default)(e)),
			(e === "eval" || e === "arguments") && (e = "_" + e),
			e
		)
	}
})
var Yu = v(Un => {
	"use strict"
	Object.defineProperty(Un, "__esModule", {value: !0})
	Un.default = Jx
	var Kx = ce(),
		Xx = Le()
	function Jx(e, t = e.key || e.property) {
		return (
			!e.computed &&
				(0, Kx.isIdentifier)(t) &&
				(t = (0, Xx.stringLiteral)(t.name)),
			t
		)
	}
})
var Vu = v(Mr => {
	"use strict"
	Object.defineProperty(Mr, "__esModule", {value: !0})
	Mr.default = void 0
	var $t = ce(),
		UB = (Mr.default = Wx)
	function Wx(e) {
		if (
			((0, $t.isExpressionStatement)(e) && (e = e.expression),
			(0, $t.isExpression)(e))
		)
			return e
		if (
			((0, $t.isClass)(e)
				? (e.type = "ClassExpression")
				: (0, $t.isFunction)(e) && (e.type = "FunctionExpression"),
			!(0, $t.isExpression)(e))
		)
			throw new Error(`cannot turn ${e.type} to an expression`)
		return e
	}
})
var qn = v(Gn => {
	"use strict"
	Object.defineProperty(Gn, "__esModule", {value: !0})
	Gn.default = zt
	var Qx = Be(),
		Ku = Symbol(),
		Xu = Symbol()
	function zt(e, t, r) {
		if (!e) return !1
		let a = Qx.VISITOR_KEYS[e.type]
		if (!a) return !1
		r = r || {}
		let n = t(e, r)
		if (n !== void 0)
			switch (n) {
				case Ku:
					return !1
				case Xu:
					return !0
			}
		for (let i of a) {
			let l = e[i]
			if (l) {
				if (Array.isArray(l)) {
					for (let d of l) if (zt(d, t, r)) return !0
				} else if (zt(l, t, r)) return !0
			}
		}
		return !1
	}
	zt.skip = Ku
	zt.stop = Xu
})
var jn = v(Hn => {
	"use strict"
	Object.defineProperty(Hn, "__esModule", {value: !0})
	Hn.default = Zx
	var $x = ht(),
		Ju = ["tokens", "start", "end", "loc", "raw", "rawValue"],
		zx = [...$x.COMMENT_KEYS, "comments", ...Ju]
	function Zx(e, t = {}) {
		let r = t.preserveComments ? Ju : zx
		for (let n of r) e[n] != null && (e[n] = void 0)
		for (let n of Object.keys(e))
			n[0] === "_" && e[n] != null && (e[n] = void 0)
		let a = Object.getOwnPropertySymbols(e)
		for (let n of a) e[n] = null
	}
})
var Vn = v(Yn => {
	"use strict"
	Object.defineProperty(Yn, "__esModule", {value: !0})
	Yn.default = rN
	var eN = qn(),
		tN = jn()
	function rN(e, t) {
		return (0, eN.default)(e, tN.default, t), e
	}
})
var Qu = v(Kn => {
	"use strict"
	Object.defineProperty(Kn, "__esModule", {value: !0})
	Kn.default = ct
	var Wu = ce(),
		aN = ze(),
		nN = Vn()
	function ct(e, t = e.key) {
		let r
		return e.kind === "method"
			? ct.increment() + ""
			: ((0, Wu.isIdentifier)(t)
					? (r = t.name)
					: (0, Wu.isStringLiteral)(t)
					? (r = JSON.stringify(t.value))
					: (r = JSON.stringify((0, nN.default)((0, aN.default)(t)))),
			  e.computed && (r = `[${r}]`),
			  e.static && (r = `static:${r}`),
			  r)
	}
	ct.uid = 0
	ct.increment = function () {
		return ct.uid >= Number.MAX_SAFE_INTEGER ? (ct.uid = 0) : ct.uid++
	}
})
var $u = v(wr => {
	"use strict"
	Object.defineProperty(wr, "__esModule", {value: !0})
	wr.default = void 0
	var Br = ce(),
		sN = Le(),
		VB = (wr.default = iN)
	function iN(e, t) {
		if ((0, Br.isStatement)(e)) return e
		let r = !1,
			a
		if ((0, Br.isClass)(e)) (r = !0), (a = "ClassDeclaration")
		else if ((0, Br.isFunction)(e)) (r = !0), (a = "FunctionDeclaration")
		else if ((0, Br.isAssignmentExpression)(e))
			return (0, sN.expressionStatement)(e)
		if ((r && !e.id && (a = !1), !a)) {
			if (t) return !1
			throw new Error(`cannot turn ${e.type} to a statement`)
		}
		return (e.type = a), e
	}
})
var zu = v(Fr => {
	"use strict"
	Object.defineProperty(Fr, "__esModule", {value: !0})
	Fr.default = void 0
	var uN = At(),
		Te = Le(),
		XB = (Fr.default = Xn),
		oN = Function.call.bind(Object.prototype.toString)
	function lN(e) {
		return oN(e) === "[object RegExp]"
	}
	function cN(e) {
		if (
			typeof e != "object" ||
			e === null ||
			Object.prototype.toString.call(e) !== "[object Object]"
		)
			return !1
		let t = Object.getPrototypeOf(e)
		return t === null || Object.getPrototypeOf(t) === null
	}
	function Xn(e) {
		if (e === void 0) return (0, Te.identifier)("undefined")
		if (e === !0 || e === !1) return (0, Te.booleanLiteral)(e)
		if (e === null) return (0, Te.nullLiteral)()
		if (typeof e == "string") return (0, Te.stringLiteral)(e)
		if (typeof e == "number") {
			let t
			if (Number.isFinite(e)) t = (0, Te.numericLiteral)(Math.abs(e))
			else {
				let r
				Number.isNaN(e)
					? (r = (0, Te.numericLiteral)(0))
					: (r = (0, Te.numericLiteral)(1)),
					(t = (0, Te.binaryExpression)("/", r, (0, Te.numericLiteral)(0)))
			}
			return (
				(e < 0 || Object.is(e, -0)) &&
					(t = (0, Te.unaryExpression)("-", t)),
				t
			)
		}
		if (typeof e == "bigint") return (0, Te.bigIntLiteral)(e.toString())
		if (lN(e)) {
			let t = e.source,
				r = /\/([a-z]*)$/.exec(e.toString())[1]
			return (0, Te.regExpLiteral)(t, r)
		}
		if (Array.isArray(e)) return (0, Te.arrayExpression)(e.map(Xn))
		if (cN(e)) {
			let t = []
			for (let r of Object.keys(e)) {
				let a,
					n = !1
				;(0, uN.default)(r)
					? r === "__proto__"
						? ((n = !0), (a = (0, Te.stringLiteral)(r)))
						: (a = (0, Te.identifier)(r))
					: (a = (0, Te.stringLiteral)(r)),
					t.push((0, Te.objectProperty)(a, Xn(e[r]), n))
			}
			return (0, Te.objectExpression)(t)
		}
		throw new Error("don't know how to turn this value into a node")
	}
})
var Zu = v(Jn => {
	"use strict"
	Object.defineProperty(Jn, "__esModule", {value: !0})
	Jn.default = pN
	var dN = Le()
	function pN(e, t, r = !1) {
		return (
			(e.object = (0, dN.memberExpression)(
				e.object,
				e.property,
				e.computed
			)),
			(e.property = t),
			(e.computed = !!r),
			e
		)
	}
})
var to = v(Wn => {
	"use strict"
	Object.defineProperty(Wn, "__esModule", {value: !0})
	Wn.default = TN
	var eo = ht(),
		fN = Cn()
	function TN(e, t) {
		if (!e || !t) return e
		for (let r of eo.INHERIT_KEYS.optional) e[r] == null && (e[r] = t[r])
		for (let r of Object.keys(t))
			r[0] === "_" && r !== "__clone" && (e[r] = t[r])
		for (let r of eo.INHERIT_KEYS.force) e[r] = t[r]
		return (0, fN.default)(e, t), e
	}
})
var ro = v(Qn => {
	"use strict"
	Object.defineProperty(Qn, "__esModule", {value: !0})
	Qn.default = yN
	var mN = Le(),
		EN = Dt()
	function yN(e, t) {
		if ((0, EN.isSuper)(e.object))
			throw new Error(
				"Cannot prepend node to super property access (`super.foo`)."
			)
		return (e.object = (0, mN.memberExpression)(t, e.object)), e
	}
})
var ao = v($n => {
	"use strict"
	Object.defineProperty($n, "__esModule", {value: !0})
	$n.default = SN
	function SN(e) {
		let t = [].concat(e),
			r = Object.create(null)
		for (; t.length; ) {
			let a = t.pop()
			if (a)
				switch (a.type) {
					case "ArrayPattern":
						t.push(...a.elements)
						break
					case "AssignmentExpression":
					case "AssignmentPattern":
					case "ForInStatement":
					case "ForOfStatement":
						t.push(a.left)
						break
					case "ObjectPattern":
						t.push(...a.properties)
						break
					case "ObjectProperty":
						t.push(a.value)
						break
					case "RestElement":
					case "UpdateExpression":
						t.push(a.argument)
						break
					case "UnaryExpression":
						a.operator === "delete" && t.push(a.argument)
						break
					case "Identifier":
						r[a.name] = a
						break
					default:
						break
				}
		}
		return r
	}
})
var Zt = v(Zn => {
	"use strict"
	Object.defineProperty(Zn, "__esModule", {value: !0})
	Zn.default = zn
	var Xe = ce()
	function zn(e, t, r, a) {
		let n = [].concat(e),
			i = Object.create(null)
		for (; n.length; ) {
			let l = n.shift()
			if (
				!l ||
				(a &&
					((0, Xe.isAssignmentExpression)(l) ||
						(0, Xe.isUnaryExpression)(l) ||
						(0, Xe.isUpdateExpression)(l)))
			)
				continue
			if ((0, Xe.isIdentifier)(l)) {
				t ? (i[l.name] = i[l.name] || []).push(l) : (i[l.name] = l)
				continue
			}
			if (
				(0, Xe.isExportDeclaration)(l) &&
				!(0, Xe.isExportAllDeclaration)(l)
			) {
				;(0, Xe.isDeclaration)(l.declaration) && n.push(l.declaration)
				continue
			}
			if (r) {
				if ((0, Xe.isFunctionDeclaration)(l)) {
					n.push(l.id)
					continue
				}
				if ((0, Xe.isFunctionExpression)(l)) continue
			}
			let d = zn.keys[l.type]
			if (d)
				for (let S = 0; S < d.length; S++) {
					let g = d[S],
						D = l[g]
					D && (Array.isArray(D) ? n.push(...D) : n.push(D))
				}
		}
		return i
	}
	var bN = {
		DeclareClass: ["id"],
		DeclareFunction: ["id"],
		DeclareModule: ["id"],
		DeclareVariable: ["id"],
		DeclareInterface: ["id"],
		DeclareTypeAlias: ["id"],
		DeclareOpaqueType: ["id"],
		InterfaceDeclaration: ["id"],
		TypeAlias: ["id"],
		OpaqueType: ["id"],
		CatchClause: ["param"],
		LabeledStatement: ["label"],
		UnaryExpression: ["argument"],
		AssignmentExpression: ["left"],
		ImportSpecifier: ["local"],
		ImportNamespaceSpecifier: ["local"],
		ImportDefaultSpecifier: ["local"],
		ImportDeclaration: ["specifiers"],
		TSImportEqualsDeclaration: ["id"],
		ExportSpecifier: ["exported"],
		ExportNamespaceSpecifier: ["exported"],
		ExportDefaultSpecifier: ["exported"],
		FunctionDeclaration: ["id", "params"],
		FunctionExpression: ["id", "params"],
		ArrowFunctionExpression: ["params"],
		ObjectMethod: ["params"],
		ClassMethod: ["params"],
		ClassPrivateMethod: ["params"],
		ForInStatement: ["left"],
		ForOfStatement: ["left"],
		ClassDeclaration: ["id"],
		ClassExpression: ["id"],
		RestElement: ["argument"],
		UpdateExpression: ["argument"],
		ObjectProperty: ["value"],
		AssignmentPattern: ["left"],
		ArrayPattern: ["elements"],
		ObjectPattern: ["properties"],
		VariableDeclaration: ["declarations"],
		VariableDeclarator: ["id"],
	}
	zn.keys = bN
})
var no = v(kr => {
	"use strict"
	Object.defineProperty(kr, "__esModule", {value: !0})
	kr.default = void 0
	var AN = Zt(),
		ew = (kr.default = hN)
	function hN(e, t) {
		return (0, AN.default)(e, t, !0)
	}
})
var io = v(es => {
	"use strict"
	Object.defineProperty(es, "__esModule", {value: !0})
	es.default = IN
	var we = ce()
	function _N(e) {
		return (0, we.isNullLiteral)(e)
			? "null"
			: (0, we.isRegExpLiteral)(e)
			? `/${e.pattern}/${e.flags}`
			: (0, we.isTemplateLiteral)(e)
			? e.quasis.map(t => t.value.raw).join("")
			: e.value !== void 0
			? String(e.value)
			: null
	}
	function so(e) {
		if (!e.computed || (0, we.isLiteral)(e.key)) return e.key
	}
	function IN(e, t) {
		if ("id" in e && e.id) return {name: e.id.name, originalNode: e.id}
		let r = "",
			a
		if (
			((0, we.isObjectProperty)(t, {value: e})
				? (a = so(t))
				: (0, we.isObjectMethod)(e) || (0, we.isClassMethod)(e)
				? ((a = so(e)),
				  e.kind === "get"
						? (r = "get ")
						: e.kind === "set" && (r = "set "))
				: (0, we.isVariableDeclarator)(t, {init: e})
				? (a = t.id)
				: (0, we.isAssignmentExpression)(t, {operator: "=", right: e}) &&
				  (a = t.left),
			!a)
		)
			return null
		let n = (0, we.isLiteral)(a)
			? _N(a)
			: (0, we.isIdentifier)(a)
			? a.name
			: (0, we.isPrivateName)(a)
			? a.id.name
			: null
		return n == null ? null : {name: r + n, originalNode: a}
	}
})
var uo = v(rs => {
	"use strict"
	Object.defineProperty(rs, "__esModule", {value: !0})
	rs.default = DN
	var gN = Be()
	function DN(e, t, r) {
		typeof t == "function" && (t = {enter: t})
		let {enter: a, exit: n} = t
		ts(e, a, n, r, [])
	}
	function ts(e, t, r, a, n) {
		let i = gN.VISITOR_KEYS[e.type]
		if (i) {
			t && t(e, n, a)
			for (let l of i) {
				let d = e[l]
				if (Array.isArray(d))
					for (let S = 0; S < d.length; S++) {
						let g = d[S]
						g &&
							(n.push({node: e, key: l, index: S}),
							ts(g, t, r, a, n),
							n.pop())
					}
				else d && (n.push({node: e, key: l}), ts(d, t, r, a, n), n.pop())
			}
			r && r(e, n, a)
		}
	}
})
var oo = v(as => {
	"use strict"
	Object.defineProperty(as, "__esModule", {value: !0})
	as.default = NN
	var xN = Zt()
	function NN(e, t, r) {
		if (
			r &&
			e.type === "Identifier" &&
			t.type === "ObjectProperty" &&
			r.type === "ObjectExpression"
		)
			return !1
		let a = xN.default.keys[t.type]
		if (a)
			for (let n = 0; n < a.length; n++) {
				let i = a[n],
					l = t[i]
				if (Array.isArray(l)) {
					if (l.includes(e)) return !0
				} else if (l === e) return !0
			}
		return !1
	}
})
var ss = v(ns => {
	"use strict"
	Object.defineProperty(ns, "__esModule", {value: !0})
	ns.default = PN
	var ON = ce()
	lo = Symbol.for("var used to be block scoped")
	var lo
	function PN(e) {
		return (0, ON.isVariableDeclaration)(e) && (e.kind !== "var" || e[lo])
	}
})
var po = v(is => {
	"use strict"
	Object.defineProperty(is, "__esModule", {value: !0})
	is.default = LN
	var co = ce(),
		CN = ss()
	function LN(e) {
		return (
			(0, co.isFunctionDeclaration)(e) ||
			(0, co.isClassDeclaration)(e) ||
			(0, CN.default)(e)
		)
	}
})
var fo = v(us => {
	"use strict"
	Object.defineProperty(us, "__esModule", {value: !0})
	us.default = MN
	var vN = br(),
		RN = ce()
	function MN(e) {
		return (0, vN.default)(e.type, "Immutable")
			? !0
			: (0, RN.isIdentifier)(e)
			? e.name === "undefined"
			: !1
	}
})
var mo = v(ls => {
	"use strict"
	Object.defineProperty(ls, "__esModule", {value: !0})
	ls.default = os
	var To = Be()
	function os(e, t) {
		if (
			typeof e != "object" ||
			typeof t != "object" ||
			e == null ||
			t == null
		)
			return e === t
		if (e.type !== t.type) return !1
		let r = Object.keys(To.NODE_FIELDS[e.type] || e.type),
			a = To.VISITOR_KEYS[e.type]
		for (let n of r) {
			let i = e[n],
				l = t[n]
			if (typeof i != typeof l) return !1
			if (!(i == null && l == null)) {
				if (i == null || l == null) return !1
				if (Array.isArray(i)) {
					if (!Array.isArray(l) || i.length !== l.length) return !1
					for (let d = 0; d < i.length; d++) if (!os(i[d], l[d])) return !1
					continue
				}
				if (typeof i == "object" && !(a != null && a.includes(n))) {
					for (let d of Object.keys(i)) if (i[d] !== l[d]) return !1
					continue
				}
				if (!os(i, l)) return !1
			}
		}
		return !0
	}
})
var Eo = v(cs => {
	"use strict"
	Object.defineProperty(cs, "__esModule", {value: !0})
	cs.default = BN
	function BN(e, t, r) {
		switch (t.type) {
			case "MemberExpression":
			case "OptionalMemberExpression":
				return t.property === e ? !!t.computed : t.object === e
			case "JSXMemberExpression":
				return t.object === e
			case "VariableDeclarator":
				return t.init === e
			case "ArrowFunctionExpression":
				return t.body === e
			case "PrivateName":
				return !1
			case "ClassMethod":
			case "ClassPrivateMethod":
			case "ObjectMethod":
				return t.key === e ? !!t.computed : !1
			case "ObjectProperty":
				return t.key === e ? !!t.computed : !r || r.type !== "ObjectPattern"
			case "ClassProperty":
			case "ClassAccessorProperty":
				return t.key === e ? !!t.computed : !0
			case "ClassPrivateProperty":
				return t.key !== e
			case "ClassDeclaration":
			case "ClassExpression":
				return t.superClass === e
			case "AssignmentExpression":
				return t.right === e
			case "AssignmentPattern":
				return t.right === e
			case "LabeledStatement":
				return !1
			case "CatchClause":
				return !1
			case "RestElement":
				return !1
			case "BreakStatement":
			case "ContinueStatement":
				return !1
			case "FunctionDeclaration":
			case "FunctionExpression":
				return !1
			case "ExportNamespaceSpecifier":
			case "ExportDefaultSpecifier":
				return !1
			case "ExportSpecifier":
				return r != null && r.source ? !1 : t.local === e
			case "ImportDefaultSpecifier":
			case "ImportNamespaceSpecifier":
			case "ImportSpecifier":
				return !1
			case "ImportAttribute":
				return !1
			case "JSXAttribute":
				return !1
			case "ObjectPattern":
			case "ArrayPattern":
				return !1
			case "MetaProperty":
				return !1
			case "ObjectTypeProperty":
				return t.key !== e
			case "TSEnumMember":
				return t.id !== e
			case "TSPropertySignature":
				return t.key === e ? !!t.computed : !0
		}
		return !0
	}
})
var yo = v(ds => {
	"use strict"
	Object.defineProperty(ds, "__esModule", {value: !0})
	ds.default = wN
	var dt = ce()
	function wN(e, t) {
		return (0, dt.isBlockStatement)(e) &&
			((0, dt.isFunction)(t) || (0, dt.isCatchClause)(t))
			? !1
			: (0, dt.isPattern)(e) &&
			  ((0, dt.isFunction)(t) || (0, dt.isCatchClause)(t))
			? !0
			: (0, dt.isScopable)(e)
	}
})
var bo = v(ps => {
	"use strict"
	Object.defineProperty(ps, "__esModule", {value: !0})
	ps.default = FN
	var So = ce()
	function FN(e) {
		return (
			(0, So.isImportDefaultSpecifier)(e) ||
			(0, So.isIdentifier)(e.imported || e.exported, {name: "default"})
		)
	}
})
var Ao = v(fs => {
	"use strict"
	Object.defineProperty(fs, "__esModule", {value: !0})
	fs.default = GN
	var kN = At(),
		UN = new Set([
			"abstract",
			"boolean",
			"byte",
			"char",
			"double",
			"enum",
			"final",
			"float",
			"goto",
			"implements",
			"int",
			"interface",
			"long",
			"native",
			"package",
			"private",
			"protected",
			"public",
			"short",
			"static",
			"synchronized",
			"throws",
			"transient",
			"volatile",
		])
	function GN(e) {
		return (0, kN.default)(e) && !UN.has(e)
	}
})
var _o = v(Ts => {
	"use strict"
	Object.defineProperty(Ts, "__esModule", {value: !0})
	Ts.default = HN
	var qN = ce()
	ho = Symbol.for("var used to be block scoped")
	var ho
	function HN(e) {
		return (0, qN.isVariableDeclaration)(e, {kind: "var"}) && !e[ho]
	}
})
var Io = v(ys => {
	"use strict"
	Object.defineProperty(ys, "__esModule", {value: !0})
	ys.default = Ur
	var jN = Zt(),
		pt = ce(),
		ms = Le(),
		Es = pn(),
		YN = ze()
	function Ur(e, t) {
		let r = [],
			a = !0
		for (let n of e)
			if (((0, pt.isEmptyStatement)(n) || (a = !1), (0, pt.isExpression)(n)))
				r.push(n)
			else if ((0, pt.isExpressionStatement)(n)) r.push(n.expression)
			else if ((0, pt.isVariableDeclaration)(n)) {
				if (n.kind !== "var") return
				for (let i of n.declarations) {
					let l = (0, jN.default)(i)
					for (let d of Object.keys(l))
						t.push({kind: n.kind, id: (0, YN.default)(l[d])})
					i.init && r.push((0, ms.assignmentExpression)("=", i.id, i.init))
				}
				a = !0
			} else if ((0, pt.isIfStatement)(n)) {
				let i = n.consequent
						? Ur([n.consequent], t)
						: (0, Es.buildUndefinedNode)(),
					l = n.alternate
						? Ur([n.alternate], t)
						: (0, Es.buildUndefinedNode)()
				if (!i || !l) return
				r.push((0, ms.conditionalExpression)(n.test, i, l))
			} else if ((0, pt.isBlockStatement)(n)) {
				let i = Ur(n.body, t)
				if (!i) return
				r.push(i)
			} else if ((0, pt.isEmptyStatement)(n)) e.indexOf(n) === 0 && (a = !0)
			else return
		return (
			a && r.push((0, Es.buildUndefinedNode)()),
			r.length === 1 ? r[0] : (0, ms.sequenceExpression)(r)
		)
	}
})
var go = v(Ss => {
	"use strict"
	Object.defineProperty(Ss, "__esModule", {value: !0})
	Ss.default = KN
	var VN = Io()
	function KN(e, t) {
		if (!(e != null && e.length)) return
		let r = [],
			a = (0, VN.default)(e, r)
		if (a) {
			for (let n of r) t.push(n)
			return a
		}
	}
})
var Dt = v(H => {
	"use strict"
	Object.defineProperty(H, "__esModule", {value: !0})
	var Ze = {
		react: !0,
		assertNode: !0,
		createTypeAnnotationBasedOnTypeof: !0,
		createUnionTypeAnnotation: !0,
		createFlowUnionType: !0,
		createTSUnionType: !0,
		cloneNode: !0,
		clone: !0,
		cloneDeep: !0,
		cloneDeepWithoutLoc: !0,
		cloneWithoutLoc: !0,
		addComment: !0,
		addComments: !0,
		inheritInnerComments: !0,
		inheritLeadingComments: !0,
		inheritsComments: !0,
		inheritTrailingComments: !0,
		removeComments: !0,
		ensureBlock: !0,
		toBindingIdentifierName: !0,
		toBlock: !0,
		toComputedKey: !0,
		toExpression: !0,
		toIdentifier: !0,
		toKeyAlias: !0,
		toStatement: !0,
		valueToNode: !0,
		appendToMemberExpression: !0,
		inherits: !0,
		prependToMemberExpression: !0,
		removeProperties: !0,
		removePropertiesDeep: !0,
		removeTypeDuplicates: !0,
		getAssignmentIdentifiers: !0,
		getBindingIdentifiers: !0,
		getOuterBindingIdentifiers: !0,
		getFunctionName: !0,
		traverse: !0,
		traverseFast: !0,
		shallowEqual: !0,
		is: !0,
		isBinding: !0,
		isBlockScoped: !0,
		isImmutable: !0,
		isLet: !0,
		isNode: !0,
		isNodesEquivalent: !0,
		isPlaceholderType: !0,
		isReferenced: !0,
		isScope: !0,
		isSpecifierDefault: !0,
		isType: !0,
		isValidES3Identifier: !0,
		isValidIdentifier: !0,
		isVar: !0,
		matchesPattern: !0,
		validate: !0,
		buildMatchMemberExpression: !0,
		__internal__deprecationWarning: !0,
	}
	Object.defineProperty(H, "__internal__deprecationWarning", {
		enumerable: !0,
		get: function () {
			return QO.default
		},
	})
	Object.defineProperty(H, "addComment", {
		enumerable: !0,
		get: function () {
			return nO.default
		},
	})
	Object.defineProperty(H, "addComments", {
		enumerable: !0,
		get: function () {
			return sO.default
		},
	})
	Object.defineProperty(H, "appendToMemberExpression", {
		enumerable: !0,
		get: function () {
			return AO.default
		},
	})
	Object.defineProperty(H, "assertNode", {
		enumerable: !0,
		get: function () {
			return QN.default
		},
	})
	Object.defineProperty(H, "buildMatchMemberExpression", {
		enumerable: !0,
		get: function () {
			return WO.default
		},
	})
	Object.defineProperty(H, "clone", {
		enumerable: !0,
		get: function () {
			return eO.default
		},
	})
	Object.defineProperty(H, "cloneDeep", {
		enumerable: !0,
		get: function () {
			return tO.default
		},
	})
	Object.defineProperty(H, "cloneDeepWithoutLoc", {
		enumerable: !0,
		get: function () {
			return rO.default
		},
	})
	Object.defineProperty(H, "cloneNode", {
		enumerable: !0,
		get: function () {
			return ZN.default
		},
	})
	Object.defineProperty(H, "cloneWithoutLoc", {
		enumerable: !0,
		get: function () {
			return aO.default
		},
	})
	Object.defineProperty(H, "createFlowUnionType", {
		enumerable: !0,
		get: function () {
			return Do.default
		},
	})
	Object.defineProperty(H, "createTSUnionType", {
		enumerable: !0,
		get: function () {
			return zN.default
		},
	})
	Object.defineProperty(H, "createTypeAnnotationBasedOnTypeof", {
		enumerable: !0,
		get: function () {
			return $N.default
		},
	})
	Object.defineProperty(H, "createUnionTypeAnnotation", {
		enumerable: !0,
		get: function () {
			return Do.default
		},
	})
	Object.defineProperty(H, "ensureBlock", {
		enumerable: !0,
		get: function () {
			return dO.default
		},
	})
	Object.defineProperty(H, "getAssignmentIdentifiers", {
		enumerable: !0,
		get: function () {
			return xO.default
		},
	})
	Object.defineProperty(H, "getBindingIdentifiers", {
		enumerable: !0,
		get: function () {
			return NO.default
		},
	})
	Object.defineProperty(H, "getFunctionName", {
		enumerable: !0,
		get: function () {
			return PO.default
		},
	})
	Object.defineProperty(H, "getOuterBindingIdentifiers", {
		enumerable: !0,
		get: function () {
			return OO.default
		},
	})
	Object.defineProperty(H, "inheritInnerComments", {
		enumerable: !0,
		get: function () {
			return iO.default
		},
	})
	Object.defineProperty(H, "inheritLeadingComments", {
		enumerable: !0,
		get: function () {
			return uO.default
		},
	})
	Object.defineProperty(H, "inheritTrailingComments", {
		enumerable: !0,
		get: function () {
			return lO.default
		},
	})
	Object.defineProperty(H, "inherits", {
		enumerable: !0,
		get: function () {
			return hO.default
		},
	})
	Object.defineProperty(H, "inheritsComments", {
		enumerable: !0,
		get: function () {
			return oO.default
		},
	})
	Object.defineProperty(H, "is", {
		enumerable: !0,
		get: function () {
			return vO.default
		},
	})
	Object.defineProperty(H, "isBinding", {
		enumerable: !0,
		get: function () {
			return RO.default
		},
	})
	Object.defineProperty(H, "isBlockScoped", {
		enumerable: !0,
		get: function () {
			return MO.default
		},
	})
	Object.defineProperty(H, "isImmutable", {
		enumerable: !0,
		get: function () {
			return BO.default
		},
	})
	Object.defineProperty(H, "isLet", {
		enumerable: !0,
		get: function () {
			return wO.default
		},
	})
	Object.defineProperty(H, "isNode", {
		enumerable: !0,
		get: function () {
			return FO.default
		},
	})
	Object.defineProperty(H, "isNodesEquivalent", {
		enumerable: !0,
		get: function () {
			return kO.default
		},
	})
	Object.defineProperty(H, "isPlaceholderType", {
		enumerable: !0,
		get: function () {
			return UO.default
		},
	})
	Object.defineProperty(H, "isReferenced", {
		enumerable: !0,
		get: function () {
			return GO.default
		},
	})
	Object.defineProperty(H, "isScope", {
		enumerable: !0,
		get: function () {
			return qO.default
		},
	})
	Object.defineProperty(H, "isSpecifierDefault", {
		enumerable: !0,
		get: function () {
			return HO.default
		},
	})
	Object.defineProperty(H, "isType", {
		enumerable: !0,
		get: function () {
			return jO.default
		},
	})
	Object.defineProperty(H, "isValidES3Identifier", {
		enumerable: !0,
		get: function () {
			return YO.default
		},
	})
	Object.defineProperty(H, "isValidIdentifier", {
		enumerable: !0,
		get: function () {
			return VO.default
		},
	})
	Object.defineProperty(H, "isVar", {
		enumerable: !0,
		get: function () {
			return KO.default
		},
	})
	Object.defineProperty(H, "matchesPattern", {
		enumerable: !0,
		get: function () {
			return XO.default
		},
	})
	Object.defineProperty(H, "prependToMemberExpression", {
		enumerable: !0,
		get: function () {
			return _O.default
		},
	})
	H.react = void 0
	Object.defineProperty(H, "removeComments", {
		enumerable: !0,
		get: function () {
			return cO.default
		},
	})
	Object.defineProperty(H, "removeProperties", {
		enumerable: !0,
		get: function () {
			return IO.default
		},
	})
	Object.defineProperty(H, "removePropertiesDeep", {
		enumerable: !0,
		get: function () {
			return gO.default
		},
	})
	Object.defineProperty(H, "removeTypeDuplicates", {
		enumerable: !0,
		get: function () {
			return DO.default
		},
	})
	Object.defineProperty(H, "shallowEqual", {
		enumerable: !0,
		get: function () {
			return LO.default
		},
	})
	Object.defineProperty(H, "toBindingIdentifierName", {
		enumerable: !0,
		get: function () {
			return pO.default
		},
	})
	Object.defineProperty(H, "toBlock", {
		enumerable: !0,
		get: function () {
			return fO.default
		},
	})
	Object.defineProperty(H, "toComputedKey", {
		enumerable: !0,
		get: function () {
			return TO.default
		},
	})
	Object.defineProperty(H, "toExpression", {
		enumerable: !0,
		get: function () {
			return mO.default
		},
	})
	Object.defineProperty(H, "toIdentifier", {
		enumerable: !0,
		get: function () {
			return EO.default
		},
	})
	Object.defineProperty(H, "toKeyAlias", {
		enumerable: !0,
		get: function () {
			return yO.default
		},
	})
	Object.defineProperty(H, "toStatement", {
		enumerable: !0,
		get: function () {
			return SO.default
		},
	})
	Object.defineProperty(H, "traverse", {
		enumerable: !0,
		get: function () {
			return Gr.default
		},
	})
	Object.defineProperty(H, "traverseFast", {
		enumerable: !0,
		get: function () {
			return CO.default
		},
	})
	Object.defineProperty(H, "validate", {
		enumerable: !0,
		get: function () {
			return JO.default
		},
	})
	Object.defineProperty(H, "valueToNode", {
		enumerable: !0,
		get: function () {
			return bO.default
		},
	})
	var XN = xi(),
		JN = Ni(),
		WN = bu(),
		QN = Au(),
		bs = hu()
	Object.keys(bs).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			Object.prototype.hasOwnProperty.call(Ze, e) ||
			(e in H && H[e] === bs[e]) ||
			Object.defineProperty(H, e, {
				enumerable: !0,
				get: function () {
					return bs[e]
				},
			})
	})
	var $N = _u(),
		Do = Du(),
		zN = Pu(),
		As = pn()
	Object.keys(As).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			Object.prototype.hasOwnProperty.call(Ze, e) ||
			(e in H && H[e] === As[e]) ||
			Object.defineProperty(H, e, {
				enumerable: !0,
				get: function () {
					return As[e]
				},
			})
	})
	var hs = Le()
	Object.keys(hs).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			Object.prototype.hasOwnProperty.call(Ze, e) ||
			(e in H && H[e] === hs[e]) ||
			Object.defineProperty(H, e, {
				enumerable: !0,
				get: function () {
					return hs[e]
				},
			})
	})
	var ZN = ze(),
		eO = Bu(),
		tO = wu(),
		rO = Fu(),
		aO = ku(),
		nO = Uu(),
		sO = An(),
		iO = gn(),
		uO = xn(),
		oO = Cn(),
		lO = On(),
		cO = Gu(),
		_s = qu()
	Object.keys(_s).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			Object.prototype.hasOwnProperty.call(Ze, e) ||
			(e in H && H[e] === _s[e]) ||
			Object.defineProperty(H, e, {
				enumerable: !0,
				get: function () {
					return _s[e]
				},
			})
	})
	var Is = ht()
	Object.keys(Is).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			Object.prototype.hasOwnProperty.call(Ze, e) ||
			(e in H && H[e] === Is[e]) ||
			Object.defineProperty(H, e, {
				enumerable: !0,
				get: function () {
					return Is[e]
				},
			})
	})
	var dO = Hu(),
		pO = ju(),
		fO = Mn(),
		TO = Yu(),
		mO = Vu(),
		EO = Fn(),
		yO = Qu(),
		SO = $u(),
		bO = zu(),
		gs = Be()
	Object.keys(gs).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			Object.prototype.hasOwnProperty.call(Ze, e) ||
			(e in H && H[e] === gs[e]) ||
			Object.defineProperty(H, e, {
				enumerable: !0,
				get: function () {
					return gs[e]
				},
			})
	})
	var AO = Zu(),
		hO = to(),
		_O = ro(),
		IO = jn(),
		gO = Vn(),
		DO = un(),
		xO = ao(),
		NO = Zt(),
		OO = no(),
		PO = io(),
		Gr = uo()
	Object.keys(Gr).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			Object.prototype.hasOwnProperty.call(Ze, e) ||
			(e in H && H[e] === Gr[e]) ||
			Object.defineProperty(H, e, {
				enumerable: !0,
				get: function () {
					return Gr[e]
				},
			})
	})
	var CO = qn(),
		LO = yr(),
		vO = bt(),
		RO = oo(),
		MO = po(),
		BO = fo(),
		wO = ss(),
		FO = an(),
		kO = mo(),
		UO = Oa(),
		GO = Eo(),
		qO = yo(),
		HO = bo(),
		jO = br(),
		YO = Ao(),
		VO = At(),
		KO = _o(),
		XO = _a(),
		JO = gr(),
		WO = ga(),
		Ds = ce()
	Object.keys(Ds).forEach(function (e) {
		e === "default" ||
			e === "__esModule" ||
			Object.prototype.hasOwnProperty.call(Ze, e) ||
			(e in H && H[e] === Ds[e]) ||
			Object.defineProperty(H, e, {
				enumerable: !0,
				get: function () {
					return Ds[e]
				},
			})
	})
	var QO = St(),
		$O = go(),
		Ew = (H.react = {
			isReactComponent: XN.default,
			isCompatTag: JN.default,
			buildChildren: WN.default,
		})
	H.toSequenceExpression = $O.default
	__Process$.env.BABEL_TYPES_8_BREAKING &&
		console.warn(
			"BABEL_TYPES_8_BREAKING is not supported anymore. Use the latest Babel 8.0.0 pre-release instead!"
		)
})
var Oo = v(Hr => {
	"use strict"
	Object.defineProperty(Hr, "__esModule", {value: !0})
	Hr.default = void 0
	var ke = Ai("node:assert"),
		zO = Dt(),
		{
			callExpression: xs,
			cloneNode: qr,
			expressionStatement: xo,
			identifier: er,
			importDeclaration: ZO,
			importDefaultSpecifier: eP,
			importNamespaceSpecifier: tP,
			importSpecifier: rP,
			memberExpression: Ns,
			stringLiteral: No,
			variableDeclaration: aP,
			variableDeclarator: nP,
		} = zO,
		Os = class {
			constructor(t, r, a) {
				;(this._statements = []),
					(this._resultName = null),
					(this._importedSource = void 0),
					(this._scope = r),
					(this._hub = a),
					(this._importedSource = t)
			}
			done() {
				return {statements: this._statements, resultName: this._resultName}
			}
			import() {
				return this._statements.push(ZO([], No(this._importedSource))), this
			}
			require() {
				return (
					this._statements.push(
						xo(xs(er("require"), [No(this._importedSource)]))
					),
					this
				)
			}
			namespace(t = "namespace") {
				let r = this._scope.generateUidIdentifier(t),
					a = this._statements[this._statements.length - 1]
				return (
					ke(a.type === "ImportDeclaration"),
					ke(a.specifiers.length === 0),
					(a.specifiers = [tP(r)]),
					(this._resultName = qr(r)),
					this
				)
			}
			default(t) {
				let r = this._scope.generateUidIdentifier(t),
					a = this._statements[this._statements.length - 1]
				return (
					ke(a.type === "ImportDeclaration"),
					ke(a.specifiers.length === 0),
					(a.specifiers = [eP(r)]),
					(this._resultName = qr(r)),
					this
				)
			}
			named(t, r) {
				if (r === "default") return this.default(t)
				let a = this._scope.generateUidIdentifier(t),
					n = this._statements[this._statements.length - 1]
				return (
					ke(n.type === "ImportDeclaration"),
					ke(n.specifiers.length === 0),
					(n.specifiers = [rP(a, er(r))]),
					(this._resultName = qr(a)),
					this
				)
			}
			var(t) {
				let r = this._scope.generateUidIdentifier(t),
					a = this._statements[this._statements.length - 1]
				return (
					a.type !== "ExpressionStatement" &&
						(ke(this._resultName),
						(a = xo(this._resultName)),
						this._statements.push(a)),
					(this._statements[this._statements.length - 1] = aP("var", [
						nP(r, a.expression),
					])),
					(this._resultName = qr(r)),
					this
				)
			}
			defaultInterop() {
				return this._interop(this._hub.addHelper("interopRequireDefault"))
			}
			wildcardInterop() {
				return this._interop(this._hub.addHelper("interopRequireWildcard"))
			}
			_interop(t) {
				let r = this._statements[this._statements.length - 1]
				return (
					r.type === "ExpressionStatement"
						? (r.expression = xs(t, [r.expression]))
						: r.type === "VariableDeclaration"
						? (ke(r.declarations.length === 1),
						  (r.declarations[0].init = xs(t, [r.declarations[0].init])))
						: ke.fail("Unexpected type."),
					this
				)
			}
			prop(t) {
				let r = this._statements[this._statements.length - 1]
				return (
					r.type === "ExpressionStatement"
						? (r.expression = Ns(r.expression, er(t)))
						: r.type === "VariableDeclaration"
						? (ke(r.declarations.length === 1),
						  (r.declarations[0].init = Ns(
								r.declarations[0].init,
								er(t)
						  )))
						: ke.fail("Unexpected type:" + r.type),
					this
				)
			}
			read(t) {
				this._resultName = Ns(this._resultName, er(t))
			}
		}
	Hr.default = Os
})
var Cs = v(Ps => {
	"use strict"
	Object.defineProperty(Ps, "__esModule", {value: !0})
	Ps.default = sP
	function sP(e) {
		let {sourceType: t} = e.node
		if (t !== "module" && t !== "script")
			throw e.buildCodeFrameError(
				`Unknown sourceType "${t}", cannot transform.`
			)
		return e.node.sourceType === "module"
	}
})
var Co = v(jr => {
	"use strict"
	Object.defineProperty(jr, "__esModule", {value: !0})
	jr.default = void 0
	var Po = Ai("node:assert"),
		iP = Dt(),
		uP = Oo(),
		oP = Cs(),
		{numericLiteral: lP, sequenceExpression: cP} = iP,
		Ls = class {
			constructor(t, r, a) {
				this._defaultOpts = {
					importedSource: null,
					importedType: "commonjs",
					importedInterop: "babel",
					importingInterop: "babel",
					ensureLiveReference: !1,
					ensureNoContext: !1,
					importPosition: "before",
				}
				let n = t.find(i => i.isProgram())
				;(this._programPath = n),
					(this._programScope = n.scope),
					(this._hub = n.hub),
					(this._defaultOpts = this._applyDefaults(r, a, !0))
			}
			addDefault(t, r) {
				return this.addNamed("default", t, r)
			}
			addNamed(t, r, a) {
				return (
					Po(typeof t == "string"),
					this._generateImport(this._applyDefaults(r, a), t)
				)
			}
			addNamespace(t, r) {
				return this._generateImport(this._applyDefaults(t, r), null)
			}
			addSideEffect(t, r) {
				return this._generateImport(this._applyDefaults(t, r), void 0)
			}
			_applyDefaults(t, r, a = !1) {
				let n
				return (
					typeof t == "string"
						? (n = Object.assign(
								{},
								this._defaultOpts,
								{importedSource: t},
								r
						  ))
						: (Po(!r, "Unexpected secondary arguments."),
						  (n = Object.assign({}, this._defaultOpts, t))),
					!a &&
						r &&
						(r.nameHint !== void 0 && (n.nameHint = r.nameHint),
						r.blockHoist !== void 0 && (n.blockHoist = r.blockHoist)),
					n
				)
			}
			_generateImport(t, r) {
				let a = r === "default",
					n = !!r && !a,
					i = r === null,
					{
						importedSource: l,
						importedType: d,
						importedInterop: S,
						importingInterop: g,
						ensureLiveReference: D,
						ensureNoContext: x,
						nameHint: M,
						importPosition: w,
						blockHoist: U,
					} = t,
					R = M || r,
					z = (0, oP.default)(this._programPath),
					F = z && g === "node",
					V = z && g === "babel"
				if (w === "after" && !z)
					throw new Error(
						'"importPosition": "after" is only supported in modules'
					)
				let C = new uP.default(l, this._programScope, this._hub)
				if (d === "es6") {
					if (!F && !V)
						throw new Error("Cannot import an ES6 module from CommonJS")
					C.import(), i ? C.namespace(M || l) : (a || n) && C.named(R, r)
				} else {
					if (d !== "commonjs")
						throw new Error(`Unexpected interopType "${d}"`)
					if (S === "babel")
						if (F) {
							R = R !== "default" ? R : l
							let Q = `${l}$es6Default`
							C.import(),
								i
									? C.default(Q)
											.var(R || l)
											.wildcardInterop()
									: a
									? D
										? C.default(Q)
												.var(R || l)
												.defaultInterop()
												.read("default")
										: C.default(Q).var(R).defaultInterop().prop(r)
									: n && C.default(Q).read(r)
						} else
							V
								? (C.import(),
								  i ? C.namespace(R || l) : (a || n) && C.named(R, r))
								: (C.require(),
								  i
										? C.var(R || l).wildcardInterop()
										: (a || n) && D
										? a
											? ((R = R !== "default" ? R : l),
											  C.var(R).read(r),
											  C.defaultInterop())
											: C.var(l).read(r)
										: a
										? C.var(R).defaultInterop().prop(r)
										: n && C.var(R).prop(r))
					else if (S === "compiled")
						F
							? (C.import(),
							  i ? C.default(R || l) : (a || n) && C.default(l).read(R))
							: V
							? (C.import(),
							  i ? C.namespace(R || l) : (a || n) && C.named(R, r))
							: (C.require(),
							  i
									? C.var(R || l)
									: (a || n) &&
									  (D ? C.var(l).read(R) : C.prop(r).var(R)))
					else if (S === "uncompiled") {
						if (a && D)
							throw new Error("No live reference for commonjs default")
						F
							? (C.import(),
							  i
									? C.default(R || l)
									: a
									? C.default(R)
									: n && C.default(l).read(R))
							: V
							? (C.import(),
							  i
									? C.default(R || l)
									: a
									? C.default(R)
									: n && C.named(R, r))
							: (C.require(),
							  i
									? C.var(R || l)
									: a
									? C.var(R)
									: n && (D ? C.var(l).read(R) : C.var(R).prop(r)))
					} else throw new Error(`Unknown importedInterop "${S}".`)
				}
				let {statements: J, resultName: ae} = C.done()
				return (
					this._insertStatements(J, w, U),
					(a || n) && x && ae.type !== "Identifier" ? cP([lP(0), ae]) : ae
				)
			}
			_insertStatements(t, r = "before", a = 3) {
				let n = this._programPath.get("body")
				if (r === "after") {
					for (let i = n.length - 1; i >= 0; i--)
						if (n[i].isImportDeclaration()) {
							n[i].insertAfter(t)
							return
						}
				} else {
					t.forEach(l => {
						l._blockHoist = a
					})
					let i = n.find(l => {
						let d = l.node._blockHoist
						return Number.isFinite(d) && d < 4
					})
					if (i) {
						i.insertBefore(t)
						return
					}
				}
				this._programPath.unshiftContainer("body", t)
			}
		}
	jr.default = Ls
})
var Lo = v(et => {
	"use strict"
	Object.defineProperty(et, "__esModule", {value: !0})
	Object.defineProperty(et, "ImportInjector", {
		enumerable: !0,
		get: function () {
			return tr.default
		},
	})
	et.addDefault = pP
	et.addNamed = fP
	et.addNamespace = TP
	et.addSideEffect = mP
	Object.defineProperty(et, "isModule", {
		enumerable: !0,
		get: function () {
			return dP.default
		},
	})
	var tr = Co(),
		dP = Cs()
	function pP(e, t, r) {
		return new tr.default(e).addDefault(t, r)
	}
	function fP(e, t, r, a) {
		return new tr.default(e).addNamed(t, r, a)
	}
	function TP(e, t, r) {
		return new tr.default(e).addNamespace(t, r)
	}
	function mP(e, t, r) {
		return new tr.default(e).addSideEffect(t, r)
	}
})
var vo = v(Yr => {
	"use strict"
	Object.defineProperty(Yr, "__esModule", {value: !0})
	Yr.bodyRegExps = {
		xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
		html4: /&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
		html5: /&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
	}
	Yr.namedReferences = {
		xml: {
			entities: {
				"&lt;": "<",
				"&gt;": ">",
				"&quot;": '"',
				"&apos;": "'",
				"&amp;": "&",
			},
			characters: {
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&apos;",
				"&": "&amp;",
			},
		},
		html4: {
			entities: {
				"&apos;": "'",
				"&nbsp": "\xA0",
				"&nbsp;": "\xA0",
				"&iexcl": "\xA1",
				"&iexcl;": "\xA1",
				"&cent": "\xA2",
				"&cent;": "\xA2",
				"&pound": "\xA3",
				"&pound;": "\xA3",
				"&curren": "\xA4",
				"&curren;": "\xA4",
				"&yen": "\xA5",
				"&yen;": "\xA5",
				"&brvbar": "\xA6",
				"&brvbar;": "\xA6",
				"&sect": "\xA7",
				"&sect;": "\xA7",
				"&uml": "\xA8",
				"&uml;": "\xA8",
				"&copy": "\xA9",
				"&copy;": "\xA9",
				"&ordf": "\xAA",
				"&ordf;": "\xAA",
				"&laquo": "\xAB",
				"&laquo;": "\xAB",
				"&not": "\xAC",
				"&not;": "\xAC",
				"&shy": "\xAD",
				"&shy;": "\xAD",
				"&reg": "\xAE",
				"&reg;": "\xAE",
				"&macr": "\xAF",
				"&macr;": "\xAF",
				"&deg": "\xB0",
				"&deg;": "\xB0",
				"&plusmn": "\xB1",
				"&plusmn;": "\xB1",
				"&sup2": "\xB2",
				"&sup2;": "\xB2",
				"&sup3": "\xB3",
				"&sup3;": "\xB3",
				"&acute": "\xB4",
				"&acute;": "\xB4",
				"&micro": "\xB5",
				"&micro;": "\xB5",
				"&para": "\xB6",
				"&para;": "\xB6",
				"&middot": "\xB7",
				"&middot;": "\xB7",
				"&cedil": "\xB8",
				"&cedil;": "\xB8",
				"&sup1": "\xB9",
				"&sup1;": "\xB9",
				"&ordm": "\xBA",
				"&ordm;": "\xBA",
				"&raquo": "\xBB",
				"&raquo;": "\xBB",
				"&frac14": "\xBC",
				"&frac14;": "\xBC",
				"&frac12": "\xBD",
				"&frac12;": "\xBD",
				"&frac34": "\xBE",
				"&frac34;": "\xBE",
				"&iquest": "\xBF",
				"&iquest;": "\xBF",
				"&Agrave": "\xC0",
				"&Agrave;": "\xC0",
				"&Aacute": "\xC1",
				"&Aacute;": "\xC1",
				"&Acirc": "\xC2",
				"&Acirc;": "\xC2",
				"&Atilde": "\xC3",
				"&Atilde;": "\xC3",
				"&Auml": "\xC4",
				"&Auml;": "\xC4",
				"&Aring": "\xC5",
				"&Aring;": "\xC5",
				"&AElig": "\xC6",
				"&AElig;": "\xC6",
				"&Ccedil": "\xC7",
				"&Ccedil;": "\xC7",
				"&Egrave": "\xC8",
				"&Egrave;": "\xC8",
				"&Eacute": "\xC9",
				"&Eacute;": "\xC9",
				"&Ecirc": "\xCA",
				"&Ecirc;": "\xCA",
				"&Euml": "\xCB",
				"&Euml;": "\xCB",
				"&Igrave": "\xCC",
				"&Igrave;": "\xCC",
				"&Iacute": "\xCD",
				"&Iacute;": "\xCD",
				"&Icirc": "\xCE",
				"&Icirc;": "\xCE",
				"&Iuml": "\xCF",
				"&Iuml;": "\xCF",
				"&ETH": "\xD0",
				"&ETH;": "\xD0",
				"&Ntilde": "\xD1",
				"&Ntilde;": "\xD1",
				"&Ograve": "\xD2",
				"&Ograve;": "\xD2",
				"&Oacute": "\xD3",
				"&Oacute;": "\xD3",
				"&Ocirc": "\xD4",
				"&Ocirc;": "\xD4",
				"&Otilde": "\xD5",
				"&Otilde;": "\xD5",
				"&Ouml": "\xD6",
				"&Ouml;": "\xD6",
				"&times": "\xD7",
				"&times;": "\xD7",
				"&Oslash": "\xD8",
				"&Oslash;": "\xD8",
				"&Ugrave": "\xD9",
				"&Ugrave;": "\xD9",
				"&Uacute": "\xDA",
				"&Uacute;": "\xDA",
				"&Ucirc": "\xDB",
				"&Ucirc;": "\xDB",
				"&Uuml": "\xDC",
				"&Uuml;": "\xDC",
				"&Yacute": "\xDD",
				"&Yacute;": "\xDD",
				"&THORN": "\xDE",
				"&THORN;": "\xDE",
				"&szlig": "\xDF",
				"&szlig;": "\xDF",
				"&agrave": "\xE0",
				"&agrave;": "\xE0",
				"&aacute": "\xE1",
				"&aacute;": "\xE1",
				"&acirc": "\xE2",
				"&acirc;": "\xE2",
				"&atilde": "\xE3",
				"&atilde;": "\xE3",
				"&auml": "\xE4",
				"&auml;": "\xE4",
				"&aring": "\xE5",
				"&aring;": "\xE5",
				"&aelig": "\xE6",
				"&aelig;": "\xE6",
				"&ccedil": "\xE7",
				"&ccedil;": "\xE7",
				"&egrave": "\xE8",
				"&egrave;": "\xE8",
				"&eacute": "\xE9",
				"&eacute;": "\xE9",
				"&ecirc": "\xEA",
				"&ecirc;": "\xEA",
				"&euml": "\xEB",
				"&euml;": "\xEB",
				"&igrave": "\xEC",
				"&igrave;": "\xEC",
				"&iacute": "\xED",
				"&iacute;": "\xED",
				"&icirc": "\xEE",
				"&icirc;": "\xEE",
				"&iuml": "\xEF",
				"&iuml;": "\xEF",
				"&eth": "\xF0",
				"&eth;": "\xF0",
				"&ntilde": "\xF1",
				"&ntilde;": "\xF1",
				"&ograve": "\xF2",
				"&ograve;": "\xF2",
				"&oacute": "\xF3",
				"&oacute;": "\xF3",
				"&ocirc": "\xF4",
				"&ocirc;": "\xF4",
				"&otilde": "\xF5",
				"&otilde;": "\xF5",
				"&ouml": "\xF6",
				"&ouml;": "\xF6",
				"&divide": "\xF7",
				"&divide;": "\xF7",
				"&oslash": "\xF8",
				"&oslash;": "\xF8",
				"&ugrave": "\xF9",
				"&ugrave;": "\xF9",
				"&uacute": "\xFA",
				"&uacute;": "\xFA",
				"&ucirc": "\xFB",
				"&ucirc;": "\xFB",
				"&uuml": "\xFC",
				"&uuml;": "\xFC",
				"&yacute": "\xFD",
				"&yacute;": "\xFD",
				"&thorn": "\xFE",
				"&thorn;": "\xFE",
				"&yuml": "\xFF",
				"&yuml;": "\xFF",
				"&quot": '"',
				"&quot;": '"',
				"&amp": "&",
				"&amp;": "&",
				"&lt": "<",
				"&lt;": "<",
				"&gt": ">",
				"&gt;": ">",
				"&OElig;": "\u0152",
				"&oelig;": "\u0153",
				"&Scaron;": "\u0160",
				"&scaron;": "\u0161",
				"&Yuml;": "\u0178",
				"&circ;": "\u02C6",
				"&tilde;": "\u02DC",
				"&ensp;": "\u2002",
				"&emsp;": "\u2003",
				"&thinsp;": "\u2009",
				"&zwnj;": "\u200C",
				"&zwj;": "\u200D",
				"&lrm;": "\u200E",
				"&rlm;": "\u200F",
				"&ndash;": "\u2013",
				"&mdash;": "\u2014",
				"&lsquo;": "\u2018",
				"&rsquo;": "\u2019",
				"&sbquo;": "\u201A",
				"&ldquo;": "\u201C",
				"&rdquo;": "\u201D",
				"&bdquo;": "\u201E",
				"&dagger;": "\u2020",
				"&Dagger;": "\u2021",
				"&permil;": "\u2030",
				"&lsaquo;": "\u2039",
				"&rsaquo;": "\u203A",
				"&euro;": "\u20AC",
				"&fnof;": "\u0192",
				"&Alpha;": "\u0391",
				"&Beta;": "\u0392",
				"&Gamma;": "\u0393",
				"&Delta;": "\u0394",
				"&Epsilon;": "\u0395",
				"&Zeta;": "\u0396",
				"&Eta;": "\u0397",
				"&Theta;": "\u0398",
				"&Iota;": "\u0399",
				"&Kappa;": "\u039A",
				"&Lambda;": "\u039B",
				"&Mu;": "\u039C",
				"&Nu;": "\u039D",
				"&Xi;": "\u039E",
				"&Omicron;": "\u039F",
				"&Pi;": "\u03A0",
				"&Rho;": "\u03A1",
				"&Sigma;": "\u03A3",
				"&Tau;": "\u03A4",
				"&Upsilon;": "\u03A5",
				"&Phi;": "\u03A6",
				"&Chi;": "\u03A7",
				"&Psi;": "\u03A8",
				"&Omega;": "\u03A9",
				"&alpha;": "\u03B1",
				"&beta;": "\u03B2",
				"&gamma;": "\u03B3",
				"&delta;": "\u03B4",
				"&epsilon;": "\u03B5",
				"&zeta;": "\u03B6",
				"&eta;": "\u03B7",
				"&theta;": "\u03B8",
				"&iota;": "\u03B9",
				"&kappa;": "\u03BA",
				"&lambda;": "\u03BB",
				"&mu;": "\u03BC",
				"&nu;": "\u03BD",
				"&xi;": "\u03BE",
				"&omicron;": "\u03BF",
				"&pi;": "\u03C0",
				"&rho;": "\u03C1",
				"&sigmaf;": "\u03C2",
				"&sigma;": "\u03C3",
				"&tau;": "\u03C4",
				"&upsilon;": "\u03C5",
				"&phi;": "\u03C6",
				"&chi;": "\u03C7",
				"&psi;": "\u03C8",
				"&omega;": "\u03C9",
				"&thetasym;": "\u03D1",
				"&upsih;": "\u03D2",
				"&piv;": "\u03D6",
				"&bull;": "\u2022",
				"&hellip;": "\u2026",
				"&prime;": "\u2032",
				"&Prime;": "\u2033",
				"&oline;": "\u203E",
				"&frasl;": "\u2044",
				"&weierp;": "\u2118",
				"&image;": "\u2111",
				"&real;": "\u211C",
				"&trade;": "\u2122",
				"&alefsym;": "\u2135",
				"&larr;": "\u2190",
				"&uarr;": "\u2191",
				"&rarr;": "\u2192",
				"&darr;": "\u2193",
				"&harr;": "\u2194",
				"&crarr;": "\u21B5",
				"&lArr;": "\u21D0",
				"&uArr;": "\u21D1",
				"&rArr;": "\u21D2",
				"&dArr;": "\u21D3",
				"&hArr;": "\u21D4",
				"&forall;": "\u2200",
				"&part;": "\u2202",
				"&exist;": "\u2203",
				"&empty;": "\u2205",
				"&nabla;": "\u2207",
				"&isin;": "\u2208",
				"&notin;": "\u2209",
				"&ni;": "\u220B",
				"&prod;": "\u220F",
				"&sum;": "\u2211",
				"&minus;": "\u2212",
				"&lowast;": "\u2217",
				"&radic;": "\u221A",
				"&prop;": "\u221D",
				"&infin;": "\u221E",
				"&ang;": "\u2220",
				"&and;": "\u2227",
				"&or;": "\u2228",
				"&cap;": "\u2229",
				"&cup;": "\u222A",
				"&int;": "\u222B",
				"&there4;": "\u2234",
				"&sim;": "\u223C",
				"&cong;": "\u2245",
				"&asymp;": "\u2248",
				"&ne;": "\u2260",
				"&equiv;": "\u2261",
				"&le;": "\u2264",
				"&ge;": "\u2265",
				"&sub;": "\u2282",
				"&sup;": "\u2283",
				"&nsub;": "\u2284",
				"&sube;": "\u2286",
				"&supe;": "\u2287",
				"&oplus;": "\u2295",
				"&otimes;": "\u2297",
				"&perp;": "\u22A5",
				"&sdot;": "\u22C5",
				"&lceil;": "\u2308",
				"&rceil;": "\u2309",
				"&lfloor;": "\u230A",
				"&rfloor;": "\u230B",
				"&lang;": "\u2329",
				"&rang;": "\u232A",
				"&loz;": "\u25CA",
				"&spades;": "\u2660",
				"&clubs;": "\u2663",
				"&hearts;": "\u2665",
				"&diams;": "\u2666",
			},
			characters: {
				"'": "&apos;",
				"\xA0": "&nbsp;",
				"\xA1": "&iexcl;",
				"\xA2": "&cent;",
				"\xA3": "&pound;",
				"\xA4": "&curren;",
				"\xA5": "&yen;",
				"\xA6": "&brvbar;",
				"\xA7": "&sect;",
				"\xA8": "&uml;",
				"\xA9": "&copy;",
				ª: "&ordf;",
				"\xAB": "&laquo;",
				"\xAC": "&not;",
				"\xAD": "&shy;",
				"\xAE": "&reg;",
				"\xAF": "&macr;",
				"\xB0": "&deg;",
				"\xB1": "&plusmn;",
				"\xB2": "&sup2;",
				"\xB3": "&sup3;",
				"\xB4": "&acute;",
				µ: "&micro;",
				"\xB6": "&para;",
				"\xB7": "&middot;",
				"\xB8": "&cedil;",
				"\xB9": "&sup1;",
				º: "&ordm;",
				"\xBB": "&raquo;",
				"\xBC": "&frac14;",
				"\xBD": "&frac12;",
				"\xBE": "&frac34;",
				"\xBF": "&iquest;",
				À: "&Agrave;",
				Á: "&Aacute;",
				Â: "&Acirc;",
				Ã: "&Atilde;",
				Ä: "&Auml;",
				Å: "&Aring;",
				Æ: "&AElig;",
				Ç: "&Ccedil;",
				È: "&Egrave;",
				É: "&Eacute;",
				Ê: "&Ecirc;",
				Ë: "&Euml;",
				Ì: "&Igrave;",
				Í: "&Iacute;",
				Î: "&Icirc;",
				Ï: "&Iuml;",
				Ð: "&ETH;",
				Ñ: "&Ntilde;",
				Ò: "&Ograve;",
				Ó: "&Oacute;",
				Ô: "&Ocirc;",
				Õ: "&Otilde;",
				Ö: "&Ouml;",
				"\xD7": "&times;",
				Ø: "&Oslash;",
				Ù: "&Ugrave;",
				Ú: "&Uacute;",
				Û: "&Ucirc;",
				Ü: "&Uuml;",
				Ý: "&Yacute;",
				Þ: "&THORN;",
				ß: "&szlig;",
				à: "&agrave;",
				á: "&aacute;",
				â: "&acirc;",
				ã: "&atilde;",
				ä: "&auml;",
				å: "&aring;",
				æ: "&aelig;",
				ç: "&ccedil;",
				è: "&egrave;",
				é: "&eacute;",
				ê: "&ecirc;",
				ë: "&euml;",
				ì: "&igrave;",
				í: "&iacute;",
				î: "&icirc;",
				ï: "&iuml;",
				ð: "&eth;",
				ñ: "&ntilde;",
				ò: "&ograve;",
				ó: "&oacute;",
				ô: "&ocirc;",
				õ: "&otilde;",
				ö: "&ouml;",
				"\xF7": "&divide;",
				ø: "&oslash;",
				ù: "&ugrave;",
				ú: "&uacute;",
				û: "&ucirc;",
				ü: "&uuml;",
				ý: "&yacute;",
				þ: "&thorn;",
				ÿ: "&yuml;",
				'"': "&quot;",
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				Œ: "&OElig;",
				œ: "&oelig;",
				Š: "&Scaron;",
				š: "&scaron;",
				Ÿ: "&Yuml;",
				"\u02C6": "&circ;",
				"\u02DC": "&tilde;",
				"\u2002": "&ensp;",
				"\u2003": "&emsp;",
				"\u2009": "&thinsp;",
				"\u200C": "&zwnj;",
				"\u200D": "&zwj;",
				"\u200E": "&lrm;",
				"\u200F": "&rlm;",
				"\u2013": "&ndash;",
				"\u2014": "&mdash;",
				"\u2018": "&lsquo;",
				"\u2019": "&rsquo;",
				"\u201A": "&sbquo;",
				"\u201C": "&ldquo;",
				"\u201D": "&rdquo;",
				"\u201E": "&bdquo;",
				"\u2020": "&dagger;",
				"\u2021": "&Dagger;",
				"\u2030": "&permil;",
				"\u2039": "&lsaquo;",
				"\u203A": "&rsaquo;",
				"\u20AC": "&euro;",
				ƒ: "&fnof;",
				Α: "&Alpha;",
				Β: "&Beta;",
				Γ: "&Gamma;",
				Δ: "&Delta;",
				Ε: "&Epsilon;",
				Ζ: "&Zeta;",
				Η: "&Eta;",
				Θ: "&Theta;",
				Ι: "&Iota;",
				Κ: "&Kappa;",
				Λ: "&Lambda;",
				Μ: "&Mu;",
				Ν: "&Nu;",
				Ξ: "&Xi;",
				Ο: "&Omicron;",
				Π: "&Pi;",
				Ρ: "&Rho;",
				Σ: "&Sigma;",
				Τ: "&Tau;",
				Υ: "&Upsilon;",
				Φ: "&Phi;",
				Χ: "&Chi;",
				Ψ: "&Psi;",
				Ω: "&Omega;",
				α: "&alpha;",
				β: "&beta;",
				γ: "&gamma;",
				δ: "&delta;",
				ε: "&epsilon;",
				ζ: "&zeta;",
				η: "&eta;",
				θ: "&theta;",
				ι: "&iota;",
				κ: "&kappa;",
				λ: "&lambda;",
				μ: "&mu;",
				ν: "&nu;",
				ξ: "&xi;",
				ο: "&omicron;",
				π: "&pi;",
				ρ: "&rho;",
				ς: "&sigmaf;",
				σ: "&sigma;",
				τ: "&tau;",
				υ: "&upsilon;",
				φ: "&phi;",
				χ: "&chi;",
				ψ: "&psi;",
				ω: "&omega;",
				ϑ: "&thetasym;",
				ϒ: "&upsih;",
				ϖ: "&piv;",
				"\u2022": "&bull;",
				"\u2026": "&hellip;",
				"\u2032": "&prime;",
				"\u2033": "&Prime;",
				"\u203E": "&oline;",
				"\u2044": "&frasl;",
				"\u2118": "&weierp;",
				ℑ: "&image;",
				ℜ: "&real;",
				"\u2122": "&trade;",
				ℵ: "&alefsym;",
				"\u2190": "&larr;",
				"\u2191": "&uarr;",
				"\u2192": "&rarr;",
				"\u2193": "&darr;",
				"\u2194": "&harr;",
				"\u21B5": "&crarr;",
				"\u21D0": "&lArr;",
				"\u21D1": "&uArr;",
				"\u21D2": "&rArr;",
				"\u21D3": "&dArr;",
				"\u21D4": "&hArr;",
				"\u2200": "&forall;",
				"\u2202": "&part;",
				"\u2203": "&exist;",
				"\u2205": "&empty;",
				"\u2207": "&nabla;",
				"\u2208": "&isin;",
				"\u2209": "&notin;",
				"\u220B": "&ni;",
				"\u220F": "&prod;",
				"\u2211": "&sum;",
				"\u2212": "&minus;",
				"\u2217": "&lowast;",
				"\u221A": "&radic;",
				"\u221D": "&prop;",
				"\u221E": "&infin;",
				"\u2220": "&ang;",
				"\u2227": "&and;",
				"\u2228": "&or;",
				"\u2229": "&cap;",
				"\u222A": "&cup;",
				"\u222B": "&int;",
				"\u2234": "&there4;",
				"\u223C": "&sim;",
				"\u2245": "&cong;",
				"\u2248": "&asymp;",
				"\u2260": "&ne;",
				"\u2261": "&equiv;",
				"\u2264": "&le;",
				"\u2265": "&ge;",
				"\u2282": "&sub;",
				"\u2283": "&sup;",
				"\u2284": "&nsub;",
				"\u2286": "&sube;",
				"\u2287": "&supe;",
				"\u2295": "&oplus;",
				"\u2297": "&otimes;",
				"\u22A5": "&perp;",
				"\u22C5": "&sdot;",
				"\u2308": "&lceil;",
				"\u2309": "&rceil;",
				"\u230A": "&lfloor;",
				"\u230B": "&rfloor;",
				"\u2329": "&lang;",
				"\u232A": "&rang;",
				"\u25CA": "&loz;",
				"\u2660": "&spades;",
				"\u2663": "&clubs;",
				"\u2665": "&hearts;",
				"\u2666": "&diams;",
			},
		},
		html5: {
			entities: {
				"&AElig": "\xC6",
				"&AElig;": "\xC6",
				"&AMP": "&",
				"&AMP;": "&",
				"&Aacute": "\xC1",
				"&Aacute;": "\xC1",
				"&Abreve;": "\u0102",
				"&Acirc": "\xC2",
				"&Acirc;": "\xC2",
				"&Acy;": "\u0410",
				"&Afr;": "\u{1D504}",
				"&Agrave": "\xC0",
				"&Agrave;": "\xC0",
				"&Alpha;": "\u0391",
				"&Amacr;": "\u0100",
				"&And;": "\u2A53",
				"&Aogon;": "\u0104",
				"&Aopf;": "\u{1D538}",
				"&ApplyFunction;": "\u2061",
				"&Aring": "\xC5",
				"&Aring;": "\xC5",
				"&Ascr;": "\u{1D49C}",
				"&Assign;": "\u2254",
				"&Atilde": "\xC3",
				"&Atilde;": "\xC3",
				"&Auml": "\xC4",
				"&Auml;": "\xC4",
				"&Backslash;": "\u2216",
				"&Barv;": "\u2AE7",
				"&Barwed;": "\u2306",
				"&Bcy;": "\u0411",
				"&Because;": "\u2235",
				"&Bernoullis;": "\u212C",
				"&Beta;": "\u0392",
				"&Bfr;": "\u{1D505}",
				"&Bopf;": "\u{1D539}",
				"&Breve;": "\u02D8",
				"&Bscr;": "\u212C",
				"&Bumpeq;": "\u224E",
				"&CHcy;": "\u0427",
				"&COPY": "\xA9",
				"&COPY;": "\xA9",
				"&Cacute;": "\u0106",
				"&Cap;": "\u22D2",
				"&CapitalDifferentialD;": "\u2145",
				"&Cayleys;": "\u212D",
				"&Ccaron;": "\u010C",
				"&Ccedil": "\xC7",
				"&Ccedil;": "\xC7",
				"&Ccirc;": "\u0108",
				"&Cconint;": "\u2230",
				"&Cdot;": "\u010A",
				"&Cedilla;": "\xB8",
				"&CenterDot;": "\xB7",
				"&Cfr;": "\u212D",
				"&Chi;": "\u03A7",
				"&CircleDot;": "\u2299",
				"&CircleMinus;": "\u2296",
				"&CirclePlus;": "\u2295",
				"&CircleTimes;": "\u2297",
				"&ClockwiseContourIntegral;": "\u2232",
				"&CloseCurlyDoubleQuote;": "\u201D",
				"&CloseCurlyQuote;": "\u2019",
				"&Colon;": "\u2237",
				"&Colone;": "\u2A74",
				"&Congruent;": "\u2261",
				"&Conint;": "\u222F",
				"&ContourIntegral;": "\u222E",
				"&Copf;": "\u2102",
				"&Coproduct;": "\u2210",
				"&CounterClockwiseContourIntegral;": "\u2233",
				"&Cross;": "\u2A2F",
				"&Cscr;": "\u{1D49E}",
				"&Cup;": "\u22D3",
				"&CupCap;": "\u224D",
				"&DD;": "\u2145",
				"&DDotrahd;": "\u2911",
				"&DJcy;": "\u0402",
				"&DScy;": "\u0405",
				"&DZcy;": "\u040F",
				"&Dagger;": "\u2021",
				"&Darr;": "\u21A1",
				"&Dashv;": "\u2AE4",
				"&Dcaron;": "\u010E",
				"&Dcy;": "\u0414",
				"&Del;": "\u2207",
				"&Delta;": "\u0394",
				"&Dfr;": "\u{1D507}",
				"&DiacriticalAcute;": "\xB4",
				"&DiacriticalDot;": "\u02D9",
				"&DiacriticalDoubleAcute;": "\u02DD",
				"&DiacriticalGrave;": "`",
				"&DiacriticalTilde;": "\u02DC",
				"&Diamond;": "\u22C4",
				"&DifferentialD;": "\u2146",
				"&Dopf;": "\u{1D53B}",
				"&Dot;": "\xA8",
				"&DotDot;": "\u20DC",
				"&DotEqual;": "\u2250",
				"&DoubleContourIntegral;": "\u222F",
				"&DoubleDot;": "\xA8",
				"&DoubleDownArrow;": "\u21D3",
				"&DoubleLeftArrow;": "\u21D0",
				"&DoubleLeftRightArrow;": "\u21D4",
				"&DoubleLeftTee;": "\u2AE4",
				"&DoubleLongLeftArrow;": "\u27F8",
				"&DoubleLongLeftRightArrow;": "\u27FA",
				"&DoubleLongRightArrow;": "\u27F9",
				"&DoubleRightArrow;": "\u21D2",
				"&DoubleRightTee;": "\u22A8",
				"&DoubleUpArrow;": "\u21D1",
				"&DoubleUpDownArrow;": "\u21D5",
				"&DoubleVerticalBar;": "\u2225",
				"&DownArrow;": "\u2193",
				"&DownArrowBar;": "\u2913",
				"&DownArrowUpArrow;": "\u21F5",
				"&DownBreve;": "\u0311",
				"&DownLeftRightVector;": "\u2950",
				"&DownLeftTeeVector;": "\u295E",
				"&DownLeftVector;": "\u21BD",
				"&DownLeftVectorBar;": "\u2956",
				"&DownRightTeeVector;": "\u295F",
				"&DownRightVector;": "\u21C1",
				"&DownRightVectorBar;": "\u2957",
				"&DownTee;": "\u22A4",
				"&DownTeeArrow;": "\u21A7",
				"&Downarrow;": "\u21D3",
				"&Dscr;": "\u{1D49F}",
				"&Dstrok;": "\u0110",
				"&ENG;": "\u014A",
				"&ETH": "\xD0",
				"&ETH;": "\xD0",
				"&Eacute": "\xC9",
				"&Eacute;": "\xC9",
				"&Ecaron;": "\u011A",
				"&Ecirc": "\xCA",
				"&Ecirc;": "\xCA",
				"&Ecy;": "\u042D",
				"&Edot;": "\u0116",
				"&Efr;": "\u{1D508}",
				"&Egrave": "\xC8",
				"&Egrave;": "\xC8",
				"&Element;": "\u2208",
				"&Emacr;": "\u0112",
				"&EmptySmallSquare;": "\u25FB",
				"&EmptyVerySmallSquare;": "\u25AB",
				"&Eogon;": "\u0118",
				"&Eopf;": "\u{1D53C}",
				"&Epsilon;": "\u0395",
				"&Equal;": "\u2A75",
				"&EqualTilde;": "\u2242",
				"&Equilibrium;": "\u21CC",
				"&Escr;": "\u2130",
				"&Esim;": "\u2A73",
				"&Eta;": "\u0397",
				"&Euml": "\xCB",
				"&Euml;": "\xCB",
				"&Exists;": "\u2203",
				"&ExponentialE;": "\u2147",
				"&Fcy;": "\u0424",
				"&Ffr;": "\u{1D509}",
				"&FilledSmallSquare;": "\u25FC",
				"&FilledVerySmallSquare;": "\u25AA",
				"&Fopf;": "\u{1D53D}",
				"&ForAll;": "\u2200",
				"&Fouriertrf;": "\u2131",
				"&Fscr;": "\u2131",
				"&GJcy;": "\u0403",
				"&GT": ">",
				"&GT;": ">",
				"&Gamma;": "\u0393",
				"&Gammad;": "\u03DC",
				"&Gbreve;": "\u011E",
				"&Gcedil;": "\u0122",
				"&Gcirc;": "\u011C",
				"&Gcy;": "\u0413",
				"&Gdot;": "\u0120",
				"&Gfr;": "\u{1D50A}",
				"&Gg;": "\u22D9",
				"&Gopf;": "\u{1D53E}",
				"&GreaterEqual;": "\u2265",
				"&GreaterEqualLess;": "\u22DB",
				"&GreaterFullEqual;": "\u2267",
				"&GreaterGreater;": "\u2AA2",
				"&GreaterLess;": "\u2277",
				"&GreaterSlantEqual;": "\u2A7E",
				"&GreaterTilde;": "\u2273",
				"&Gscr;": "\u{1D4A2}",
				"&Gt;": "\u226B",
				"&HARDcy;": "\u042A",
				"&Hacek;": "\u02C7",
				"&Hat;": "^",
				"&Hcirc;": "\u0124",
				"&Hfr;": "\u210C",
				"&HilbertSpace;": "\u210B",
				"&Hopf;": "\u210D",
				"&HorizontalLine;": "\u2500",
				"&Hscr;": "\u210B",
				"&Hstrok;": "\u0126",
				"&HumpDownHump;": "\u224E",
				"&HumpEqual;": "\u224F",
				"&IEcy;": "\u0415",
				"&IJlig;": "\u0132",
				"&IOcy;": "\u0401",
				"&Iacute": "\xCD",
				"&Iacute;": "\xCD",
				"&Icirc": "\xCE",
				"&Icirc;": "\xCE",
				"&Icy;": "\u0418",
				"&Idot;": "\u0130",
				"&Ifr;": "\u2111",
				"&Igrave": "\xCC",
				"&Igrave;": "\xCC",
				"&Im;": "\u2111",
				"&Imacr;": "\u012A",
				"&ImaginaryI;": "\u2148",
				"&Implies;": "\u21D2",
				"&Int;": "\u222C",
				"&Integral;": "\u222B",
				"&Intersection;": "\u22C2",
				"&InvisibleComma;": "\u2063",
				"&InvisibleTimes;": "\u2062",
				"&Iogon;": "\u012E",
				"&Iopf;": "\u{1D540}",
				"&Iota;": "\u0399",
				"&Iscr;": "\u2110",
				"&Itilde;": "\u0128",
				"&Iukcy;": "\u0406",
				"&Iuml": "\xCF",
				"&Iuml;": "\xCF",
				"&Jcirc;": "\u0134",
				"&Jcy;": "\u0419",
				"&Jfr;": "\u{1D50D}",
				"&Jopf;": "\u{1D541}",
				"&Jscr;": "\u{1D4A5}",
				"&Jsercy;": "\u0408",
				"&Jukcy;": "\u0404",
				"&KHcy;": "\u0425",
				"&KJcy;": "\u040C",
				"&Kappa;": "\u039A",
				"&Kcedil;": "\u0136",
				"&Kcy;": "\u041A",
				"&Kfr;": "\u{1D50E}",
				"&Kopf;": "\u{1D542}",
				"&Kscr;": "\u{1D4A6}",
				"&LJcy;": "\u0409",
				"&LT": "<",
				"&LT;": "<",
				"&Lacute;": "\u0139",
				"&Lambda;": "\u039B",
				"&Lang;": "\u27EA",
				"&Laplacetrf;": "\u2112",
				"&Larr;": "\u219E",
				"&Lcaron;": "\u013D",
				"&Lcedil;": "\u013B",
				"&Lcy;": "\u041B",
				"&LeftAngleBracket;": "\u27E8",
				"&LeftArrow;": "\u2190",
				"&LeftArrowBar;": "\u21E4",
				"&LeftArrowRightArrow;": "\u21C6",
				"&LeftCeiling;": "\u2308",
				"&LeftDoubleBracket;": "\u27E6",
				"&LeftDownTeeVector;": "\u2961",
				"&LeftDownVector;": "\u21C3",
				"&LeftDownVectorBar;": "\u2959",
				"&LeftFloor;": "\u230A",
				"&LeftRightArrow;": "\u2194",
				"&LeftRightVector;": "\u294E",
				"&LeftTee;": "\u22A3",
				"&LeftTeeArrow;": "\u21A4",
				"&LeftTeeVector;": "\u295A",
				"&LeftTriangle;": "\u22B2",
				"&LeftTriangleBar;": "\u29CF",
				"&LeftTriangleEqual;": "\u22B4",
				"&LeftUpDownVector;": "\u2951",
				"&LeftUpTeeVector;": "\u2960",
				"&LeftUpVector;": "\u21BF",
				"&LeftUpVectorBar;": "\u2958",
				"&LeftVector;": "\u21BC",
				"&LeftVectorBar;": "\u2952",
				"&Leftarrow;": "\u21D0",
				"&Leftrightarrow;": "\u21D4",
				"&LessEqualGreater;": "\u22DA",
				"&LessFullEqual;": "\u2266",
				"&LessGreater;": "\u2276",
				"&LessLess;": "\u2AA1",
				"&LessSlantEqual;": "\u2A7D",
				"&LessTilde;": "\u2272",
				"&Lfr;": "\u{1D50F}",
				"&Ll;": "\u22D8",
				"&Lleftarrow;": "\u21DA",
				"&Lmidot;": "\u013F",
				"&LongLeftArrow;": "\u27F5",
				"&LongLeftRightArrow;": "\u27F7",
				"&LongRightArrow;": "\u27F6",
				"&Longleftarrow;": "\u27F8",
				"&Longleftrightarrow;": "\u27FA",
				"&Longrightarrow;": "\u27F9",
				"&Lopf;": "\u{1D543}",
				"&LowerLeftArrow;": "\u2199",
				"&LowerRightArrow;": "\u2198",
				"&Lscr;": "\u2112",
				"&Lsh;": "\u21B0",
				"&Lstrok;": "\u0141",
				"&Lt;": "\u226A",
				"&Map;": "\u2905",
				"&Mcy;": "\u041C",
				"&MediumSpace;": "\u205F",
				"&Mellintrf;": "\u2133",
				"&Mfr;": "\u{1D510}",
				"&MinusPlus;": "\u2213",
				"&Mopf;": "\u{1D544}",
				"&Mscr;": "\u2133",
				"&Mu;": "\u039C",
				"&NJcy;": "\u040A",
				"&Nacute;": "\u0143",
				"&Ncaron;": "\u0147",
				"&Ncedil;": "\u0145",
				"&Ncy;": "\u041D",
				"&NegativeMediumSpace;": "\u200B",
				"&NegativeThickSpace;": "\u200B",
				"&NegativeThinSpace;": "\u200B",
				"&NegativeVeryThinSpace;": "\u200B",
				"&NestedGreaterGreater;": "\u226B",
				"&NestedLessLess;": "\u226A",
				"&NewLine;": `
`,
				"&Nfr;": "\u{1D511}",
				"&NoBreak;": "\u2060",
				"&NonBreakingSpace;": "\xA0",
				"&Nopf;": "\u2115",
				"&Not;": "\u2AEC",
				"&NotCongruent;": "\u2262",
				"&NotCupCap;": "\u226D",
				"&NotDoubleVerticalBar;": "\u2226",
				"&NotElement;": "\u2209",
				"&NotEqual;": "\u2260",
				"&NotEqualTilde;": "\u2242\u0338",
				"&NotExists;": "\u2204",
				"&NotGreater;": "\u226F",
				"&NotGreaterEqual;": "\u2271",
				"&NotGreaterFullEqual;": "\u2267\u0338",
				"&NotGreaterGreater;": "\u226B\u0338",
				"&NotGreaterLess;": "\u2279",
				"&NotGreaterSlantEqual;": "\u2A7E\u0338",
				"&NotGreaterTilde;": "\u2275",
				"&NotHumpDownHump;": "\u224E\u0338",
				"&NotHumpEqual;": "\u224F\u0338",
				"&NotLeftTriangle;": "\u22EA",
				"&NotLeftTriangleBar;": "\u29CF\u0338",
				"&NotLeftTriangleEqual;": "\u22EC",
				"&NotLess;": "\u226E",
				"&NotLessEqual;": "\u2270",
				"&NotLessGreater;": "\u2278",
				"&NotLessLess;": "\u226A\u0338",
				"&NotLessSlantEqual;": "\u2A7D\u0338",
				"&NotLessTilde;": "\u2274",
				"&NotNestedGreaterGreater;": "\u2AA2\u0338",
				"&NotNestedLessLess;": "\u2AA1\u0338",
				"&NotPrecedes;": "\u2280",
				"&NotPrecedesEqual;": "\u2AAF\u0338",
				"&NotPrecedesSlantEqual;": "\u22E0",
				"&NotReverseElement;": "\u220C",
				"&NotRightTriangle;": "\u22EB",
				"&NotRightTriangleBar;": "\u29D0\u0338",
				"&NotRightTriangleEqual;": "\u22ED",
				"&NotSquareSubset;": "\u228F\u0338",
				"&NotSquareSubsetEqual;": "\u22E2",
				"&NotSquareSuperset;": "\u2290\u0338",
				"&NotSquareSupersetEqual;": "\u22E3",
				"&NotSubset;": "\u2282\u20D2",
				"&NotSubsetEqual;": "\u2288",
				"&NotSucceeds;": "\u2281",
				"&NotSucceedsEqual;": "\u2AB0\u0338",
				"&NotSucceedsSlantEqual;": "\u22E1",
				"&NotSucceedsTilde;": "\u227F\u0338",
				"&NotSuperset;": "\u2283\u20D2",
				"&NotSupersetEqual;": "\u2289",
				"&NotTilde;": "\u2241",
				"&NotTildeEqual;": "\u2244",
				"&NotTildeFullEqual;": "\u2247",
				"&NotTildeTilde;": "\u2249",
				"&NotVerticalBar;": "\u2224",
				"&Nscr;": "\u{1D4A9}",
				"&Ntilde": "\xD1",
				"&Ntilde;": "\xD1",
				"&Nu;": "\u039D",
				"&OElig;": "\u0152",
				"&Oacute": "\xD3",
				"&Oacute;": "\xD3",
				"&Ocirc": "\xD4",
				"&Ocirc;": "\xD4",
				"&Ocy;": "\u041E",
				"&Odblac;": "\u0150",
				"&Ofr;": "\u{1D512}",
				"&Ograve": "\xD2",
				"&Ograve;": "\xD2",
				"&Omacr;": "\u014C",
				"&Omega;": "\u03A9",
				"&Omicron;": "\u039F",
				"&Oopf;": "\u{1D546}",
				"&OpenCurlyDoubleQuote;": "\u201C",
				"&OpenCurlyQuote;": "\u2018",
				"&Or;": "\u2A54",
				"&Oscr;": "\u{1D4AA}",
				"&Oslash": "\xD8",
				"&Oslash;": "\xD8",
				"&Otilde": "\xD5",
				"&Otilde;": "\xD5",
				"&Otimes;": "\u2A37",
				"&Ouml": "\xD6",
				"&Ouml;": "\xD6",
				"&OverBar;": "\u203E",
				"&OverBrace;": "\u23DE",
				"&OverBracket;": "\u23B4",
				"&OverParenthesis;": "\u23DC",
				"&PartialD;": "\u2202",
				"&Pcy;": "\u041F",
				"&Pfr;": "\u{1D513}",
				"&Phi;": "\u03A6",
				"&Pi;": "\u03A0",
				"&PlusMinus;": "\xB1",
				"&Poincareplane;": "\u210C",
				"&Popf;": "\u2119",
				"&Pr;": "\u2ABB",
				"&Precedes;": "\u227A",
				"&PrecedesEqual;": "\u2AAF",
				"&PrecedesSlantEqual;": "\u227C",
				"&PrecedesTilde;": "\u227E",
				"&Prime;": "\u2033",
				"&Product;": "\u220F",
				"&Proportion;": "\u2237",
				"&Proportional;": "\u221D",
				"&Pscr;": "\u{1D4AB}",
				"&Psi;": "\u03A8",
				"&QUOT": '"',
				"&QUOT;": '"',
				"&Qfr;": "\u{1D514}",
				"&Qopf;": "\u211A",
				"&Qscr;": "\u{1D4AC}",
				"&RBarr;": "\u2910",
				"&REG": "\xAE",
				"&REG;": "\xAE",
				"&Racute;": "\u0154",
				"&Rang;": "\u27EB",
				"&Rarr;": "\u21A0",
				"&Rarrtl;": "\u2916",
				"&Rcaron;": "\u0158",
				"&Rcedil;": "\u0156",
				"&Rcy;": "\u0420",
				"&Re;": "\u211C",
				"&ReverseElement;": "\u220B",
				"&ReverseEquilibrium;": "\u21CB",
				"&ReverseUpEquilibrium;": "\u296F",
				"&Rfr;": "\u211C",
				"&Rho;": "\u03A1",
				"&RightAngleBracket;": "\u27E9",
				"&RightArrow;": "\u2192",
				"&RightArrowBar;": "\u21E5",
				"&RightArrowLeftArrow;": "\u21C4",
				"&RightCeiling;": "\u2309",
				"&RightDoubleBracket;": "\u27E7",
				"&RightDownTeeVector;": "\u295D",
				"&RightDownVector;": "\u21C2",
				"&RightDownVectorBar;": "\u2955",
				"&RightFloor;": "\u230B",
				"&RightTee;": "\u22A2",
				"&RightTeeArrow;": "\u21A6",
				"&RightTeeVector;": "\u295B",
				"&RightTriangle;": "\u22B3",
				"&RightTriangleBar;": "\u29D0",
				"&RightTriangleEqual;": "\u22B5",
				"&RightUpDownVector;": "\u294F",
				"&RightUpTeeVector;": "\u295C",
				"&RightUpVector;": "\u21BE",
				"&RightUpVectorBar;": "\u2954",
				"&RightVector;": "\u21C0",
				"&RightVectorBar;": "\u2953",
				"&Rightarrow;": "\u21D2",
				"&Ropf;": "\u211D",
				"&RoundImplies;": "\u2970",
				"&Rrightarrow;": "\u21DB",
				"&Rscr;": "\u211B",
				"&Rsh;": "\u21B1",
				"&RuleDelayed;": "\u29F4",
				"&SHCHcy;": "\u0429",
				"&SHcy;": "\u0428",
				"&SOFTcy;": "\u042C",
				"&Sacute;": "\u015A",
				"&Sc;": "\u2ABC",
				"&Scaron;": "\u0160",
				"&Scedil;": "\u015E",
				"&Scirc;": "\u015C",
				"&Scy;": "\u0421",
				"&Sfr;": "\u{1D516}",
				"&ShortDownArrow;": "\u2193",
				"&ShortLeftArrow;": "\u2190",
				"&ShortRightArrow;": "\u2192",
				"&ShortUpArrow;": "\u2191",
				"&Sigma;": "\u03A3",
				"&SmallCircle;": "\u2218",
				"&Sopf;": "\u{1D54A}",
				"&Sqrt;": "\u221A",
				"&Square;": "\u25A1",
				"&SquareIntersection;": "\u2293",
				"&SquareSubset;": "\u228F",
				"&SquareSubsetEqual;": "\u2291",
				"&SquareSuperset;": "\u2290",
				"&SquareSupersetEqual;": "\u2292",
				"&SquareUnion;": "\u2294",
				"&Sscr;": "\u{1D4AE}",
				"&Star;": "\u22C6",
				"&Sub;": "\u22D0",
				"&Subset;": "\u22D0",
				"&SubsetEqual;": "\u2286",
				"&Succeeds;": "\u227B",
				"&SucceedsEqual;": "\u2AB0",
				"&SucceedsSlantEqual;": "\u227D",
				"&SucceedsTilde;": "\u227F",
				"&SuchThat;": "\u220B",
				"&Sum;": "\u2211",
				"&Sup;": "\u22D1",
				"&Superset;": "\u2283",
				"&SupersetEqual;": "\u2287",
				"&Supset;": "\u22D1",
				"&THORN": "\xDE",
				"&THORN;": "\xDE",
				"&TRADE;": "\u2122",
				"&TSHcy;": "\u040B",
				"&TScy;": "\u0426",
				"&Tab;": "	",
				"&Tau;": "\u03A4",
				"&Tcaron;": "\u0164",
				"&Tcedil;": "\u0162",
				"&Tcy;": "\u0422",
				"&Tfr;": "\u{1D517}",
				"&Therefore;": "\u2234",
				"&Theta;": "\u0398",
				"&ThickSpace;": "\u205F\u200A",
				"&ThinSpace;": "\u2009",
				"&Tilde;": "\u223C",
				"&TildeEqual;": "\u2243",
				"&TildeFullEqual;": "\u2245",
				"&TildeTilde;": "\u2248",
				"&Topf;": "\u{1D54B}",
				"&TripleDot;": "\u20DB",
				"&Tscr;": "\u{1D4AF}",
				"&Tstrok;": "\u0166",
				"&Uacute": "\xDA",
				"&Uacute;": "\xDA",
				"&Uarr;": "\u219F",
				"&Uarrocir;": "\u2949",
				"&Ubrcy;": "\u040E",
				"&Ubreve;": "\u016C",
				"&Ucirc": "\xDB",
				"&Ucirc;": "\xDB",
				"&Ucy;": "\u0423",
				"&Udblac;": "\u0170",
				"&Ufr;": "\u{1D518}",
				"&Ugrave": "\xD9",
				"&Ugrave;": "\xD9",
				"&Umacr;": "\u016A",
				"&UnderBar;": "_",
				"&UnderBrace;": "\u23DF",
				"&UnderBracket;": "\u23B5",
				"&UnderParenthesis;": "\u23DD",
				"&Union;": "\u22C3",
				"&UnionPlus;": "\u228E",
				"&Uogon;": "\u0172",
				"&Uopf;": "\u{1D54C}",
				"&UpArrow;": "\u2191",
				"&UpArrowBar;": "\u2912",
				"&UpArrowDownArrow;": "\u21C5",
				"&UpDownArrow;": "\u2195",
				"&UpEquilibrium;": "\u296E",
				"&UpTee;": "\u22A5",
				"&UpTeeArrow;": "\u21A5",
				"&Uparrow;": "\u21D1",
				"&Updownarrow;": "\u21D5",
				"&UpperLeftArrow;": "\u2196",
				"&UpperRightArrow;": "\u2197",
				"&Upsi;": "\u03D2",
				"&Upsilon;": "\u03A5",
				"&Uring;": "\u016E",
				"&Uscr;": "\u{1D4B0}",
				"&Utilde;": "\u0168",
				"&Uuml": "\xDC",
				"&Uuml;": "\xDC",
				"&VDash;": "\u22AB",
				"&Vbar;": "\u2AEB",
				"&Vcy;": "\u0412",
				"&Vdash;": "\u22A9",
				"&Vdashl;": "\u2AE6",
				"&Vee;": "\u22C1",
				"&Verbar;": "\u2016",
				"&Vert;": "\u2016",
				"&VerticalBar;": "\u2223",
				"&VerticalLine;": "|",
				"&VerticalSeparator;": "\u2758",
				"&VerticalTilde;": "\u2240",
				"&VeryThinSpace;": "\u200A",
				"&Vfr;": "\u{1D519}",
				"&Vopf;": "\u{1D54D}",
				"&Vscr;": "\u{1D4B1}",
				"&Vvdash;": "\u22AA",
				"&Wcirc;": "\u0174",
				"&Wedge;": "\u22C0",
				"&Wfr;": "\u{1D51A}",
				"&Wopf;": "\u{1D54E}",
				"&Wscr;": "\u{1D4B2}",
				"&Xfr;": "\u{1D51B}",
				"&Xi;": "\u039E",
				"&Xopf;": "\u{1D54F}",
				"&Xscr;": "\u{1D4B3}",
				"&YAcy;": "\u042F",
				"&YIcy;": "\u0407",
				"&YUcy;": "\u042E",
				"&Yacute": "\xDD",
				"&Yacute;": "\xDD",
				"&Ycirc;": "\u0176",
				"&Ycy;": "\u042B",
				"&Yfr;": "\u{1D51C}",
				"&Yopf;": "\u{1D550}",
				"&Yscr;": "\u{1D4B4}",
				"&Yuml;": "\u0178",
				"&ZHcy;": "\u0416",
				"&Zacute;": "\u0179",
				"&Zcaron;": "\u017D",
				"&Zcy;": "\u0417",
				"&Zdot;": "\u017B",
				"&ZeroWidthSpace;": "\u200B",
				"&Zeta;": "\u0396",
				"&Zfr;": "\u2128",
				"&Zopf;": "\u2124",
				"&Zscr;": "\u{1D4B5}",
				"&aacute": "\xE1",
				"&aacute;": "\xE1",
				"&abreve;": "\u0103",
				"&ac;": "\u223E",
				"&acE;": "\u223E\u0333",
				"&acd;": "\u223F",
				"&acirc": "\xE2",
				"&acirc;": "\xE2",
				"&acute": "\xB4",
				"&acute;": "\xB4",
				"&acy;": "\u0430",
				"&aelig": "\xE6",
				"&aelig;": "\xE6",
				"&af;": "\u2061",
				"&afr;": "\u{1D51E}",
				"&agrave": "\xE0",
				"&agrave;": "\xE0",
				"&alefsym;": "\u2135",
				"&aleph;": "\u2135",
				"&alpha;": "\u03B1",
				"&amacr;": "\u0101",
				"&amalg;": "\u2A3F",
				"&amp": "&",
				"&amp;": "&",
				"&and;": "\u2227",
				"&andand;": "\u2A55",
				"&andd;": "\u2A5C",
				"&andslope;": "\u2A58",
				"&andv;": "\u2A5A",
				"&ang;": "\u2220",
				"&ange;": "\u29A4",
				"&angle;": "\u2220",
				"&angmsd;": "\u2221",
				"&angmsdaa;": "\u29A8",
				"&angmsdab;": "\u29A9",
				"&angmsdac;": "\u29AA",
				"&angmsdad;": "\u29AB",
				"&angmsdae;": "\u29AC",
				"&angmsdaf;": "\u29AD",
				"&angmsdag;": "\u29AE",
				"&angmsdah;": "\u29AF",
				"&angrt;": "\u221F",
				"&angrtvb;": "\u22BE",
				"&angrtvbd;": "\u299D",
				"&angsph;": "\u2222",
				"&angst;": "\xC5",
				"&angzarr;": "\u237C",
				"&aogon;": "\u0105",
				"&aopf;": "\u{1D552}",
				"&ap;": "\u2248",
				"&apE;": "\u2A70",
				"&apacir;": "\u2A6F",
				"&ape;": "\u224A",
				"&apid;": "\u224B",
				"&apos;": "'",
				"&approx;": "\u2248",
				"&approxeq;": "\u224A",
				"&aring": "\xE5",
				"&aring;": "\xE5",
				"&ascr;": "\u{1D4B6}",
				"&ast;": "*",
				"&asymp;": "\u2248",
				"&asympeq;": "\u224D",
				"&atilde": "\xE3",
				"&atilde;": "\xE3",
				"&auml": "\xE4",
				"&auml;": "\xE4",
				"&awconint;": "\u2233",
				"&awint;": "\u2A11",
				"&bNot;": "\u2AED",
				"&backcong;": "\u224C",
				"&backepsilon;": "\u03F6",
				"&backprime;": "\u2035",
				"&backsim;": "\u223D",
				"&backsimeq;": "\u22CD",
				"&barvee;": "\u22BD",
				"&barwed;": "\u2305",
				"&barwedge;": "\u2305",
				"&bbrk;": "\u23B5",
				"&bbrktbrk;": "\u23B6",
				"&bcong;": "\u224C",
				"&bcy;": "\u0431",
				"&bdquo;": "\u201E",
				"&becaus;": "\u2235",
				"&because;": "\u2235",
				"&bemptyv;": "\u29B0",
				"&bepsi;": "\u03F6",
				"&bernou;": "\u212C",
				"&beta;": "\u03B2",
				"&beth;": "\u2136",
				"&between;": "\u226C",
				"&bfr;": "\u{1D51F}",
				"&bigcap;": "\u22C2",
				"&bigcirc;": "\u25EF",
				"&bigcup;": "\u22C3",
				"&bigodot;": "\u2A00",
				"&bigoplus;": "\u2A01",
				"&bigotimes;": "\u2A02",
				"&bigsqcup;": "\u2A06",
				"&bigstar;": "\u2605",
				"&bigtriangledown;": "\u25BD",
				"&bigtriangleup;": "\u25B3",
				"&biguplus;": "\u2A04",
				"&bigvee;": "\u22C1",
				"&bigwedge;": "\u22C0",
				"&bkarow;": "\u290D",
				"&blacklozenge;": "\u29EB",
				"&blacksquare;": "\u25AA",
				"&blacktriangle;": "\u25B4",
				"&blacktriangledown;": "\u25BE",
				"&blacktriangleleft;": "\u25C2",
				"&blacktriangleright;": "\u25B8",
				"&blank;": "\u2423",
				"&blk12;": "\u2592",
				"&blk14;": "\u2591",
				"&blk34;": "\u2593",
				"&block;": "\u2588",
				"&bne;": "=\u20E5",
				"&bnequiv;": "\u2261\u20E5",
				"&bnot;": "\u2310",
				"&bopf;": "\u{1D553}",
				"&bot;": "\u22A5",
				"&bottom;": "\u22A5",
				"&bowtie;": "\u22C8",
				"&boxDL;": "\u2557",
				"&boxDR;": "\u2554",
				"&boxDl;": "\u2556",
				"&boxDr;": "\u2553",
				"&boxH;": "\u2550",
				"&boxHD;": "\u2566",
				"&boxHU;": "\u2569",
				"&boxHd;": "\u2564",
				"&boxHu;": "\u2567",
				"&boxUL;": "\u255D",
				"&boxUR;": "\u255A",
				"&boxUl;": "\u255C",
				"&boxUr;": "\u2559",
				"&boxV;": "\u2551",
				"&boxVH;": "\u256C",
				"&boxVL;": "\u2563",
				"&boxVR;": "\u2560",
				"&boxVh;": "\u256B",
				"&boxVl;": "\u2562",
				"&boxVr;": "\u255F",
				"&boxbox;": "\u29C9",
				"&boxdL;": "\u2555",
				"&boxdR;": "\u2552",
				"&boxdl;": "\u2510",
				"&boxdr;": "\u250C",
				"&boxh;": "\u2500",
				"&boxhD;": "\u2565",
				"&boxhU;": "\u2568",
				"&boxhd;": "\u252C",
				"&boxhu;": "\u2534",
				"&boxminus;": "\u229F",
				"&boxplus;": "\u229E",
				"&boxtimes;": "\u22A0",
				"&boxuL;": "\u255B",
				"&boxuR;": "\u2558",
				"&boxul;": "\u2518",
				"&boxur;": "\u2514",
				"&boxv;": "\u2502",
				"&boxvH;": "\u256A",
				"&boxvL;": "\u2561",
				"&boxvR;": "\u255E",
				"&boxvh;": "\u253C",
				"&boxvl;": "\u2524",
				"&boxvr;": "\u251C",
				"&bprime;": "\u2035",
				"&breve;": "\u02D8",
				"&brvbar": "\xA6",
				"&brvbar;": "\xA6",
				"&bscr;": "\u{1D4B7}",
				"&bsemi;": "\u204F",
				"&bsim;": "\u223D",
				"&bsime;": "\u22CD",
				"&bsol;": "\\",
				"&bsolb;": "\u29C5",
				"&bsolhsub;": "\u27C8",
				"&bull;": "\u2022",
				"&bullet;": "\u2022",
				"&bump;": "\u224E",
				"&bumpE;": "\u2AAE",
				"&bumpe;": "\u224F",
				"&bumpeq;": "\u224F",
				"&cacute;": "\u0107",
				"&cap;": "\u2229",
				"&capand;": "\u2A44",
				"&capbrcup;": "\u2A49",
				"&capcap;": "\u2A4B",
				"&capcup;": "\u2A47",
				"&capdot;": "\u2A40",
				"&caps;": "\u2229\uFE00",
				"&caret;": "\u2041",
				"&caron;": "\u02C7",
				"&ccaps;": "\u2A4D",
				"&ccaron;": "\u010D",
				"&ccedil": "\xE7",
				"&ccedil;": "\xE7",
				"&ccirc;": "\u0109",
				"&ccups;": "\u2A4C",
				"&ccupssm;": "\u2A50",
				"&cdot;": "\u010B",
				"&cedil": "\xB8",
				"&cedil;": "\xB8",
				"&cemptyv;": "\u29B2",
				"&cent": "\xA2",
				"&cent;": "\xA2",
				"&centerdot;": "\xB7",
				"&cfr;": "\u{1D520}",
				"&chcy;": "\u0447",
				"&check;": "\u2713",
				"&checkmark;": "\u2713",
				"&chi;": "\u03C7",
				"&cir;": "\u25CB",
				"&cirE;": "\u29C3",
				"&circ;": "\u02C6",
				"&circeq;": "\u2257",
				"&circlearrowleft;": "\u21BA",
				"&circlearrowright;": "\u21BB",
				"&circledR;": "\xAE",
				"&circledS;": "\u24C8",
				"&circledast;": "\u229B",
				"&circledcirc;": "\u229A",
				"&circleddash;": "\u229D",
				"&cire;": "\u2257",
				"&cirfnint;": "\u2A10",
				"&cirmid;": "\u2AEF",
				"&cirscir;": "\u29C2",
				"&clubs;": "\u2663",
				"&clubsuit;": "\u2663",
				"&colon;": ":",
				"&colone;": "\u2254",
				"&coloneq;": "\u2254",
				"&comma;": ",",
				"&commat;": "@",
				"&comp;": "\u2201",
				"&compfn;": "\u2218",
				"&complement;": "\u2201",
				"&complexes;": "\u2102",
				"&cong;": "\u2245",
				"&congdot;": "\u2A6D",
				"&conint;": "\u222E",
				"&copf;": "\u{1D554}",
				"&coprod;": "\u2210",
				"&copy": "\xA9",
				"&copy;": "\xA9",
				"&copysr;": "\u2117",
				"&crarr;": "\u21B5",
				"&cross;": "\u2717",
				"&cscr;": "\u{1D4B8}",
				"&csub;": "\u2ACF",
				"&csube;": "\u2AD1",
				"&csup;": "\u2AD0",
				"&csupe;": "\u2AD2",
				"&ctdot;": "\u22EF",
				"&cudarrl;": "\u2938",
				"&cudarrr;": "\u2935",
				"&cuepr;": "\u22DE",
				"&cuesc;": "\u22DF",
				"&cularr;": "\u21B6",
				"&cularrp;": "\u293D",
				"&cup;": "\u222A",
				"&cupbrcap;": "\u2A48",
				"&cupcap;": "\u2A46",
				"&cupcup;": "\u2A4A",
				"&cupdot;": "\u228D",
				"&cupor;": "\u2A45",
				"&cups;": "\u222A\uFE00",
				"&curarr;": "\u21B7",
				"&curarrm;": "\u293C",
				"&curlyeqprec;": "\u22DE",
				"&curlyeqsucc;": "\u22DF",
				"&curlyvee;": "\u22CE",
				"&curlywedge;": "\u22CF",
				"&curren": "\xA4",
				"&curren;": "\xA4",
				"&curvearrowleft;": "\u21B6",
				"&curvearrowright;": "\u21B7",
				"&cuvee;": "\u22CE",
				"&cuwed;": "\u22CF",
				"&cwconint;": "\u2232",
				"&cwint;": "\u2231",
				"&cylcty;": "\u232D",
				"&dArr;": "\u21D3",
				"&dHar;": "\u2965",
				"&dagger;": "\u2020",
				"&daleth;": "\u2138",
				"&darr;": "\u2193",
				"&dash;": "\u2010",
				"&dashv;": "\u22A3",
				"&dbkarow;": "\u290F",
				"&dblac;": "\u02DD",
				"&dcaron;": "\u010F",
				"&dcy;": "\u0434",
				"&dd;": "\u2146",
				"&ddagger;": "\u2021",
				"&ddarr;": "\u21CA",
				"&ddotseq;": "\u2A77",
				"&deg": "\xB0",
				"&deg;": "\xB0",
				"&delta;": "\u03B4",
				"&demptyv;": "\u29B1",
				"&dfisht;": "\u297F",
				"&dfr;": "\u{1D521}",
				"&dharl;": "\u21C3",
				"&dharr;": "\u21C2",
				"&diam;": "\u22C4",
				"&diamond;": "\u22C4",
				"&diamondsuit;": "\u2666",
				"&diams;": "\u2666",
				"&die;": "\xA8",
				"&digamma;": "\u03DD",
				"&disin;": "\u22F2",
				"&div;": "\xF7",
				"&divide": "\xF7",
				"&divide;": "\xF7",
				"&divideontimes;": "\u22C7",
				"&divonx;": "\u22C7",
				"&djcy;": "\u0452",
				"&dlcorn;": "\u231E",
				"&dlcrop;": "\u230D",
				"&dollar;": "$",
				"&dopf;": "\u{1D555}",
				"&dot;": "\u02D9",
				"&doteq;": "\u2250",
				"&doteqdot;": "\u2251",
				"&dotminus;": "\u2238",
				"&dotplus;": "\u2214",
				"&dotsquare;": "\u22A1",
				"&doublebarwedge;": "\u2306",
				"&downarrow;": "\u2193",
				"&downdownarrows;": "\u21CA",
				"&downharpoonleft;": "\u21C3",
				"&downharpoonright;": "\u21C2",
				"&drbkarow;": "\u2910",
				"&drcorn;": "\u231F",
				"&drcrop;": "\u230C",
				"&dscr;": "\u{1D4B9}",
				"&dscy;": "\u0455",
				"&dsol;": "\u29F6",
				"&dstrok;": "\u0111",
				"&dtdot;": "\u22F1",
				"&dtri;": "\u25BF",
				"&dtrif;": "\u25BE",
				"&duarr;": "\u21F5",
				"&duhar;": "\u296F",
				"&dwangle;": "\u29A6",
				"&dzcy;": "\u045F",
				"&dzigrarr;": "\u27FF",
				"&eDDot;": "\u2A77",
				"&eDot;": "\u2251",
				"&eacute": "\xE9",
				"&eacute;": "\xE9",
				"&easter;": "\u2A6E",
				"&ecaron;": "\u011B",
				"&ecir;": "\u2256",
				"&ecirc": "\xEA",
				"&ecirc;": "\xEA",
				"&ecolon;": "\u2255",
				"&ecy;": "\u044D",
				"&edot;": "\u0117",
				"&ee;": "\u2147",
				"&efDot;": "\u2252",
				"&efr;": "\u{1D522}",
				"&eg;": "\u2A9A",
				"&egrave": "\xE8",
				"&egrave;": "\xE8",
				"&egs;": "\u2A96",
				"&egsdot;": "\u2A98",
				"&el;": "\u2A99",
				"&elinters;": "\u23E7",
				"&ell;": "\u2113",
				"&els;": "\u2A95",
				"&elsdot;": "\u2A97",
				"&emacr;": "\u0113",
				"&empty;": "\u2205",
				"&emptyset;": "\u2205",
				"&emptyv;": "\u2205",
				"&emsp13;": "\u2004",
				"&emsp14;": "\u2005",
				"&emsp;": "\u2003",
				"&eng;": "\u014B",
				"&ensp;": "\u2002",
				"&eogon;": "\u0119",
				"&eopf;": "\u{1D556}",
				"&epar;": "\u22D5",
				"&eparsl;": "\u29E3",
				"&eplus;": "\u2A71",
				"&epsi;": "\u03B5",
				"&epsilon;": "\u03B5",
				"&epsiv;": "\u03F5",
				"&eqcirc;": "\u2256",
				"&eqcolon;": "\u2255",
				"&eqsim;": "\u2242",
				"&eqslantgtr;": "\u2A96",
				"&eqslantless;": "\u2A95",
				"&equals;": "=",
				"&equest;": "\u225F",
				"&equiv;": "\u2261",
				"&equivDD;": "\u2A78",
				"&eqvparsl;": "\u29E5",
				"&erDot;": "\u2253",
				"&erarr;": "\u2971",
				"&escr;": "\u212F",
				"&esdot;": "\u2250",
				"&esim;": "\u2242",
				"&eta;": "\u03B7",
				"&eth": "\xF0",
				"&eth;": "\xF0",
				"&euml": "\xEB",
				"&euml;": "\xEB",
				"&euro;": "\u20AC",
				"&excl;": "!",
				"&exist;": "\u2203",
				"&expectation;": "\u2130",
				"&exponentiale;": "\u2147",
				"&fallingdotseq;": "\u2252",
				"&fcy;": "\u0444",
				"&female;": "\u2640",
				"&ffilig;": "\uFB03",
				"&fflig;": "\uFB00",
				"&ffllig;": "\uFB04",
				"&ffr;": "\u{1D523}",
				"&filig;": "\uFB01",
				"&fjlig;": "fj",
				"&flat;": "\u266D",
				"&fllig;": "\uFB02",
				"&fltns;": "\u25B1",
				"&fnof;": "\u0192",
				"&fopf;": "\u{1D557}",
				"&forall;": "\u2200",
				"&fork;": "\u22D4",
				"&forkv;": "\u2AD9",
				"&fpartint;": "\u2A0D",
				"&frac12": "\xBD",
				"&frac12;": "\xBD",
				"&frac13;": "\u2153",
				"&frac14": "\xBC",
				"&frac14;": "\xBC",
				"&frac15;": "\u2155",
				"&frac16;": "\u2159",
				"&frac18;": "\u215B",
				"&frac23;": "\u2154",
				"&frac25;": "\u2156",
				"&frac34": "\xBE",
				"&frac34;": "\xBE",
				"&frac35;": "\u2157",
				"&frac38;": "\u215C",
				"&frac45;": "\u2158",
				"&frac56;": "\u215A",
				"&frac58;": "\u215D",
				"&frac78;": "\u215E",
				"&frasl;": "\u2044",
				"&frown;": "\u2322",
				"&fscr;": "\u{1D4BB}",
				"&gE;": "\u2267",
				"&gEl;": "\u2A8C",
				"&gacute;": "\u01F5",
				"&gamma;": "\u03B3",
				"&gammad;": "\u03DD",
				"&gap;": "\u2A86",
				"&gbreve;": "\u011F",
				"&gcirc;": "\u011D",
				"&gcy;": "\u0433",
				"&gdot;": "\u0121",
				"&ge;": "\u2265",
				"&gel;": "\u22DB",
				"&geq;": "\u2265",
				"&geqq;": "\u2267",
				"&geqslant;": "\u2A7E",
				"&ges;": "\u2A7E",
				"&gescc;": "\u2AA9",
				"&gesdot;": "\u2A80",
				"&gesdoto;": "\u2A82",
				"&gesdotol;": "\u2A84",
				"&gesl;": "\u22DB\uFE00",
				"&gesles;": "\u2A94",
				"&gfr;": "\u{1D524}",
				"&gg;": "\u226B",
				"&ggg;": "\u22D9",
				"&gimel;": "\u2137",
				"&gjcy;": "\u0453",
				"&gl;": "\u2277",
				"&glE;": "\u2A92",
				"&gla;": "\u2AA5",
				"&glj;": "\u2AA4",
				"&gnE;": "\u2269",
				"&gnap;": "\u2A8A",
				"&gnapprox;": "\u2A8A",
				"&gne;": "\u2A88",
				"&gneq;": "\u2A88",
				"&gneqq;": "\u2269",
				"&gnsim;": "\u22E7",
				"&gopf;": "\u{1D558}",
				"&grave;": "`",
				"&gscr;": "\u210A",
				"&gsim;": "\u2273",
				"&gsime;": "\u2A8E",
				"&gsiml;": "\u2A90",
				"&gt": ">",
				"&gt;": ">",
				"&gtcc;": "\u2AA7",
				"&gtcir;": "\u2A7A",
				"&gtdot;": "\u22D7",
				"&gtlPar;": "\u2995",
				"&gtquest;": "\u2A7C",
				"&gtrapprox;": "\u2A86",
				"&gtrarr;": "\u2978",
				"&gtrdot;": "\u22D7",
				"&gtreqless;": "\u22DB",
				"&gtreqqless;": "\u2A8C",
				"&gtrless;": "\u2277",
				"&gtrsim;": "\u2273",
				"&gvertneqq;": "\u2269\uFE00",
				"&gvnE;": "\u2269\uFE00",
				"&hArr;": "\u21D4",
				"&hairsp;": "\u200A",
				"&half;": "\xBD",
				"&hamilt;": "\u210B",
				"&hardcy;": "\u044A",
				"&harr;": "\u2194",
				"&harrcir;": "\u2948",
				"&harrw;": "\u21AD",
				"&hbar;": "\u210F",
				"&hcirc;": "\u0125",
				"&hearts;": "\u2665",
				"&heartsuit;": "\u2665",
				"&hellip;": "\u2026",
				"&hercon;": "\u22B9",
				"&hfr;": "\u{1D525}",
				"&hksearow;": "\u2925",
				"&hkswarow;": "\u2926",
				"&hoarr;": "\u21FF",
				"&homtht;": "\u223B",
				"&hookleftarrow;": "\u21A9",
				"&hookrightarrow;": "\u21AA",
				"&hopf;": "\u{1D559}",
				"&horbar;": "\u2015",
				"&hscr;": "\u{1D4BD}",
				"&hslash;": "\u210F",
				"&hstrok;": "\u0127",
				"&hybull;": "\u2043",
				"&hyphen;": "\u2010",
				"&iacute": "\xED",
				"&iacute;": "\xED",
				"&ic;": "\u2063",
				"&icirc": "\xEE",
				"&icirc;": "\xEE",
				"&icy;": "\u0438",
				"&iecy;": "\u0435",
				"&iexcl": "\xA1",
				"&iexcl;": "\xA1",
				"&iff;": "\u21D4",
				"&ifr;": "\u{1D526}",
				"&igrave": "\xEC",
				"&igrave;": "\xEC",
				"&ii;": "\u2148",
				"&iiiint;": "\u2A0C",
				"&iiint;": "\u222D",
				"&iinfin;": "\u29DC",
				"&iiota;": "\u2129",
				"&ijlig;": "\u0133",
				"&imacr;": "\u012B",
				"&image;": "\u2111",
				"&imagline;": "\u2110",
				"&imagpart;": "\u2111",
				"&imath;": "\u0131",
				"&imof;": "\u22B7",
				"&imped;": "\u01B5",
				"&in;": "\u2208",
				"&incare;": "\u2105",
				"&infin;": "\u221E",
				"&infintie;": "\u29DD",
				"&inodot;": "\u0131",
				"&int;": "\u222B",
				"&intcal;": "\u22BA",
				"&integers;": "\u2124",
				"&intercal;": "\u22BA",
				"&intlarhk;": "\u2A17",
				"&intprod;": "\u2A3C",
				"&iocy;": "\u0451",
				"&iogon;": "\u012F",
				"&iopf;": "\u{1D55A}",
				"&iota;": "\u03B9",
				"&iprod;": "\u2A3C",
				"&iquest": "\xBF",
				"&iquest;": "\xBF",
				"&iscr;": "\u{1D4BE}",
				"&isin;": "\u2208",
				"&isinE;": "\u22F9",
				"&isindot;": "\u22F5",
				"&isins;": "\u22F4",
				"&isinsv;": "\u22F3",
				"&isinv;": "\u2208",
				"&it;": "\u2062",
				"&itilde;": "\u0129",
				"&iukcy;": "\u0456",
				"&iuml": "\xEF",
				"&iuml;": "\xEF",
				"&jcirc;": "\u0135",
				"&jcy;": "\u0439",
				"&jfr;": "\u{1D527}",
				"&jmath;": "\u0237",
				"&jopf;": "\u{1D55B}",
				"&jscr;": "\u{1D4BF}",
				"&jsercy;": "\u0458",
				"&jukcy;": "\u0454",
				"&kappa;": "\u03BA",
				"&kappav;": "\u03F0",
				"&kcedil;": "\u0137",
				"&kcy;": "\u043A",
				"&kfr;": "\u{1D528}",
				"&kgreen;": "\u0138",
				"&khcy;": "\u0445",
				"&kjcy;": "\u045C",
				"&kopf;": "\u{1D55C}",
				"&kscr;": "\u{1D4C0}",
				"&lAarr;": "\u21DA",
				"&lArr;": "\u21D0",
				"&lAtail;": "\u291B",
				"&lBarr;": "\u290E",
				"&lE;": "\u2266",
				"&lEg;": "\u2A8B",
				"&lHar;": "\u2962",
				"&lacute;": "\u013A",
				"&laemptyv;": "\u29B4",
				"&lagran;": "\u2112",
				"&lambda;": "\u03BB",
				"&lang;": "\u27E8",
				"&langd;": "\u2991",
				"&langle;": "\u27E8",
				"&lap;": "\u2A85",
				"&laquo": "\xAB",
				"&laquo;": "\xAB",
				"&larr;": "\u2190",
				"&larrb;": "\u21E4",
				"&larrbfs;": "\u291F",
				"&larrfs;": "\u291D",
				"&larrhk;": "\u21A9",
				"&larrlp;": "\u21AB",
				"&larrpl;": "\u2939",
				"&larrsim;": "\u2973",
				"&larrtl;": "\u21A2",
				"&lat;": "\u2AAB",
				"&latail;": "\u2919",
				"&late;": "\u2AAD",
				"&lates;": "\u2AAD\uFE00",
				"&lbarr;": "\u290C",
				"&lbbrk;": "\u2772",
				"&lbrace;": "{",
				"&lbrack;": "[",
				"&lbrke;": "\u298B",
				"&lbrksld;": "\u298F",
				"&lbrkslu;": "\u298D",
				"&lcaron;": "\u013E",
				"&lcedil;": "\u013C",
				"&lceil;": "\u2308",
				"&lcub;": "{",
				"&lcy;": "\u043B",
				"&ldca;": "\u2936",
				"&ldquo;": "\u201C",
				"&ldquor;": "\u201E",
				"&ldrdhar;": "\u2967",
				"&ldrushar;": "\u294B",
				"&ldsh;": "\u21B2",
				"&le;": "\u2264",
				"&leftarrow;": "\u2190",
				"&leftarrowtail;": "\u21A2",
				"&leftharpoondown;": "\u21BD",
				"&leftharpoonup;": "\u21BC",
				"&leftleftarrows;": "\u21C7",
				"&leftrightarrow;": "\u2194",
				"&leftrightarrows;": "\u21C6",
				"&leftrightharpoons;": "\u21CB",
				"&leftrightsquigarrow;": "\u21AD",
				"&leftthreetimes;": "\u22CB",
				"&leg;": "\u22DA",
				"&leq;": "\u2264",
				"&leqq;": "\u2266",
				"&leqslant;": "\u2A7D",
				"&les;": "\u2A7D",
				"&lescc;": "\u2AA8",
				"&lesdot;": "\u2A7F",
				"&lesdoto;": "\u2A81",
				"&lesdotor;": "\u2A83",
				"&lesg;": "\u22DA\uFE00",
				"&lesges;": "\u2A93",
				"&lessapprox;": "\u2A85",
				"&lessdot;": "\u22D6",
				"&lesseqgtr;": "\u22DA",
				"&lesseqqgtr;": "\u2A8B",
				"&lessgtr;": "\u2276",
				"&lesssim;": "\u2272",
				"&lfisht;": "\u297C",
				"&lfloor;": "\u230A",
				"&lfr;": "\u{1D529}",
				"&lg;": "\u2276",
				"&lgE;": "\u2A91",
				"&lhard;": "\u21BD",
				"&lharu;": "\u21BC",
				"&lharul;": "\u296A",
				"&lhblk;": "\u2584",
				"&ljcy;": "\u0459",
				"&ll;": "\u226A",
				"&llarr;": "\u21C7",
				"&llcorner;": "\u231E",
				"&llhard;": "\u296B",
				"&lltri;": "\u25FA",
				"&lmidot;": "\u0140",
				"&lmoust;": "\u23B0",
				"&lmoustache;": "\u23B0",
				"&lnE;": "\u2268",
				"&lnap;": "\u2A89",
				"&lnapprox;": "\u2A89",
				"&lne;": "\u2A87",
				"&lneq;": "\u2A87",
				"&lneqq;": "\u2268",
				"&lnsim;": "\u22E6",
				"&loang;": "\u27EC",
				"&loarr;": "\u21FD",
				"&lobrk;": "\u27E6",
				"&longleftarrow;": "\u27F5",
				"&longleftrightarrow;": "\u27F7",
				"&longmapsto;": "\u27FC",
				"&longrightarrow;": "\u27F6",
				"&looparrowleft;": "\u21AB",
				"&looparrowright;": "\u21AC",
				"&lopar;": "\u2985",
				"&lopf;": "\u{1D55D}",
				"&loplus;": "\u2A2D",
				"&lotimes;": "\u2A34",
				"&lowast;": "\u2217",
				"&lowbar;": "_",
				"&loz;": "\u25CA",
				"&lozenge;": "\u25CA",
				"&lozf;": "\u29EB",
				"&lpar;": "(",
				"&lparlt;": "\u2993",
				"&lrarr;": "\u21C6",
				"&lrcorner;": "\u231F",
				"&lrhar;": "\u21CB",
				"&lrhard;": "\u296D",
				"&lrm;": "\u200E",
				"&lrtri;": "\u22BF",
				"&lsaquo;": "\u2039",
				"&lscr;": "\u{1D4C1}",
				"&lsh;": "\u21B0",
				"&lsim;": "\u2272",
				"&lsime;": "\u2A8D",
				"&lsimg;": "\u2A8F",
				"&lsqb;": "[",
				"&lsquo;": "\u2018",
				"&lsquor;": "\u201A",
				"&lstrok;": "\u0142",
				"&lt": "<",
				"&lt;": "<",
				"&ltcc;": "\u2AA6",
				"&ltcir;": "\u2A79",
				"&ltdot;": "\u22D6",
				"&lthree;": "\u22CB",
				"&ltimes;": "\u22C9",
				"&ltlarr;": "\u2976",
				"&ltquest;": "\u2A7B",
				"&ltrPar;": "\u2996",
				"&ltri;": "\u25C3",
				"&ltrie;": "\u22B4",
				"&ltrif;": "\u25C2",
				"&lurdshar;": "\u294A",
				"&luruhar;": "\u2966",
				"&lvertneqq;": "\u2268\uFE00",
				"&lvnE;": "\u2268\uFE00",
				"&mDDot;": "\u223A",
				"&macr": "\xAF",
				"&macr;": "\xAF",
				"&male;": "\u2642",
				"&malt;": "\u2720",
				"&maltese;": "\u2720",
				"&map;": "\u21A6",
				"&mapsto;": "\u21A6",
				"&mapstodown;": "\u21A7",
				"&mapstoleft;": "\u21A4",
				"&mapstoup;": "\u21A5",
				"&marker;": "\u25AE",
				"&mcomma;": "\u2A29",
				"&mcy;": "\u043C",
				"&mdash;": "\u2014",
				"&measuredangle;": "\u2221",
				"&mfr;": "\u{1D52A}",
				"&mho;": "\u2127",
				"&micro": "\xB5",
				"&micro;": "\xB5",
				"&mid;": "\u2223",
				"&midast;": "*",
				"&midcir;": "\u2AF0",
				"&middot": "\xB7",
				"&middot;": "\xB7",
				"&minus;": "\u2212",
				"&minusb;": "\u229F",
				"&minusd;": "\u2238",
				"&minusdu;": "\u2A2A",
				"&mlcp;": "\u2ADB",
				"&mldr;": "\u2026",
				"&mnplus;": "\u2213",
				"&models;": "\u22A7",
				"&mopf;": "\u{1D55E}",
				"&mp;": "\u2213",
				"&mscr;": "\u{1D4C2}",
				"&mstpos;": "\u223E",
				"&mu;": "\u03BC",
				"&multimap;": "\u22B8",
				"&mumap;": "\u22B8",
				"&nGg;": "\u22D9\u0338",
				"&nGt;": "\u226B\u20D2",
				"&nGtv;": "\u226B\u0338",
				"&nLeftarrow;": "\u21CD",
				"&nLeftrightarrow;": "\u21CE",
				"&nLl;": "\u22D8\u0338",
				"&nLt;": "\u226A\u20D2",
				"&nLtv;": "\u226A\u0338",
				"&nRightarrow;": "\u21CF",
				"&nVDash;": "\u22AF",
				"&nVdash;": "\u22AE",
				"&nabla;": "\u2207",
				"&nacute;": "\u0144",
				"&nang;": "\u2220\u20D2",
				"&nap;": "\u2249",
				"&napE;": "\u2A70\u0338",
				"&napid;": "\u224B\u0338",
				"&napos;": "\u0149",
				"&napprox;": "\u2249",
				"&natur;": "\u266E",
				"&natural;": "\u266E",
				"&naturals;": "\u2115",
				"&nbsp": "\xA0",
				"&nbsp;": "\xA0",
				"&nbump;": "\u224E\u0338",
				"&nbumpe;": "\u224F\u0338",
				"&ncap;": "\u2A43",
				"&ncaron;": "\u0148",
				"&ncedil;": "\u0146",
				"&ncong;": "\u2247",
				"&ncongdot;": "\u2A6D\u0338",
				"&ncup;": "\u2A42",
				"&ncy;": "\u043D",
				"&ndash;": "\u2013",
				"&ne;": "\u2260",
				"&neArr;": "\u21D7",
				"&nearhk;": "\u2924",
				"&nearr;": "\u2197",
				"&nearrow;": "\u2197",
				"&nedot;": "\u2250\u0338",
				"&nequiv;": "\u2262",
				"&nesear;": "\u2928",
				"&nesim;": "\u2242\u0338",
				"&nexist;": "\u2204",
				"&nexists;": "\u2204",
				"&nfr;": "\u{1D52B}",
				"&ngE;": "\u2267\u0338",
				"&nge;": "\u2271",
				"&ngeq;": "\u2271",
				"&ngeqq;": "\u2267\u0338",
				"&ngeqslant;": "\u2A7E\u0338",
				"&nges;": "\u2A7E\u0338",
				"&ngsim;": "\u2275",
				"&ngt;": "\u226F",
				"&ngtr;": "\u226F",
				"&nhArr;": "\u21CE",
				"&nharr;": "\u21AE",
				"&nhpar;": "\u2AF2",
				"&ni;": "\u220B",
				"&nis;": "\u22FC",
				"&nisd;": "\u22FA",
				"&niv;": "\u220B",
				"&njcy;": "\u045A",
				"&nlArr;": "\u21CD",
				"&nlE;": "\u2266\u0338",
				"&nlarr;": "\u219A",
				"&nldr;": "\u2025",
				"&nle;": "\u2270",
				"&nleftarrow;": "\u219A",
				"&nleftrightarrow;": "\u21AE",
				"&nleq;": "\u2270",
				"&nleqq;": "\u2266\u0338",
				"&nleqslant;": "\u2A7D\u0338",
				"&nles;": "\u2A7D\u0338",
				"&nless;": "\u226E",
				"&nlsim;": "\u2274",
				"&nlt;": "\u226E",
				"&nltri;": "\u22EA",
				"&nltrie;": "\u22EC",
				"&nmid;": "\u2224",
				"&nopf;": "\u{1D55F}",
				"&not": "\xAC",
				"&not;": "\xAC",
				"&notin;": "\u2209",
				"&notinE;": "\u22F9\u0338",
				"&notindot;": "\u22F5\u0338",
				"&notinva;": "\u2209",
				"&notinvb;": "\u22F7",
				"&notinvc;": "\u22F6",
				"&notni;": "\u220C",
				"&notniva;": "\u220C",
				"&notnivb;": "\u22FE",
				"&notnivc;": "\u22FD",
				"&npar;": "\u2226",
				"&nparallel;": "\u2226",
				"&nparsl;": "\u2AFD\u20E5",
				"&npart;": "\u2202\u0338",
				"&npolint;": "\u2A14",
				"&npr;": "\u2280",
				"&nprcue;": "\u22E0",
				"&npre;": "\u2AAF\u0338",
				"&nprec;": "\u2280",
				"&npreceq;": "\u2AAF\u0338",
				"&nrArr;": "\u21CF",
				"&nrarr;": "\u219B",
				"&nrarrc;": "\u2933\u0338",
				"&nrarrw;": "\u219D\u0338",
				"&nrightarrow;": "\u219B",
				"&nrtri;": "\u22EB",
				"&nrtrie;": "\u22ED",
				"&nsc;": "\u2281",
				"&nsccue;": "\u22E1",
				"&nsce;": "\u2AB0\u0338",
				"&nscr;": "\u{1D4C3}",
				"&nshortmid;": "\u2224",
				"&nshortparallel;": "\u2226",
				"&nsim;": "\u2241",
				"&nsime;": "\u2244",
				"&nsimeq;": "\u2244",
				"&nsmid;": "\u2224",
				"&nspar;": "\u2226",
				"&nsqsube;": "\u22E2",
				"&nsqsupe;": "\u22E3",
				"&nsub;": "\u2284",
				"&nsubE;": "\u2AC5\u0338",
				"&nsube;": "\u2288",
				"&nsubset;": "\u2282\u20D2",
				"&nsubseteq;": "\u2288",
				"&nsubseteqq;": "\u2AC5\u0338",
				"&nsucc;": "\u2281",
				"&nsucceq;": "\u2AB0\u0338",
				"&nsup;": "\u2285",
				"&nsupE;": "\u2AC6\u0338",
				"&nsupe;": "\u2289",
				"&nsupset;": "\u2283\u20D2",
				"&nsupseteq;": "\u2289",
				"&nsupseteqq;": "\u2AC6\u0338",
				"&ntgl;": "\u2279",
				"&ntilde": "\xF1",
				"&ntilde;": "\xF1",
				"&ntlg;": "\u2278",
				"&ntriangleleft;": "\u22EA",
				"&ntrianglelefteq;": "\u22EC",
				"&ntriangleright;": "\u22EB",
				"&ntrianglerighteq;": "\u22ED",
				"&nu;": "\u03BD",
				"&num;": "#",
				"&numero;": "\u2116",
				"&numsp;": "\u2007",
				"&nvDash;": "\u22AD",
				"&nvHarr;": "\u2904",
				"&nvap;": "\u224D\u20D2",
				"&nvdash;": "\u22AC",
				"&nvge;": "\u2265\u20D2",
				"&nvgt;": ">\u20D2",
				"&nvinfin;": "\u29DE",
				"&nvlArr;": "\u2902",
				"&nvle;": "\u2264\u20D2",
				"&nvlt;": "<\u20D2",
				"&nvltrie;": "\u22B4\u20D2",
				"&nvrArr;": "\u2903",
				"&nvrtrie;": "\u22B5\u20D2",
				"&nvsim;": "\u223C\u20D2",
				"&nwArr;": "\u21D6",
				"&nwarhk;": "\u2923",
				"&nwarr;": "\u2196",
				"&nwarrow;": "\u2196",
				"&nwnear;": "\u2927",
				"&oS;": "\u24C8",
				"&oacute": "\xF3",
				"&oacute;": "\xF3",
				"&oast;": "\u229B",
				"&ocir;": "\u229A",
				"&ocirc": "\xF4",
				"&ocirc;": "\xF4",
				"&ocy;": "\u043E",
				"&odash;": "\u229D",
				"&odblac;": "\u0151",
				"&odiv;": "\u2A38",
				"&odot;": "\u2299",
				"&odsold;": "\u29BC",
				"&oelig;": "\u0153",
				"&ofcir;": "\u29BF",
				"&ofr;": "\u{1D52C}",
				"&ogon;": "\u02DB",
				"&ograve": "\xF2",
				"&ograve;": "\xF2",
				"&ogt;": "\u29C1",
				"&ohbar;": "\u29B5",
				"&ohm;": "\u03A9",
				"&oint;": "\u222E",
				"&olarr;": "\u21BA",
				"&olcir;": "\u29BE",
				"&olcross;": "\u29BB",
				"&oline;": "\u203E",
				"&olt;": "\u29C0",
				"&omacr;": "\u014D",
				"&omega;": "\u03C9",
				"&omicron;": "\u03BF",
				"&omid;": "\u29B6",
				"&ominus;": "\u2296",
				"&oopf;": "\u{1D560}",
				"&opar;": "\u29B7",
				"&operp;": "\u29B9",
				"&oplus;": "\u2295",
				"&or;": "\u2228",
				"&orarr;": "\u21BB",
				"&ord;": "\u2A5D",
				"&order;": "\u2134",
				"&orderof;": "\u2134",
				"&ordf": "\xAA",
				"&ordf;": "\xAA",
				"&ordm": "\xBA",
				"&ordm;": "\xBA",
				"&origof;": "\u22B6",
				"&oror;": "\u2A56",
				"&orslope;": "\u2A57",
				"&orv;": "\u2A5B",
				"&oscr;": "\u2134",
				"&oslash": "\xF8",
				"&oslash;": "\xF8",
				"&osol;": "\u2298",
				"&otilde": "\xF5",
				"&otilde;": "\xF5",
				"&otimes;": "\u2297",
				"&otimesas;": "\u2A36",
				"&ouml": "\xF6",
				"&ouml;": "\xF6",
				"&ovbar;": "\u233D",
				"&par;": "\u2225",
				"&para": "\xB6",
				"&para;": "\xB6",
				"&parallel;": "\u2225",
				"&parsim;": "\u2AF3",
				"&parsl;": "\u2AFD",
				"&part;": "\u2202",
				"&pcy;": "\u043F",
				"&percnt;": "%",
				"&period;": ".",
				"&permil;": "\u2030",
				"&perp;": "\u22A5",
				"&pertenk;": "\u2031",
				"&pfr;": "\u{1D52D}",
				"&phi;": "\u03C6",
				"&phiv;": "\u03D5",
				"&phmmat;": "\u2133",
				"&phone;": "\u260E",
				"&pi;": "\u03C0",
				"&pitchfork;": "\u22D4",
				"&piv;": "\u03D6",
				"&planck;": "\u210F",
				"&planckh;": "\u210E",
				"&plankv;": "\u210F",
				"&plus;": "+",
				"&plusacir;": "\u2A23",
				"&plusb;": "\u229E",
				"&pluscir;": "\u2A22",
				"&plusdo;": "\u2214",
				"&plusdu;": "\u2A25",
				"&pluse;": "\u2A72",
				"&plusmn": "\xB1",
				"&plusmn;": "\xB1",
				"&plussim;": "\u2A26",
				"&plustwo;": "\u2A27",
				"&pm;": "\xB1",
				"&pointint;": "\u2A15",
				"&popf;": "\u{1D561}",
				"&pound": "\xA3",
				"&pound;": "\xA3",
				"&pr;": "\u227A",
				"&prE;": "\u2AB3",
				"&prap;": "\u2AB7",
				"&prcue;": "\u227C",
				"&pre;": "\u2AAF",
				"&prec;": "\u227A",
				"&precapprox;": "\u2AB7",
				"&preccurlyeq;": "\u227C",
				"&preceq;": "\u2AAF",
				"&precnapprox;": "\u2AB9",
				"&precneqq;": "\u2AB5",
				"&precnsim;": "\u22E8",
				"&precsim;": "\u227E",
				"&prime;": "\u2032",
				"&primes;": "\u2119",
				"&prnE;": "\u2AB5",
				"&prnap;": "\u2AB9",
				"&prnsim;": "\u22E8",
				"&prod;": "\u220F",
				"&profalar;": "\u232E",
				"&profline;": "\u2312",
				"&profsurf;": "\u2313",
				"&prop;": "\u221D",
				"&propto;": "\u221D",
				"&prsim;": "\u227E",
				"&prurel;": "\u22B0",
				"&pscr;": "\u{1D4C5}",
				"&psi;": "\u03C8",
				"&puncsp;": "\u2008",
				"&qfr;": "\u{1D52E}",
				"&qint;": "\u2A0C",
				"&qopf;": "\u{1D562}",
				"&qprime;": "\u2057",
				"&qscr;": "\u{1D4C6}",
				"&quaternions;": "\u210D",
				"&quatint;": "\u2A16",
				"&quest;": "?",
				"&questeq;": "\u225F",
				"&quot": '"',
				"&quot;": '"',
				"&rAarr;": "\u21DB",
				"&rArr;": "\u21D2",
				"&rAtail;": "\u291C",
				"&rBarr;": "\u290F",
				"&rHar;": "\u2964",
				"&race;": "\u223D\u0331",
				"&racute;": "\u0155",
				"&radic;": "\u221A",
				"&raemptyv;": "\u29B3",
				"&rang;": "\u27E9",
				"&rangd;": "\u2992",
				"&range;": "\u29A5",
				"&rangle;": "\u27E9",
				"&raquo": "\xBB",
				"&raquo;": "\xBB",
				"&rarr;": "\u2192",
				"&rarrap;": "\u2975",
				"&rarrb;": "\u21E5",
				"&rarrbfs;": "\u2920",
				"&rarrc;": "\u2933",
				"&rarrfs;": "\u291E",
				"&rarrhk;": "\u21AA",
				"&rarrlp;": "\u21AC",
				"&rarrpl;": "\u2945",
				"&rarrsim;": "\u2974",
				"&rarrtl;": "\u21A3",
				"&rarrw;": "\u219D",
				"&ratail;": "\u291A",
				"&ratio;": "\u2236",
				"&rationals;": "\u211A",
				"&rbarr;": "\u290D",
				"&rbbrk;": "\u2773",
				"&rbrace;": "}",
				"&rbrack;": "]",
				"&rbrke;": "\u298C",
				"&rbrksld;": "\u298E",
				"&rbrkslu;": "\u2990",
				"&rcaron;": "\u0159",
				"&rcedil;": "\u0157",
				"&rceil;": "\u2309",
				"&rcub;": "}",
				"&rcy;": "\u0440",
				"&rdca;": "\u2937",
				"&rdldhar;": "\u2969",
				"&rdquo;": "\u201D",
				"&rdquor;": "\u201D",
				"&rdsh;": "\u21B3",
				"&real;": "\u211C",
				"&realine;": "\u211B",
				"&realpart;": "\u211C",
				"&reals;": "\u211D",
				"&rect;": "\u25AD",
				"&reg": "\xAE",
				"&reg;": "\xAE",
				"&rfisht;": "\u297D",
				"&rfloor;": "\u230B",
				"&rfr;": "\u{1D52F}",
				"&rhard;": "\u21C1",
				"&rharu;": "\u21C0",
				"&rharul;": "\u296C",
				"&rho;": "\u03C1",
				"&rhov;": "\u03F1",
				"&rightarrow;": "\u2192",
				"&rightarrowtail;": "\u21A3",
				"&rightharpoondown;": "\u21C1",
				"&rightharpoonup;": "\u21C0",
				"&rightleftarrows;": "\u21C4",
				"&rightleftharpoons;": "\u21CC",
				"&rightrightarrows;": "\u21C9",
				"&rightsquigarrow;": "\u219D",
				"&rightthreetimes;": "\u22CC",
				"&ring;": "\u02DA",
				"&risingdotseq;": "\u2253",
				"&rlarr;": "\u21C4",
				"&rlhar;": "\u21CC",
				"&rlm;": "\u200F",
				"&rmoust;": "\u23B1",
				"&rmoustache;": "\u23B1",
				"&rnmid;": "\u2AEE",
				"&roang;": "\u27ED",
				"&roarr;": "\u21FE",
				"&robrk;": "\u27E7",
				"&ropar;": "\u2986",
				"&ropf;": "\u{1D563}",
				"&roplus;": "\u2A2E",
				"&rotimes;": "\u2A35",
				"&rpar;": ")",
				"&rpargt;": "\u2994",
				"&rppolint;": "\u2A12",
				"&rrarr;": "\u21C9",
				"&rsaquo;": "\u203A",
				"&rscr;": "\u{1D4C7}",
				"&rsh;": "\u21B1",
				"&rsqb;": "]",
				"&rsquo;": "\u2019",
				"&rsquor;": "\u2019",
				"&rthree;": "\u22CC",
				"&rtimes;": "\u22CA",
				"&rtri;": "\u25B9",
				"&rtrie;": "\u22B5",
				"&rtrif;": "\u25B8",
				"&rtriltri;": "\u29CE",
				"&ruluhar;": "\u2968",
				"&rx;": "\u211E",
				"&sacute;": "\u015B",
				"&sbquo;": "\u201A",
				"&sc;": "\u227B",
				"&scE;": "\u2AB4",
				"&scap;": "\u2AB8",
				"&scaron;": "\u0161",
				"&sccue;": "\u227D",
				"&sce;": "\u2AB0",
				"&scedil;": "\u015F",
				"&scirc;": "\u015D",
				"&scnE;": "\u2AB6",
				"&scnap;": "\u2ABA",
				"&scnsim;": "\u22E9",
				"&scpolint;": "\u2A13",
				"&scsim;": "\u227F",
				"&scy;": "\u0441",
				"&sdot;": "\u22C5",
				"&sdotb;": "\u22A1",
				"&sdote;": "\u2A66",
				"&seArr;": "\u21D8",
				"&searhk;": "\u2925",
				"&searr;": "\u2198",
				"&searrow;": "\u2198",
				"&sect": "\xA7",
				"&sect;": "\xA7",
				"&semi;": ";",
				"&seswar;": "\u2929",
				"&setminus;": "\u2216",
				"&setmn;": "\u2216",
				"&sext;": "\u2736",
				"&sfr;": "\u{1D530}",
				"&sfrown;": "\u2322",
				"&sharp;": "\u266F",
				"&shchcy;": "\u0449",
				"&shcy;": "\u0448",
				"&shortmid;": "\u2223",
				"&shortparallel;": "\u2225",
				"&shy": "\xAD",
				"&shy;": "\xAD",
				"&sigma;": "\u03C3",
				"&sigmaf;": "\u03C2",
				"&sigmav;": "\u03C2",
				"&sim;": "\u223C",
				"&simdot;": "\u2A6A",
				"&sime;": "\u2243",
				"&simeq;": "\u2243",
				"&simg;": "\u2A9E",
				"&simgE;": "\u2AA0",
				"&siml;": "\u2A9D",
				"&simlE;": "\u2A9F",
				"&simne;": "\u2246",
				"&simplus;": "\u2A24",
				"&simrarr;": "\u2972",
				"&slarr;": "\u2190",
				"&smallsetminus;": "\u2216",
				"&smashp;": "\u2A33",
				"&smeparsl;": "\u29E4",
				"&smid;": "\u2223",
				"&smile;": "\u2323",
				"&smt;": "\u2AAA",
				"&smte;": "\u2AAC",
				"&smtes;": "\u2AAC\uFE00",
				"&softcy;": "\u044C",
				"&sol;": "/",
				"&solb;": "\u29C4",
				"&solbar;": "\u233F",
				"&sopf;": "\u{1D564}",
				"&spades;": "\u2660",
				"&spadesuit;": "\u2660",
				"&spar;": "\u2225",
				"&sqcap;": "\u2293",
				"&sqcaps;": "\u2293\uFE00",
				"&sqcup;": "\u2294",
				"&sqcups;": "\u2294\uFE00",
				"&sqsub;": "\u228F",
				"&sqsube;": "\u2291",
				"&sqsubset;": "\u228F",
				"&sqsubseteq;": "\u2291",
				"&sqsup;": "\u2290",
				"&sqsupe;": "\u2292",
				"&sqsupset;": "\u2290",
				"&sqsupseteq;": "\u2292",
				"&squ;": "\u25A1",
				"&square;": "\u25A1",
				"&squarf;": "\u25AA",
				"&squf;": "\u25AA",
				"&srarr;": "\u2192",
				"&sscr;": "\u{1D4C8}",
				"&ssetmn;": "\u2216",
				"&ssmile;": "\u2323",
				"&sstarf;": "\u22C6",
				"&star;": "\u2606",
				"&starf;": "\u2605",
				"&straightepsilon;": "\u03F5",
				"&straightphi;": "\u03D5",
				"&strns;": "\xAF",
				"&sub;": "\u2282",
				"&subE;": "\u2AC5",
				"&subdot;": "\u2ABD",
				"&sube;": "\u2286",
				"&subedot;": "\u2AC3",
				"&submult;": "\u2AC1",
				"&subnE;": "\u2ACB",
				"&subne;": "\u228A",
				"&subplus;": "\u2ABF",
				"&subrarr;": "\u2979",
				"&subset;": "\u2282",
				"&subseteq;": "\u2286",
				"&subseteqq;": "\u2AC5",
				"&subsetneq;": "\u228A",
				"&subsetneqq;": "\u2ACB",
				"&subsim;": "\u2AC7",
				"&subsub;": "\u2AD5",
				"&subsup;": "\u2AD3",
				"&succ;": "\u227B",
				"&succapprox;": "\u2AB8",
				"&succcurlyeq;": "\u227D",
				"&succeq;": "\u2AB0",
				"&succnapprox;": "\u2ABA",
				"&succneqq;": "\u2AB6",
				"&succnsim;": "\u22E9",
				"&succsim;": "\u227F",
				"&sum;": "\u2211",
				"&sung;": "\u266A",
				"&sup1": "\xB9",
				"&sup1;": "\xB9",
				"&sup2": "\xB2",
				"&sup2;": "\xB2",
				"&sup3": "\xB3",
				"&sup3;": "\xB3",
				"&sup;": "\u2283",
				"&supE;": "\u2AC6",
				"&supdot;": "\u2ABE",
				"&supdsub;": "\u2AD8",
				"&supe;": "\u2287",
				"&supedot;": "\u2AC4",
				"&suphsol;": "\u27C9",
				"&suphsub;": "\u2AD7",
				"&suplarr;": "\u297B",
				"&supmult;": "\u2AC2",
				"&supnE;": "\u2ACC",
				"&supne;": "\u228B",
				"&supplus;": "\u2AC0",
				"&supset;": "\u2283",
				"&supseteq;": "\u2287",
				"&supseteqq;": "\u2AC6",
				"&supsetneq;": "\u228B",
				"&supsetneqq;": "\u2ACC",
				"&supsim;": "\u2AC8",
				"&supsub;": "\u2AD4",
				"&supsup;": "\u2AD6",
				"&swArr;": "\u21D9",
				"&swarhk;": "\u2926",
				"&swarr;": "\u2199",
				"&swarrow;": "\u2199",
				"&swnwar;": "\u292A",
				"&szlig": "\xDF",
				"&szlig;": "\xDF",
				"&target;": "\u2316",
				"&tau;": "\u03C4",
				"&tbrk;": "\u23B4",
				"&tcaron;": "\u0165",
				"&tcedil;": "\u0163",
				"&tcy;": "\u0442",
				"&tdot;": "\u20DB",
				"&telrec;": "\u2315",
				"&tfr;": "\u{1D531}",
				"&there4;": "\u2234",
				"&therefore;": "\u2234",
				"&theta;": "\u03B8",
				"&thetasym;": "\u03D1",
				"&thetav;": "\u03D1",
				"&thickapprox;": "\u2248",
				"&thicksim;": "\u223C",
				"&thinsp;": "\u2009",
				"&thkap;": "\u2248",
				"&thksim;": "\u223C",
				"&thorn": "\xFE",
				"&thorn;": "\xFE",
				"&tilde;": "\u02DC",
				"&times": "\xD7",
				"&times;": "\xD7",
				"&timesb;": "\u22A0",
				"&timesbar;": "\u2A31",
				"&timesd;": "\u2A30",
				"&tint;": "\u222D",
				"&toea;": "\u2928",
				"&top;": "\u22A4",
				"&topbot;": "\u2336",
				"&topcir;": "\u2AF1",
				"&topf;": "\u{1D565}",
				"&topfork;": "\u2ADA",
				"&tosa;": "\u2929",
				"&tprime;": "\u2034",
				"&trade;": "\u2122",
				"&triangle;": "\u25B5",
				"&triangledown;": "\u25BF",
				"&triangleleft;": "\u25C3",
				"&trianglelefteq;": "\u22B4",
				"&triangleq;": "\u225C",
				"&triangleright;": "\u25B9",
				"&trianglerighteq;": "\u22B5",
				"&tridot;": "\u25EC",
				"&trie;": "\u225C",
				"&triminus;": "\u2A3A",
				"&triplus;": "\u2A39",
				"&trisb;": "\u29CD",
				"&tritime;": "\u2A3B",
				"&trpezium;": "\u23E2",
				"&tscr;": "\u{1D4C9}",
				"&tscy;": "\u0446",
				"&tshcy;": "\u045B",
				"&tstrok;": "\u0167",
				"&twixt;": "\u226C",
				"&twoheadleftarrow;": "\u219E",
				"&twoheadrightarrow;": "\u21A0",
				"&uArr;": "\u21D1",
				"&uHar;": "\u2963",
				"&uacute": "\xFA",
				"&uacute;": "\xFA",
				"&uarr;": "\u2191",
				"&ubrcy;": "\u045E",
				"&ubreve;": "\u016D",
				"&ucirc": "\xFB",
				"&ucirc;": "\xFB",
				"&ucy;": "\u0443",
				"&udarr;": "\u21C5",
				"&udblac;": "\u0171",
				"&udhar;": "\u296E",
				"&ufisht;": "\u297E",
				"&ufr;": "\u{1D532}",
				"&ugrave": "\xF9",
				"&ugrave;": "\xF9",
				"&uharl;": "\u21BF",
				"&uharr;": "\u21BE",
				"&uhblk;": "\u2580",
				"&ulcorn;": "\u231C",
				"&ulcorner;": "\u231C",
				"&ulcrop;": "\u230F",
				"&ultri;": "\u25F8",
				"&umacr;": "\u016B",
				"&uml": "\xA8",
				"&uml;": "\xA8",
				"&uogon;": "\u0173",
				"&uopf;": "\u{1D566}",
				"&uparrow;": "\u2191",
				"&updownarrow;": "\u2195",
				"&upharpoonleft;": "\u21BF",
				"&upharpoonright;": "\u21BE",
				"&uplus;": "\u228E",
				"&upsi;": "\u03C5",
				"&upsih;": "\u03D2",
				"&upsilon;": "\u03C5",
				"&upuparrows;": "\u21C8",
				"&urcorn;": "\u231D",
				"&urcorner;": "\u231D",
				"&urcrop;": "\u230E",
				"&uring;": "\u016F",
				"&urtri;": "\u25F9",
				"&uscr;": "\u{1D4CA}",
				"&utdot;": "\u22F0",
				"&utilde;": "\u0169",
				"&utri;": "\u25B5",
				"&utrif;": "\u25B4",
				"&uuarr;": "\u21C8",
				"&uuml": "\xFC",
				"&uuml;": "\xFC",
				"&uwangle;": "\u29A7",
				"&vArr;": "\u21D5",
				"&vBar;": "\u2AE8",
				"&vBarv;": "\u2AE9",
				"&vDash;": "\u22A8",
				"&vangrt;": "\u299C",
				"&varepsilon;": "\u03F5",
				"&varkappa;": "\u03F0",
				"&varnothing;": "\u2205",
				"&varphi;": "\u03D5",
				"&varpi;": "\u03D6",
				"&varpropto;": "\u221D",
				"&varr;": "\u2195",
				"&varrho;": "\u03F1",
				"&varsigma;": "\u03C2",
				"&varsubsetneq;": "\u228A\uFE00",
				"&varsubsetneqq;": "\u2ACB\uFE00",
				"&varsupsetneq;": "\u228B\uFE00",
				"&varsupsetneqq;": "\u2ACC\uFE00",
				"&vartheta;": "\u03D1",
				"&vartriangleleft;": "\u22B2",
				"&vartriangleright;": "\u22B3",
				"&vcy;": "\u0432",
				"&vdash;": "\u22A2",
				"&vee;": "\u2228",
				"&veebar;": "\u22BB",
				"&veeeq;": "\u225A",
				"&vellip;": "\u22EE",
				"&verbar;": "|",
				"&vert;": "|",
				"&vfr;": "\u{1D533}",
				"&vltri;": "\u22B2",
				"&vnsub;": "\u2282\u20D2",
				"&vnsup;": "\u2283\u20D2",
				"&vopf;": "\u{1D567}",
				"&vprop;": "\u221D",
				"&vrtri;": "\u22B3",
				"&vscr;": "\u{1D4CB}",
				"&vsubnE;": "\u2ACB\uFE00",
				"&vsubne;": "\u228A\uFE00",
				"&vsupnE;": "\u2ACC\uFE00",
				"&vsupne;": "\u228B\uFE00",
				"&vzigzag;": "\u299A",
				"&wcirc;": "\u0175",
				"&wedbar;": "\u2A5F",
				"&wedge;": "\u2227",
				"&wedgeq;": "\u2259",
				"&weierp;": "\u2118",
				"&wfr;": "\u{1D534}",
				"&wopf;": "\u{1D568}",
				"&wp;": "\u2118",
				"&wr;": "\u2240",
				"&wreath;": "\u2240",
				"&wscr;": "\u{1D4CC}",
				"&xcap;": "\u22C2",
				"&xcirc;": "\u25EF",
				"&xcup;": "\u22C3",
				"&xdtri;": "\u25BD",
				"&xfr;": "\u{1D535}",
				"&xhArr;": "\u27FA",
				"&xharr;": "\u27F7",
				"&xi;": "\u03BE",
				"&xlArr;": "\u27F8",
				"&xlarr;": "\u27F5",
				"&xmap;": "\u27FC",
				"&xnis;": "\u22FB",
				"&xodot;": "\u2A00",
				"&xopf;": "\u{1D569}",
				"&xoplus;": "\u2A01",
				"&xotime;": "\u2A02",
				"&xrArr;": "\u27F9",
				"&xrarr;": "\u27F6",
				"&xscr;": "\u{1D4CD}",
				"&xsqcup;": "\u2A06",
				"&xuplus;": "\u2A04",
				"&xutri;": "\u25B3",
				"&xvee;": "\u22C1",
				"&xwedge;": "\u22C0",
				"&yacute": "\xFD",
				"&yacute;": "\xFD",
				"&yacy;": "\u044F",
				"&ycirc;": "\u0177",
				"&ycy;": "\u044B",
				"&yen": "\xA5",
				"&yen;": "\xA5",
				"&yfr;": "\u{1D536}",
				"&yicy;": "\u0457",
				"&yopf;": "\u{1D56A}",
				"&yscr;": "\u{1D4CE}",
				"&yucy;": "\u044E",
				"&yuml": "\xFF",
				"&yuml;": "\xFF",
				"&zacute;": "\u017A",
				"&zcaron;": "\u017E",
				"&zcy;": "\u0437",
				"&zdot;": "\u017C",
				"&zeetrf;": "\u2128",
				"&zeta;": "\u03B6",
				"&zfr;": "\u{1D537}",
				"&zhcy;": "\u0436",
				"&zigrarr;": "\u21DD",
				"&zopf;": "\u{1D56B}",
				"&zscr;": "\u{1D4CF}",
				"&zwj;": "\u200D",
				"&zwnj;": "\u200C",
			},
			characters: {
				Æ: "&AElig;",
				"&": "&amp;",
				Á: "&Aacute;",
				Ă: "&Abreve;",
				Â: "&Acirc;",
				А: "&Acy;",
				"\u{1D504}": "&Afr;",
				À: "&Agrave;",
				Α: "&Alpha;",
				Ā: "&Amacr;",
				"\u2A53": "&And;",
				Ą: "&Aogon;",
				"\u{1D538}": "&Aopf;",
				"\u2061": "&af;",
				Å: "&angst;",
				"\u{1D49C}": "&Ascr;",
				"\u2254": "&coloneq;",
				Ã: "&Atilde;",
				Ä: "&Auml;",
				"\u2216": "&ssetmn;",
				"\u2AE7": "&Barv;",
				"\u2306": "&doublebarwedge;",
				Б: "&Bcy;",
				"\u2235": "&because;",
				ℬ: "&bernou;",
				Β: "&Beta;",
				"\u{1D505}": "&Bfr;",
				"\u{1D539}": "&Bopf;",
				"\u02D8": "&breve;",
				"\u224E": "&bump;",
				Ч: "&CHcy;",
				"\xA9": "&copy;",
				Ć: "&Cacute;",
				"\u22D2": "&Cap;",
				"\u2145": "&DD;",
				ℭ: "&Cfr;",
				Č: "&Ccaron;",
				Ç: "&Ccedil;",
				Ĉ: "&Ccirc;",
				"\u2230": "&Cconint;",
				Ċ: "&Cdot;",
				"\xB8": "&cedil;",
				"\xB7": "&middot;",
				Χ: "&Chi;",
				"\u2299": "&odot;",
				"\u2296": "&ominus;",
				"\u2295": "&oplus;",
				"\u2297": "&otimes;",
				"\u2232": "&cwconint;",
				"\u201D": "&rdquor;",
				"\u2019": "&rsquor;",
				"\u2237": "&Proportion;",
				"\u2A74": "&Colone;",
				"\u2261": "&equiv;",
				"\u222F": "&DoubleContourIntegral;",
				"\u222E": "&oint;",
				ℂ: "&complexes;",
				"\u2210": "&coprod;",
				"\u2233": "&awconint;",
				"\u2A2F": "&Cross;",
				"\u{1D49E}": "&Cscr;",
				"\u22D3": "&Cup;",
				"\u224D": "&asympeq;",
				"\u2911": "&DDotrahd;",
				Ђ: "&DJcy;",
				Ѕ: "&DScy;",
				Џ: "&DZcy;",
				"\u2021": "&ddagger;",
				"\u21A1": "&Darr;",
				"\u2AE4": "&DoubleLeftTee;",
				Ď: "&Dcaron;",
				Д: "&Dcy;",
				"\u2207": "&nabla;",
				Δ: "&Delta;",
				"\u{1D507}": "&Dfr;",
				"\xB4": "&acute;",
				"\u02D9": "&dot;",
				"\u02DD": "&dblac;",
				"`": "&grave;",
				"\u02DC": "&tilde;",
				"\u22C4": "&diamond;",
				"\u2146": "&dd;",
				"\u{1D53B}": "&Dopf;",
				"\xA8": "&uml;",
				"\u20DC": "&DotDot;",
				"\u2250": "&esdot;",
				"\u21D3": "&dArr;",
				"\u21D0": "&lArr;",
				"\u21D4": "&iff;",
				"\u27F8": "&xlArr;",
				"\u27FA": "&xhArr;",
				"\u27F9": "&xrArr;",
				"\u21D2": "&rArr;",
				"\u22A8": "&vDash;",
				"\u21D1": "&uArr;",
				"\u21D5": "&vArr;",
				"\u2225": "&spar;",
				"\u2193": "&downarrow;",
				"\u2913": "&DownArrowBar;",
				"\u21F5": "&duarr;",
				"\u0311": "&DownBreve;",
				"\u2950": "&DownLeftRightVector;",
				"\u295E": "&DownLeftTeeVector;",
				"\u21BD": "&lhard;",
				"\u2956": "&DownLeftVectorBar;",
				"\u295F": "&DownRightTeeVector;",
				"\u21C1": "&rightharpoondown;",
				"\u2957": "&DownRightVectorBar;",
				"\u22A4": "&top;",
				"\u21A7": "&mapstodown;",
				"\u{1D49F}": "&Dscr;",
				Đ: "&Dstrok;",
				Ŋ: "&ENG;",
				Ð: "&ETH;",
				É: "&Eacute;",
				Ě: "&Ecaron;",
				Ê: "&Ecirc;",
				Э: "&Ecy;",
				Ė: "&Edot;",
				"\u{1D508}": "&Efr;",
				È: "&Egrave;",
				"\u2208": "&isinv;",
				Ē: "&Emacr;",
				"\u25FB": "&EmptySmallSquare;",
				"\u25AB": "&EmptyVerySmallSquare;",
				Ę: "&Eogon;",
				"\u{1D53C}": "&Eopf;",
				Ε: "&Epsilon;",
				"\u2A75": "&Equal;",
				"\u2242": "&esim;",
				"\u21CC": "&rlhar;",
				ℰ: "&expectation;",
				"\u2A73": "&Esim;",
				Η: "&Eta;",
				Ë: "&Euml;",
				"\u2203": "&exist;",
				"\u2147": "&exponentiale;",
				Ф: "&Fcy;",
				"\u{1D509}": "&Ffr;",
				"\u25FC": "&FilledSmallSquare;",
				"\u25AA": "&squf;",
				"\u{1D53D}": "&Fopf;",
				"\u2200": "&forall;",
				ℱ: "&Fscr;",
				Ѓ: "&GJcy;",
				">": "&gt;",
				Γ: "&Gamma;",
				Ϝ: "&Gammad;",
				Ğ: "&Gbreve;",
				Ģ: "&Gcedil;",
				Ĝ: "&Gcirc;",
				Г: "&Gcy;",
				Ġ: "&Gdot;",
				"\u{1D50A}": "&Gfr;",
				"\u22D9": "&ggg;",
				"\u{1D53E}": "&Gopf;",
				"\u2265": "&geq;",
				"\u22DB": "&gtreqless;",
				"\u2267": "&geqq;",
				"\u2AA2": "&GreaterGreater;",
				"\u2277": "&gtrless;",
				"\u2A7E": "&ges;",
				"\u2273": "&gtrsim;",
				"\u{1D4A2}": "&Gscr;",
				"\u226B": "&gg;",
				Ъ: "&HARDcy;",
				"\u02C7": "&caron;",
				"^": "&Hat;",
				Ĥ: "&Hcirc;",
				ℌ: "&Poincareplane;",
				ℋ: "&hamilt;",
				ℍ: "&quaternions;",
				"\u2500": "&boxh;",
				Ħ: "&Hstrok;",
				"\u224F": "&bumpeq;",
				Е: "&IEcy;",
				Ĳ: "&IJlig;",
				Ё: "&IOcy;",
				Í: "&Iacute;",
				Î: "&Icirc;",
				И: "&Icy;",
				İ: "&Idot;",
				ℑ: "&imagpart;",
				Ì: "&Igrave;",
				Ī: "&Imacr;",
				"\u2148": "&ii;",
				"\u222C": "&Int;",
				"\u222B": "&int;",
				"\u22C2": "&xcap;",
				"\u2063": "&ic;",
				"\u2062": "&it;",
				Į: "&Iogon;",
				"\u{1D540}": "&Iopf;",
				Ι: "&Iota;",
				ℐ: "&imagline;",
				Ĩ: "&Itilde;",
				І: "&Iukcy;",
				Ï: "&Iuml;",
				Ĵ: "&Jcirc;",
				Й: "&Jcy;",
				"\u{1D50D}": "&Jfr;",
				"\u{1D541}": "&Jopf;",
				"\u{1D4A5}": "&Jscr;",
				Ј: "&Jsercy;",
				Є: "&Jukcy;",
				Х: "&KHcy;",
				Ќ: "&KJcy;",
				Κ: "&Kappa;",
				Ķ: "&Kcedil;",
				К: "&Kcy;",
				"\u{1D50E}": "&Kfr;",
				"\u{1D542}": "&Kopf;",
				"\u{1D4A6}": "&Kscr;",
				Љ: "&LJcy;",
				"<": "&lt;",
				Ĺ: "&Lacute;",
				Λ: "&Lambda;",
				"\u27EA": "&Lang;",
				ℒ: "&lagran;",
				"\u219E": "&twoheadleftarrow;",
				Ľ: "&Lcaron;",
				Ļ: "&Lcedil;",
				Л: "&Lcy;",
				"\u27E8": "&langle;",
				"\u2190": "&slarr;",
				"\u21E4": "&larrb;",
				"\u21C6": "&lrarr;",
				"\u2308": "&lceil;",
				"\u27E6": "&lobrk;",
				"\u2961": "&LeftDownTeeVector;",
				"\u21C3": "&downharpoonleft;",
				"\u2959": "&LeftDownVectorBar;",
				"\u230A": "&lfloor;",
				"\u2194": "&leftrightarrow;",
				"\u294E": "&LeftRightVector;",
				"\u22A3": "&dashv;",
				"\u21A4": "&mapstoleft;",
				"\u295A": "&LeftTeeVector;",
				"\u22B2": "&vltri;",
				"\u29CF": "&LeftTriangleBar;",
				"\u22B4": "&trianglelefteq;",
				"\u2951": "&LeftUpDownVector;",
				"\u2960": "&LeftUpTeeVector;",
				"\u21BF": "&upharpoonleft;",
				"\u2958": "&LeftUpVectorBar;",
				"\u21BC": "&lharu;",
				"\u2952": "&LeftVectorBar;",
				"\u22DA": "&lesseqgtr;",
				"\u2266": "&leqq;",
				"\u2276": "&lg;",
				"\u2AA1": "&LessLess;",
				"\u2A7D": "&les;",
				"\u2272": "&lsim;",
				"\u{1D50F}": "&Lfr;",
				"\u22D8": "&Ll;",
				"\u21DA": "&lAarr;",
				Ŀ: "&Lmidot;",
				"\u27F5": "&xlarr;",
				"\u27F7": "&xharr;",
				"\u27F6": "&xrarr;",
				"\u{1D543}": "&Lopf;",
				"\u2199": "&swarrow;",
				"\u2198": "&searrow;",
				"\u21B0": "&lsh;",
				Ł: "&Lstrok;",
				"\u226A": "&ll;",
				"\u2905": "&Map;",
				М: "&Mcy;",
				"\u205F": "&MediumSpace;",
				ℳ: "&phmmat;",
				"\u{1D510}": "&Mfr;",
				"\u2213": "&mp;",
				"\u{1D544}": "&Mopf;",
				Μ: "&Mu;",
				Њ: "&NJcy;",
				Ń: "&Nacute;",
				Ň: "&Ncaron;",
				Ņ: "&Ncedil;",
				Н: "&Ncy;",
				"\u200B": "&ZeroWidthSpace;",
				"\n": "&NewLine;",
				"\u{1D511}": "&Nfr;",
				"\u2060": "&NoBreak;",
				"\xA0": "&nbsp;",
				ℕ: "&naturals;",
				"\u2AEC": "&Not;",
				"\u2262": "&nequiv;",
				"\u226D": "&NotCupCap;",
				"\u2226": "&nspar;",
				"\u2209": "&notinva;",
				"\u2260": "&ne;",
				"\u2242\u0338": "&nesim;",
				"\u2204": "&nexists;",
				"\u226F": "&ngtr;",
				"\u2271": "&ngeq;",
				"\u2267\u0338": "&ngeqq;",
				"\u226B\u0338": "&nGtv;",
				"\u2279": "&ntgl;",
				"\u2A7E\u0338": "&nges;",
				"\u2275": "&ngsim;",
				"\u224E\u0338": "&nbump;",
				"\u224F\u0338": "&nbumpe;",
				"\u22EA": "&ntriangleleft;",
				"\u29CF\u0338": "&NotLeftTriangleBar;",
				"\u22EC": "&ntrianglelefteq;",
				"\u226E": "&nlt;",
				"\u2270": "&nleq;",
				"\u2278": "&ntlg;",
				"\u226A\u0338": "&nLtv;",
				"\u2A7D\u0338": "&nles;",
				"\u2274": "&nlsim;",
				"\u2AA2\u0338": "&NotNestedGreaterGreater;",
				"\u2AA1\u0338": "&NotNestedLessLess;",
				"\u2280": "&nprec;",
				"\u2AAF\u0338": "&npreceq;",
				"\u22E0": "&nprcue;",
				"\u220C": "&notniva;",
				"\u22EB": "&ntriangleright;",
				"\u29D0\u0338": "&NotRightTriangleBar;",
				"\u22ED": "&ntrianglerighteq;",
				"\u228F\u0338": "&NotSquareSubset;",
				"\u22E2": "&nsqsube;",
				"\u2290\u0338": "&NotSquareSuperset;",
				"\u22E3": "&nsqsupe;",
				"\u2282\u20D2": "&vnsub;",
				"\u2288": "&nsubseteq;",
				"\u2281": "&nsucc;",
				"\u2AB0\u0338": "&nsucceq;",
				"\u22E1": "&nsccue;",
				"\u227F\u0338": "&NotSucceedsTilde;",
				"\u2283\u20D2": "&vnsup;",
				"\u2289": "&nsupseteq;",
				"\u2241": "&nsim;",
				"\u2244": "&nsimeq;",
				"\u2247": "&ncong;",
				"\u2249": "&napprox;",
				"\u2224": "&nsmid;",
				"\u{1D4A9}": "&Nscr;",
				Ñ: "&Ntilde;",
				Ν: "&Nu;",
				Œ: "&OElig;",
				Ó: "&Oacute;",
				Ô: "&Ocirc;",
				О: "&Ocy;",
				Ő: "&Odblac;",
				"\u{1D512}": "&Ofr;",
				Ò: "&Ograve;",
				Ō: "&Omacr;",
				Ω: "&ohm;",
				Ο: "&Omicron;",
				"\u{1D546}": "&Oopf;",
				"\u201C": "&ldquo;",
				"\u2018": "&lsquo;",
				"\u2A54": "&Or;",
				"\u{1D4AA}": "&Oscr;",
				Ø: "&Oslash;",
				Õ: "&Otilde;",
				"\u2A37": "&Otimes;",
				Ö: "&Ouml;",
				"\u203E": "&oline;",
				"\u23DE": "&OverBrace;",
				"\u23B4": "&tbrk;",
				"\u23DC": "&OverParenthesis;",
				"\u2202": "&part;",
				П: "&Pcy;",
				"\u{1D513}": "&Pfr;",
				Φ: "&Phi;",
				Π: "&Pi;",
				"\xB1": "&pm;",
				ℙ: "&primes;",
				"\u2ABB": "&Pr;",
				"\u227A": "&prec;",
				"\u2AAF": "&preceq;",
				"\u227C": "&preccurlyeq;",
				"\u227E": "&prsim;",
				"\u2033": "&Prime;",
				"\u220F": "&prod;",
				"\u221D": "&vprop;",
				"\u{1D4AB}": "&Pscr;",
				Ψ: "&Psi;",
				'"': "&quot;",
				"\u{1D514}": "&Qfr;",
				ℚ: "&rationals;",
				"\u{1D4AC}": "&Qscr;",
				"\u2910": "&drbkarow;",
				"\xAE": "&reg;",
				Ŕ: "&Racute;",
				"\u27EB": "&Rang;",
				"\u21A0": "&twoheadrightarrow;",
				"\u2916": "&Rarrtl;",
				Ř: "&Rcaron;",
				Ŗ: "&Rcedil;",
				Р: "&Rcy;",
				ℜ: "&realpart;",
				"\u220B": "&niv;",
				"\u21CB": "&lrhar;",
				"\u296F": "&duhar;",
				Ρ: "&Rho;",
				"\u27E9": "&rangle;",
				"\u2192": "&srarr;",
				"\u21E5": "&rarrb;",
				"\u21C4": "&rlarr;",
				"\u2309": "&rceil;",
				"\u27E7": "&robrk;",
				"\u295D": "&RightDownTeeVector;",
				"\u21C2": "&downharpoonright;",
				"\u2955": "&RightDownVectorBar;",
				"\u230B": "&rfloor;",
				"\u22A2": "&vdash;",
				"\u21A6": "&mapsto;",
				"\u295B": "&RightTeeVector;",
				"\u22B3": "&vrtri;",
				"\u29D0": "&RightTriangleBar;",
				"\u22B5": "&trianglerighteq;",
				"\u294F": "&RightUpDownVector;",
				"\u295C": "&RightUpTeeVector;",
				"\u21BE": "&upharpoonright;",
				"\u2954": "&RightUpVectorBar;",
				"\u21C0": "&rightharpoonup;",
				"\u2953": "&RightVectorBar;",
				ℝ: "&reals;",
				"\u2970": "&RoundImplies;",
				"\u21DB": "&rAarr;",
				ℛ: "&realine;",
				"\u21B1": "&rsh;",
				"\u29F4": "&RuleDelayed;",
				Щ: "&SHCHcy;",
				Ш: "&SHcy;",
				Ь: "&SOFTcy;",
				Ś: "&Sacute;",
				"\u2ABC": "&Sc;",
				Š: "&Scaron;",
				Ş: "&Scedil;",
				Ŝ: "&Scirc;",
				С: "&Scy;",
				"\u{1D516}": "&Sfr;",
				"\u2191": "&uparrow;",
				Σ: "&Sigma;",
				"\u2218": "&compfn;",
				"\u{1D54A}": "&Sopf;",
				"\u221A": "&radic;",
				"\u25A1": "&square;",
				"\u2293": "&sqcap;",
				"\u228F": "&sqsubset;",
				"\u2291": "&sqsubseteq;",
				"\u2290": "&sqsupset;",
				"\u2292": "&sqsupseteq;",
				"\u2294": "&sqcup;",
				"\u{1D4AE}": "&Sscr;",
				"\u22C6": "&sstarf;",
				"\u22D0": "&Subset;",
				"\u2286": "&subseteq;",
				"\u227B": "&succ;",
				"\u2AB0": "&succeq;",
				"\u227D": "&succcurlyeq;",
				"\u227F": "&succsim;",
				"\u2211": "&sum;",
				"\u22D1": "&Supset;",
				"\u2283": "&supset;",
				"\u2287": "&supseteq;",
				Þ: "&THORN;",
				"\u2122": "&trade;",
				Ћ: "&TSHcy;",
				Ц: "&TScy;",
				"	": "&Tab;",
				Τ: "&Tau;",
				Ť: "&Tcaron;",
				Ţ: "&Tcedil;",
				Т: "&Tcy;",
				"\u{1D517}": "&Tfr;",
				"\u2234": "&therefore;",
				Θ: "&Theta;",
				"\u205F\u200A": "&ThickSpace;",
				"\u2009": "&thinsp;",
				"\u223C": "&thksim;",
				"\u2243": "&simeq;",
				"\u2245": "&cong;",
				"\u2248": "&thkap;",
				"\u{1D54B}": "&Topf;",
				"\u20DB": "&tdot;",
				"\u{1D4AF}": "&Tscr;",
				Ŧ: "&Tstrok;",
				Ú: "&Uacute;",
				"\u219F": "&Uarr;",
				"\u2949": "&Uarrocir;",
				Ў: "&Ubrcy;",
				Ŭ: "&Ubreve;",
				Û: "&Ucirc;",
				У: "&Ucy;",
				Ű: "&Udblac;",
				"\u{1D518}": "&Ufr;",
				Ù: "&Ugrave;",
				Ū: "&Umacr;",
				_: "&lowbar;",
				"\u23DF": "&UnderBrace;",
				"\u23B5": "&bbrk;",
				"\u23DD": "&UnderParenthesis;",
				"\u22C3": "&xcup;",
				"\u228E": "&uplus;",
				Ų: "&Uogon;",
				"\u{1D54C}": "&Uopf;",
				"\u2912": "&UpArrowBar;",
				"\u21C5": "&udarr;",
				"\u2195": "&varr;",
				"\u296E": "&udhar;",
				"\u22A5": "&perp;",
				"\u21A5": "&mapstoup;",
				"\u2196": "&nwarrow;",
				"\u2197": "&nearrow;",
				ϒ: "&upsih;",
				Υ: "&Upsilon;",
				Ů: "&Uring;",
				"\u{1D4B0}": "&Uscr;",
				Ũ: "&Utilde;",
				Ü: "&Uuml;",
				"\u22AB": "&VDash;",
				"\u2AEB": "&Vbar;",
				В: "&Vcy;",
				"\u22A9": "&Vdash;",
				"\u2AE6": "&Vdashl;",
				"\u22C1": "&xvee;",
				"\u2016": "&Vert;",
				"\u2223": "&smid;",
				"|": "&vert;",
				"\u2758": "&VerticalSeparator;",
				"\u2240": "&wreath;",
				"\u200A": "&hairsp;",
				"\u{1D519}": "&Vfr;",
				"\u{1D54D}": "&Vopf;",
				"\u{1D4B1}": "&Vscr;",
				"\u22AA": "&Vvdash;",
				Ŵ: "&Wcirc;",
				"\u22C0": "&xwedge;",
				"\u{1D51A}": "&Wfr;",
				"\u{1D54E}": "&Wopf;",
				"\u{1D4B2}": "&Wscr;",
				"\u{1D51B}": "&Xfr;",
				Ξ: "&Xi;",
				"\u{1D54F}": "&Xopf;",
				"\u{1D4B3}": "&Xscr;",
				Я: "&YAcy;",
				Ї: "&YIcy;",
				Ю: "&YUcy;",
				Ý: "&Yacute;",
				Ŷ: "&Ycirc;",
				Ы: "&Ycy;",
				"\u{1D51C}": "&Yfr;",
				"\u{1D550}": "&Yopf;",
				"\u{1D4B4}": "&Yscr;",
				Ÿ: "&Yuml;",
				Ж: "&ZHcy;",
				Ź: "&Zacute;",
				Ž: "&Zcaron;",
				З: "&Zcy;",
				Ż: "&Zdot;",
				Ζ: "&Zeta;",
				ℨ: "&zeetrf;",
				ℤ: "&integers;",
				"\u{1D4B5}": "&Zscr;",
				á: "&aacute;",
				ă: "&abreve;",
				"\u223E": "&mstpos;",
				"\u223E\u0333": "&acE;",
				"\u223F": "&acd;",
				â: "&acirc;",
				а: "&acy;",
				æ: "&aelig;",
				"\u{1D51E}": "&afr;",
				à: "&agrave;",
				ℵ: "&aleph;",
				α: "&alpha;",
				ā: "&amacr;",
				"\u2A3F": "&amalg;",
				"\u2227": "&wedge;",
				"\u2A55": "&andand;",
				"\u2A5C": "&andd;",
				"\u2A58": "&andslope;",
				"\u2A5A": "&andv;",
				"\u2220": "&angle;",
				"\u29A4": "&ange;",
				"\u2221": "&measuredangle;",
				"\u29A8": "&angmsdaa;",
				"\u29A9": "&angmsdab;",
				"\u29AA": "&angmsdac;",
				"\u29AB": "&angmsdad;",
				"\u29AC": "&angmsdae;",
				"\u29AD": "&angmsdaf;",
				"\u29AE": "&angmsdag;",
				"\u29AF": "&angmsdah;",
				"\u221F": "&angrt;",
				"\u22BE": "&angrtvb;",
				"\u299D": "&angrtvbd;",
				"\u2222": "&angsph;",
				"\u237C": "&angzarr;",
				ą: "&aogon;",
				"\u{1D552}": "&aopf;",
				"\u2A70": "&apE;",
				"\u2A6F": "&apacir;",
				"\u224A": "&approxeq;",
				"\u224B": "&apid;",
				"'": "&apos;",
				å: "&aring;",
				"\u{1D4B6}": "&ascr;",
				"*": "&midast;",
				ã: "&atilde;",
				ä: "&auml;",
				"\u2A11": "&awint;",
				"\u2AED": "&bNot;",
				"\u224C": "&bcong;",
				"\u03F6": "&bepsi;",
				"\u2035": "&bprime;",
				"\u223D": "&bsim;",
				"\u22CD": "&bsime;",
				"\u22BD": "&barvee;",
				"\u2305": "&barwedge;",
				"\u23B6": "&bbrktbrk;",
				б: "&bcy;",
				"\u201E": "&ldquor;",
				"\u29B0": "&bemptyv;",
				β: "&beta;",
				ℶ: "&beth;",
				"\u226C": "&twixt;",
				"\u{1D51F}": "&bfr;",
				"\u25EF": "&xcirc;",
				"\u2A00": "&xodot;",
				"\u2A01": "&xoplus;",
				"\u2A02": "&xotime;",
				"\u2A06": "&xsqcup;",
				"\u2605": "&starf;",
				"\u25BD": "&xdtri;",
				"\u25B3": "&xutri;",
				"\u2A04": "&xuplus;",
				"\u290D": "&rbarr;",
				"\u29EB": "&lozf;",
				"\u25B4": "&utrif;",
				"\u25BE": "&dtrif;",
				"\u25C2": "&ltrif;",
				"\u25B8": "&rtrif;",
				"\u2423": "&blank;",
				"\u2592": "&blk12;",
				"\u2591": "&blk14;",
				"\u2593": "&blk34;",
				"\u2588": "&block;",
				"=\u20E5": "&bne;",
				"\u2261\u20E5": "&bnequiv;",
				"\u2310": "&bnot;",
				"\u{1D553}": "&bopf;",
				"\u22C8": "&bowtie;",
				"\u2557": "&boxDL;",
				"\u2554": "&boxDR;",
				"\u2556": "&boxDl;",
				"\u2553": "&boxDr;",
				"\u2550": "&boxH;",
				"\u2566": "&boxHD;",
				"\u2569": "&boxHU;",
				"\u2564": "&boxHd;",
				"\u2567": "&boxHu;",
				"\u255D": "&boxUL;",
				"\u255A": "&boxUR;",
				"\u255C": "&boxUl;",
				"\u2559": "&boxUr;",
				"\u2551": "&boxV;",
				"\u256C": "&boxVH;",
				"\u2563": "&boxVL;",
				"\u2560": "&boxVR;",
				"\u256B": "&boxVh;",
				"\u2562": "&boxVl;",
				"\u255F": "&boxVr;",
				"\u29C9": "&boxbox;",
				"\u2555": "&boxdL;",
				"\u2552": "&boxdR;",
				"\u2510": "&boxdl;",
				"\u250C": "&boxdr;",
				"\u2565": "&boxhD;",
				"\u2568": "&boxhU;",
				"\u252C": "&boxhd;",
				"\u2534": "&boxhu;",
				"\u229F": "&minusb;",
				"\u229E": "&plusb;",
				"\u22A0": "&timesb;",
				"\u255B": "&boxuL;",
				"\u2558": "&boxuR;",
				"\u2518": "&boxul;",
				"\u2514": "&boxur;",
				"\u2502": "&boxv;",
				"\u256A": "&boxvH;",
				"\u2561": "&boxvL;",
				"\u255E": "&boxvR;",
				"\u253C": "&boxvh;",
				"\u2524": "&boxvl;",
				"\u251C": "&boxvr;",
				"\xA6": "&brvbar;",
				"\u{1D4B7}": "&bscr;",
				"\u204F": "&bsemi;",
				"\\": "&bsol;",
				"\u29C5": "&bsolb;",
				"\u27C8": "&bsolhsub;",
				"\u2022": "&bullet;",
				"\u2AAE": "&bumpE;",
				ć: "&cacute;",
				"\u2229": "&cap;",
				"\u2A44": "&capand;",
				"\u2A49": "&capbrcup;",
				"\u2A4B": "&capcap;",
				"\u2A47": "&capcup;",
				"\u2A40": "&capdot;",
				"\u2229\uFE00": "&caps;",
				"\u2041": "&caret;",
				"\u2A4D": "&ccaps;",
				č: "&ccaron;",
				ç: "&ccedil;",
				ĉ: "&ccirc;",
				"\u2A4C": "&ccups;",
				"\u2A50": "&ccupssm;",
				ċ: "&cdot;",
				"\u29B2": "&cemptyv;",
				"\xA2": "&cent;",
				"\u{1D520}": "&cfr;",
				ч: "&chcy;",
				"\u2713": "&checkmark;",
				χ: "&chi;",
				"\u25CB": "&cir;",
				"\u29C3": "&cirE;",
				"\u02C6": "&circ;",
				"\u2257": "&cire;",
				"\u21BA": "&olarr;",
				"\u21BB": "&orarr;",
				"\u24C8": "&oS;",
				"\u229B": "&oast;",
				"\u229A": "&ocir;",
				"\u229D": "&odash;",
				"\u2A10": "&cirfnint;",
				"\u2AEF": "&cirmid;",
				"\u29C2": "&cirscir;",
				"\u2663": "&clubsuit;",
				":": "&colon;",
				",": "&comma;",
				"@": "&commat;",
				"\u2201": "&complement;",
				"\u2A6D": "&congdot;",
				"\u{1D554}": "&copf;",
				"\u2117": "&copysr;",
				"\u21B5": "&crarr;",
				"\u2717": "&cross;",
				"\u{1D4B8}": "&cscr;",
				"\u2ACF": "&csub;",
				"\u2AD1": "&csube;",
				"\u2AD0": "&csup;",
				"\u2AD2": "&csupe;",
				"\u22EF": "&ctdot;",
				"\u2938": "&cudarrl;",
				"\u2935": "&cudarrr;",
				"\u22DE": "&curlyeqprec;",
				"\u22DF": "&curlyeqsucc;",
				"\u21B6": "&curvearrowleft;",
				"\u293D": "&cularrp;",
				"\u222A": "&cup;",
				"\u2A48": "&cupbrcap;",
				"\u2A46": "&cupcap;",
				"\u2A4A": "&cupcup;",
				"\u228D": "&cupdot;",
				"\u2A45": "&cupor;",
				"\u222A\uFE00": "&cups;",
				"\u21B7": "&curvearrowright;",
				"\u293C": "&curarrm;",
				"\u22CE": "&cuvee;",
				"\u22CF": "&cuwed;",
				"\xA4": "&curren;",
				"\u2231": "&cwint;",
				"\u232D": "&cylcty;",
				"\u2965": "&dHar;",
				"\u2020": "&dagger;",
				ℸ: "&daleth;",
				"\u2010": "&hyphen;",
				"\u290F": "&rBarr;",
				ď: "&dcaron;",
				д: "&dcy;",
				"\u21CA": "&downdownarrows;",
				"\u2A77": "&eDDot;",
				"\xB0": "&deg;",
				δ: "&delta;",
				"\u29B1": "&demptyv;",
				"\u297F": "&dfisht;",
				"\u{1D521}": "&dfr;",
				"\u2666": "&diams;",
				ϝ: "&gammad;",
				"\u22F2": "&disin;",
				"\xF7": "&divide;",
				"\u22C7": "&divonx;",
				ђ: "&djcy;",
				"\u231E": "&llcorner;",
				"\u230D": "&dlcrop;",
				$: "&dollar;",
				"\u{1D555}": "&dopf;",
				"\u2251": "&eDot;",
				"\u2238": "&minusd;",
				"\u2214": "&plusdo;",
				"\u22A1": "&sdotb;",
				"\u231F": "&lrcorner;",
				"\u230C": "&drcrop;",
				"\u{1D4B9}": "&dscr;",
				ѕ: "&dscy;",
				"\u29F6": "&dsol;",
				đ: "&dstrok;",
				"\u22F1": "&dtdot;",
				"\u25BF": "&triangledown;",
				"\u29A6": "&dwangle;",
				џ: "&dzcy;",
				"\u27FF": "&dzigrarr;",
				é: "&eacute;",
				"\u2A6E": "&easter;",
				ě: "&ecaron;",
				"\u2256": "&eqcirc;",
				ê: "&ecirc;",
				"\u2255": "&eqcolon;",
				э: "&ecy;",
				ė: "&edot;",
				"\u2252": "&fallingdotseq;",
				"\u{1D522}": "&efr;",
				"\u2A9A": "&eg;",
				è: "&egrave;",
				"\u2A96": "&eqslantgtr;",
				"\u2A98": "&egsdot;",
				"\u2A99": "&el;",
				"\u23E7": "&elinters;",
				ℓ: "&ell;",
				"\u2A95": "&eqslantless;",
				"\u2A97": "&elsdot;",
				ē: "&emacr;",
				"\u2205": "&varnothing;",
				"\u2004": "&emsp13;",
				"\u2005": "&emsp14;",
				"\u2003": "&emsp;",
				ŋ: "&eng;",
				"\u2002": "&ensp;",
				ę: "&eogon;",
				"\u{1D556}": "&eopf;",
				"\u22D5": "&epar;",
				"\u29E3": "&eparsl;",
				"\u2A71": "&eplus;",
				ε: "&epsilon;",
				"\u03F5": "&varepsilon;",
				"=": "&equals;",
				"\u225F": "&questeq;",
				"\u2A78": "&equivDD;",
				"\u29E5": "&eqvparsl;",
				"\u2253": "&risingdotseq;",
				"\u2971": "&erarr;",
				ℯ: "&escr;",
				η: "&eta;",
				ð: "&eth;",
				ë: "&euml;",
				"\u20AC": "&euro;",
				"!": "&excl;",
				ф: "&fcy;",
				"\u2640": "&female;",
				ﬃ: "&ffilig;",
				ﬀ: "&fflig;",
				ﬄ: "&ffllig;",
				"\u{1D523}": "&ffr;",
				ﬁ: "&filig;",
				fj: "&fjlig;",
				"\u266D": "&flat;",
				ﬂ: "&fllig;",
				"\u25B1": "&fltns;",
				ƒ: "&fnof;",
				"\u{1D557}": "&fopf;",
				"\u22D4": "&pitchfork;",
				"\u2AD9": "&forkv;",
				"\u2A0D": "&fpartint;",
				"\xBD": "&half;",
				"\u2153": "&frac13;",
				"\xBC": "&frac14;",
				"\u2155": "&frac15;",
				"\u2159": "&frac16;",
				"\u215B": "&frac18;",
				"\u2154": "&frac23;",
				"\u2156": "&frac25;",
				"\xBE": "&frac34;",
				"\u2157": "&frac35;",
				"\u215C": "&frac38;",
				"\u2158": "&frac45;",
				"\u215A": "&frac56;",
				"\u215D": "&frac58;",
				"\u215E": "&frac78;",
				"\u2044": "&frasl;",
				"\u2322": "&sfrown;",
				"\u{1D4BB}": "&fscr;",
				"\u2A8C": "&gtreqqless;",
				ǵ: "&gacute;",
				γ: "&gamma;",
				"\u2A86": "&gtrapprox;",
				ğ: "&gbreve;",
				ĝ: "&gcirc;",
				г: "&gcy;",
				ġ: "&gdot;",
				"\u2AA9": "&gescc;",
				"\u2A80": "&gesdot;",
				"\u2A82": "&gesdoto;",
				"\u2A84": "&gesdotol;",
				"\u22DB\uFE00": "&gesl;",
				"\u2A94": "&gesles;",
				"\u{1D524}": "&gfr;",
				ℷ: "&gimel;",
				ѓ: "&gjcy;",
				"\u2A92": "&glE;",
				"\u2AA5": "&gla;",
				"\u2AA4": "&glj;",
				"\u2269": "&gneqq;",
				"\u2A8A": "&gnapprox;",
				"\u2A88": "&gneq;",
				"\u22E7": "&gnsim;",
				"\u{1D558}": "&gopf;",
				ℊ: "&gscr;",
				"\u2A8E": "&gsime;",
				"\u2A90": "&gsiml;",
				"\u2AA7": "&gtcc;",
				"\u2A7A": "&gtcir;",
				"\u22D7": "&gtrdot;",
				"\u2995": "&gtlPar;",
				"\u2A7C": "&gtquest;",
				"\u2978": "&gtrarr;",
				"\u2269\uFE00": "&gvnE;",
				ъ: "&hardcy;",
				"\u2948": "&harrcir;",
				"\u21AD": "&leftrightsquigarrow;",
				ℏ: "&plankv;",
				ĥ: "&hcirc;",
				"\u2665": "&heartsuit;",
				"\u2026": "&mldr;",
				"\u22B9": "&hercon;",
				"\u{1D525}": "&hfr;",
				"\u2925": "&searhk;",
				"\u2926": "&swarhk;",
				"\u21FF": "&hoarr;",
				"\u223B": "&homtht;",
				"\u21A9": "&larrhk;",
				"\u21AA": "&rarrhk;",
				"\u{1D559}": "&hopf;",
				"\u2015": "&horbar;",
				"\u{1D4BD}": "&hscr;",
				ħ: "&hstrok;",
				"\u2043": "&hybull;",
				í: "&iacute;",
				î: "&icirc;",
				и: "&icy;",
				е: "&iecy;",
				"\xA1": "&iexcl;",
				"\u{1D526}": "&ifr;",
				ì: "&igrave;",
				"\u2A0C": "&qint;",
				"\u222D": "&tint;",
				"\u29DC": "&iinfin;",
				"\u2129": "&iiota;",
				ĳ: "&ijlig;",
				ī: "&imacr;",
				ı: "&inodot;",
				"\u22B7": "&imof;",
				Ƶ: "&imped;",
				"\u2105": "&incare;",
				"\u221E": "&infin;",
				"\u29DD": "&infintie;",
				"\u22BA": "&intercal;",
				"\u2A17": "&intlarhk;",
				"\u2A3C": "&iprod;",
				ё: "&iocy;",
				į: "&iogon;",
				"\u{1D55A}": "&iopf;",
				ι: "&iota;",
				"\xBF": "&iquest;",
				"\u{1D4BE}": "&iscr;",
				"\u22F9": "&isinE;",
				"\u22F5": "&isindot;",
				"\u22F4": "&isins;",
				"\u22F3": "&isinsv;",
				ĩ: "&itilde;",
				і: "&iukcy;",
				ï: "&iuml;",
				ĵ: "&jcirc;",
				й: "&jcy;",
				"\u{1D527}": "&jfr;",
				"\u0237": "&jmath;",
				"\u{1D55B}": "&jopf;",
				"\u{1D4BF}": "&jscr;",
				ј: "&jsercy;",
				є: "&jukcy;",
				κ: "&kappa;",
				ϰ: "&varkappa;",
				ķ: "&kcedil;",
				к: "&kcy;",
				"\u{1D528}": "&kfr;",
				ĸ: "&kgreen;",
				х: "&khcy;",
				ќ: "&kjcy;",
				"\u{1D55C}": "&kopf;",
				"\u{1D4C0}": "&kscr;",
				"\u291B": "&lAtail;",
				"\u290E": "&lBarr;",
				"\u2A8B": "&lesseqqgtr;",
				"\u2962": "&lHar;",
				ĺ: "&lacute;",
				"\u29B4": "&laemptyv;",
				λ: "&lambda;",
				"\u2991": "&langd;",
				"\u2A85": "&lessapprox;",
				"\xAB": "&laquo;",
				"\u291F": "&larrbfs;",
				"\u291D": "&larrfs;",
				"\u21AB": "&looparrowleft;",
				"\u2939": "&larrpl;",
				"\u2973": "&larrsim;",
				"\u21A2": "&leftarrowtail;",
				"\u2AAB": "&lat;",
				"\u2919": "&latail;",
				"\u2AAD": "&late;",
				"\u2AAD\uFE00": "&lates;",
				"\u290C": "&lbarr;",
				"\u2772": "&lbbrk;",
				"{": "&lcub;",
				"[": "&lsqb;",
				"\u298B": "&lbrke;",
				"\u298F": "&lbrksld;",
				"\u298D": "&lbrkslu;",
				ľ: "&lcaron;",
				ļ: "&lcedil;",
				л: "&lcy;",
				"\u2936": "&ldca;",
				"\u2967": "&ldrdhar;",
				"\u294B": "&ldrushar;",
				"\u21B2": "&ldsh;",
				"\u2264": "&leq;",
				"\u21C7": "&llarr;",
				"\u22CB": "&lthree;",
				"\u2AA8": "&lescc;",
				"\u2A7F": "&lesdot;",
				"\u2A81": "&lesdoto;",
				"\u2A83": "&lesdotor;",
				"\u22DA\uFE00": "&lesg;",
				"\u2A93": "&lesges;",
				"\u22D6": "&ltdot;",
				"\u297C": "&lfisht;",
				"\u{1D529}": "&lfr;",
				"\u2A91": "&lgE;",
				"\u296A": "&lharul;",
				"\u2584": "&lhblk;",
				љ: "&ljcy;",
				"\u296B": "&llhard;",
				"\u25FA": "&lltri;",
				ŀ: "&lmidot;",
				"\u23B0": "&lmoustache;",
				"\u2268": "&lneqq;",
				"\u2A89": "&lnapprox;",
				"\u2A87": "&lneq;",
				"\u22E6": "&lnsim;",
				"\u27EC": "&loang;",
				"\u21FD": "&loarr;",
				"\u27FC": "&xmap;",
				"\u21AC": "&rarrlp;",
				"\u2985": "&lopar;",
				"\u{1D55D}": "&lopf;",
				"\u2A2D": "&loplus;",
				"\u2A34": "&lotimes;",
				"\u2217": "&lowast;",
				"\u25CA": "&lozenge;",
				"(": "&lpar;",
				"\u2993": "&lparlt;",
				"\u296D": "&lrhard;",
				"\u200E": "&lrm;",
				"\u22BF": "&lrtri;",
				"\u2039": "&lsaquo;",
				"\u{1D4C1}": "&lscr;",
				"\u2A8D": "&lsime;",
				"\u2A8F": "&lsimg;",
				"\u201A": "&sbquo;",
				ł: "&lstrok;",
				"\u2AA6": "&ltcc;",
				"\u2A79": "&ltcir;",
				"\u22C9": "&ltimes;",
				"\u2976": "&ltlarr;",
				"\u2A7B": "&ltquest;",
				"\u2996": "&ltrPar;",
				"\u25C3": "&triangleleft;",
				"\u294A": "&lurdshar;",
				"\u2966": "&luruhar;",
				"\u2268\uFE00": "&lvnE;",
				"\u223A": "&mDDot;",
				"\xAF": "&strns;",
				"\u2642": "&male;",
				"\u2720": "&maltese;",
				"\u25AE": "&marker;",
				"\u2A29": "&mcomma;",
				м: "&mcy;",
				"\u2014": "&mdash;",
				"\u{1D52A}": "&mfr;",
				"\u2127": "&mho;",
				µ: "&micro;",
				"\u2AF0": "&midcir;",
				"\u2212": "&minus;",
				"\u2A2A": "&minusdu;",
				"\u2ADB": "&mlcp;",
				"\u22A7": "&models;",
				"\u{1D55E}": "&mopf;",
				"\u{1D4C2}": "&mscr;",
				μ: "&mu;",
				"\u22B8": "&mumap;",
				"\u22D9\u0338": "&nGg;",
				"\u226B\u20D2": "&nGt;",
				"\u21CD": "&nlArr;",
				"\u21CE": "&nhArr;",
				"\u22D8\u0338": "&nLl;",
				"\u226A\u20D2": "&nLt;",
				"\u21CF": "&nrArr;",
				"\u22AF": "&nVDash;",
				"\u22AE": "&nVdash;",
				ń: "&nacute;",
				"\u2220\u20D2": "&nang;",
				"\u2A70\u0338": "&napE;",
				"\u224B\u0338": "&napid;",
				ŉ: "&napos;",
				"\u266E": "&natural;",
				"\u2A43": "&ncap;",
				ň: "&ncaron;",
				ņ: "&ncedil;",
				"\u2A6D\u0338": "&ncongdot;",
				"\u2A42": "&ncup;",
				н: "&ncy;",
				"\u2013": "&ndash;",
				"\u21D7": "&neArr;",
				"\u2924": "&nearhk;",
				"\u2250\u0338": "&nedot;",
				"\u2928": "&toea;",
				"\u{1D52B}": "&nfr;",
				"\u21AE": "&nleftrightarrow;",
				"\u2AF2": "&nhpar;",
				"\u22FC": "&nis;",
				"\u22FA": "&nisd;",
				њ: "&njcy;",
				"\u2266\u0338": "&nleqq;",
				"\u219A": "&nleftarrow;",
				"\u2025": "&nldr;",
				"\u{1D55F}": "&nopf;",
				"\xAC": "&not;",
				"\u22F9\u0338": "&notinE;",
				"\u22F5\u0338": "&notindot;",
				"\u22F7": "&notinvb;",
				"\u22F6": "&notinvc;",
				"\u22FE": "&notnivb;",
				"\u22FD": "&notnivc;",
				"\u2AFD\u20E5": "&nparsl;",
				"\u2202\u0338": "&npart;",
				"\u2A14": "&npolint;",
				"\u219B": "&nrightarrow;",
				"\u2933\u0338": "&nrarrc;",
				"\u219D\u0338": "&nrarrw;",
				"\u{1D4C3}": "&nscr;",
				"\u2284": "&nsub;",
				"\u2AC5\u0338": "&nsubseteqq;",
				"\u2285": "&nsup;",
				"\u2AC6\u0338": "&nsupseteqq;",
				ñ: "&ntilde;",
				ν: "&nu;",
				"#": "&num;",
				"\u2116": "&numero;",
				"\u2007": "&numsp;",
				"\u22AD": "&nvDash;",
				"\u2904": "&nvHarr;",
				"\u224D\u20D2": "&nvap;",
				"\u22AC": "&nvdash;",
				"\u2265\u20D2": "&nvge;",
				">\u20D2": "&nvgt;",
				"\u29DE": "&nvinfin;",
				"\u2902": "&nvlArr;",
				"\u2264\u20D2": "&nvle;",
				"<\u20D2": "&nvlt;",
				"\u22B4\u20D2": "&nvltrie;",
				"\u2903": "&nvrArr;",
				"\u22B5\u20D2": "&nvrtrie;",
				"\u223C\u20D2": "&nvsim;",
				"\u21D6": "&nwArr;",
				"\u2923": "&nwarhk;",
				"\u2927": "&nwnear;",
				ó: "&oacute;",
				ô: "&ocirc;",
				о: "&ocy;",
				ő: "&odblac;",
				"\u2A38": "&odiv;",
				"\u29BC": "&odsold;",
				œ: "&oelig;",
				"\u29BF": "&ofcir;",
				"\u{1D52C}": "&ofr;",
				"\u02DB": "&ogon;",
				ò: "&ograve;",
				"\u29C1": "&ogt;",
				"\u29B5": "&ohbar;",
				"\u29BE": "&olcir;",
				"\u29BB": "&olcross;",
				"\u29C0": "&olt;",
				ō: "&omacr;",
				ω: "&omega;",
				ο: "&omicron;",
				"\u29B6": "&omid;",
				"\u{1D560}": "&oopf;",
				"\u29B7": "&opar;",
				"\u29B9": "&operp;",
				"\u2228": "&vee;",
				"\u2A5D": "&ord;",
				ℴ: "&oscr;",
				ª: "&ordf;",
				º: "&ordm;",
				"\u22B6": "&origof;",
				"\u2A56": "&oror;",
				"\u2A57": "&orslope;",
				"\u2A5B": "&orv;",
				ø: "&oslash;",
				"\u2298": "&osol;",
				õ: "&otilde;",
				"\u2A36": "&otimesas;",
				ö: "&ouml;",
				"\u233D": "&ovbar;",
				"\xB6": "&para;",
				"\u2AF3": "&parsim;",
				"\u2AFD": "&parsl;",
				п: "&pcy;",
				"%": "&percnt;",
				".": "&period;",
				"\u2030": "&permil;",
				"\u2031": "&pertenk;",
				"\u{1D52D}": "&pfr;",
				φ: "&phi;",
				ϕ: "&varphi;",
				"\u260E": "&phone;",
				π: "&pi;",
				ϖ: "&varpi;",
				ℎ: "&planckh;",
				"+": "&plus;",
				"\u2A23": "&plusacir;",
				"\u2A22": "&pluscir;",
				"\u2A25": "&plusdu;",
				"\u2A72": "&pluse;",
				"\u2A26": "&plussim;",
				"\u2A27": "&plustwo;",
				"\u2A15": "&pointint;",
				"\u{1D561}": "&popf;",
				"\xA3": "&pound;",
				"\u2AB3": "&prE;",
				"\u2AB7": "&precapprox;",
				"\u2AB9": "&prnap;",
				"\u2AB5": "&prnE;",
				"\u22E8": "&prnsim;",
				"\u2032": "&prime;",
				"\u232E": "&profalar;",
				"\u2312": "&profline;",
				"\u2313": "&profsurf;",
				"\u22B0": "&prurel;",
				"\u{1D4C5}": "&pscr;",
				ψ: "&psi;",
				"\u2008": "&puncsp;",
				"\u{1D52E}": "&qfr;",
				"\u{1D562}": "&qopf;",
				"\u2057": "&qprime;",
				"\u{1D4C6}": "&qscr;",
				"\u2A16": "&quatint;",
				"?": "&quest;",
				"\u291C": "&rAtail;",
				"\u2964": "&rHar;",
				"\u223D\u0331": "&race;",
				ŕ: "&racute;",
				"\u29B3": "&raemptyv;",
				"\u2992": "&rangd;",
				"\u29A5": "&range;",
				"\xBB": "&raquo;",
				"\u2975": "&rarrap;",
				"\u2920": "&rarrbfs;",
				"\u2933": "&rarrc;",
				"\u291E": "&rarrfs;",
				"\u2945": "&rarrpl;",
				"\u2974": "&rarrsim;",
				"\u21A3": "&rightarrowtail;",
				"\u219D": "&rightsquigarrow;",
				"\u291A": "&ratail;",
				"\u2236": "&ratio;",
				"\u2773": "&rbbrk;",
				"}": "&rcub;",
				"]": "&rsqb;",
				"\u298C": "&rbrke;",
				"\u298E": "&rbrksld;",
				"\u2990": "&rbrkslu;",
				ř: "&rcaron;",
				ŗ: "&rcedil;",
				р: "&rcy;",
				"\u2937": "&rdca;",
				"\u2969": "&rdldhar;",
				"\u21B3": "&rdsh;",
				"\u25AD": "&rect;",
				"\u297D": "&rfisht;",
				"\u{1D52F}": "&rfr;",
				"\u296C": "&rharul;",
				ρ: "&rho;",
				ϱ: "&varrho;",
				"\u21C9": "&rrarr;",
				"\u22CC": "&rthree;",
				"\u02DA": "&ring;",
				"\u200F": "&rlm;",
				"\u23B1": "&rmoustache;",
				"\u2AEE": "&rnmid;",
				"\u27ED": "&roang;",
				"\u21FE": "&roarr;",
				"\u2986": "&ropar;",
				"\u{1D563}": "&ropf;",
				"\u2A2E": "&roplus;",
				"\u2A35": "&rotimes;",
				")": "&rpar;",
				"\u2994": "&rpargt;",
				"\u2A12": "&rppolint;",
				"\u203A": "&rsaquo;",
				"\u{1D4C7}": "&rscr;",
				"\u22CA": "&rtimes;",
				"\u25B9": "&triangleright;",
				"\u29CE": "&rtriltri;",
				"\u2968": "&ruluhar;",
				"\u211E": "&rx;",
				ś: "&sacute;",
				"\u2AB4": "&scE;",
				"\u2AB8": "&succapprox;",
				š: "&scaron;",
				ş: "&scedil;",
				ŝ: "&scirc;",
				"\u2AB6": "&succneqq;",
				"\u2ABA": "&succnapprox;",
				"\u22E9": "&succnsim;",
				"\u2A13": "&scpolint;",
				с: "&scy;",
				"\u22C5": "&sdot;",
				"\u2A66": "&sdote;",
				"\u21D8": "&seArr;",
				"\xA7": "&sect;",
				";": "&semi;",
				"\u2929": "&tosa;",
				"\u2736": "&sext;",
				"\u{1D530}": "&sfr;",
				"\u266F": "&sharp;",
				щ: "&shchcy;",
				ш: "&shcy;",
				"\xAD": "&shy;",
				σ: "&sigma;",
				ς: "&varsigma;",
				"\u2A6A": "&simdot;",
				"\u2A9E": "&simg;",
				"\u2AA0": "&simgE;",
				"\u2A9D": "&siml;",
				"\u2A9F": "&simlE;",
				"\u2246": "&simne;",
				"\u2A24": "&simplus;",
				"\u2972": "&simrarr;",
				"\u2A33": "&smashp;",
				"\u29E4": "&smeparsl;",
				"\u2323": "&ssmile;",
				"\u2AAA": "&smt;",
				"\u2AAC": "&smte;",
				"\u2AAC\uFE00": "&smtes;",
				ь: "&softcy;",
				"/": "&sol;",
				"\u29C4": "&solb;",
				"\u233F": "&solbar;",
				"\u{1D564}": "&sopf;",
				"\u2660": "&spadesuit;",
				"\u2293\uFE00": "&sqcaps;",
				"\u2294\uFE00": "&sqcups;",
				"\u{1D4C8}": "&sscr;",
				"\u2606": "&star;",
				"\u2282": "&subset;",
				"\u2AC5": "&subseteqq;",
				"\u2ABD": "&subdot;",
				"\u2AC3": "&subedot;",
				"\u2AC1": "&submult;",
				"\u2ACB": "&subsetneqq;",
				"\u228A": "&subsetneq;",
				"\u2ABF": "&subplus;",
				"\u2979": "&subrarr;",
				"\u2AC7": "&subsim;",
				"\u2AD5": "&subsub;",
				"\u2AD3": "&subsup;",
				"\u266A": "&sung;",
				"\xB9": "&sup1;",
				"\xB2": "&sup2;",
				"\xB3": "&sup3;",
				"\u2AC6": "&supseteqq;",
				"\u2ABE": "&supdot;",
				"\u2AD8": "&supdsub;",
				"\u2AC4": "&supedot;",
				"\u27C9": "&suphsol;",
				"\u2AD7": "&suphsub;",
				"\u297B": "&suplarr;",
				"\u2AC2": "&supmult;",
				"\u2ACC": "&supsetneqq;",
				"\u228B": "&supsetneq;",
				"\u2AC0": "&supplus;",
				"\u2AC8": "&supsim;",
				"\u2AD4": "&supsub;",
				"\u2AD6": "&supsup;",
				"\u21D9": "&swArr;",
				"\u292A": "&swnwar;",
				ß: "&szlig;",
				"\u2316": "&target;",
				τ: "&tau;",
				ť: "&tcaron;",
				ţ: "&tcedil;",
				т: "&tcy;",
				"\u2315": "&telrec;",
				"\u{1D531}": "&tfr;",
				θ: "&theta;",
				ϑ: "&vartheta;",
				þ: "&thorn;",
				"\xD7": "&times;",
				"\u2A31": "&timesbar;",
				"\u2A30": "&timesd;",
				"\u2336": "&topbot;",
				"\u2AF1": "&topcir;",
				"\u{1D565}": "&topf;",
				"\u2ADA": "&topfork;",
				"\u2034": "&tprime;",
				"\u25B5": "&utri;",
				"\u225C": "&trie;",
				"\u25EC": "&tridot;",
				"\u2A3A": "&triminus;",
				"\u2A39": "&triplus;",
				"\u29CD": "&trisb;",
				"\u2A3B": "&tritime;",
				"\u23E2": "&trpezium;",
				"\u{1D4C9}": "&tscr;",
				ц: "&tscy;",
				ћ: "&tshcy;",
				ŧ: "&tstrok;",
				"\u2963": "&uHar;",
				ú: "&uacute;",
				ў: "&ubrcy;",
				ŭ: "&ubreve;",
				û: "&ucirc;",
				у: "&ucy;",
				ű: "&udblac;",
				"\u297E": "&ufisht;",
				"\u{1D532}": "&ufr;",
				ù: "&ugrave;",
				"\u2580": "&uhblk;",
				"\u231C": "&ulcorner;",
				"\u230F": "&ulcrop;",
				"\u25F8": "&ultri;",
				ū: "&umacr;",
				ų: "&uogon;",
				"\u{1D566}": "&uopf;",
				υ: "&upsilon;",
				"\u21C8": "&uuarr;",
				"\u231D": "&urcorner;",
				"\u230E": "&urcrop;",
				ů: "&uring;",
				"\u25F9": "&urtri;",
				"\u{1D4CA}": "&uscr;",
				"\u22F0": "&utdot;",
				ũ: "&utilde;",
				ü: "&uuml;",
				"\u29A7": "&uwangle;",
				"\u2AE8": "&vBar;",
				"\u2AE9": "&vBarv;",
				"\u299C": "&vangrt;",
				"\u228A\uFE00": "&vsubne;",
				"\u2ACB\uFE00": "&vsubnE;",
				"\u228B\uFE00": "&vsupne;",
				"\u2ACC\uFE00": "&vsupnE;",
				в: "&vcy;",
				"\u22BB": "&veebar;",
				"\u225A": "&veeeq;",
				"\u22EE": "&vellip;",
				"\u{1D533}": "&vfr;",
				"\u{1D567}": "&vopf;",
				"\u{1D4CB}": "&vscr;",
				"\u299A": "&vzigzag;",
				ŵ: "&wcirc;",
				"\u2A5F": "&wedbar;",
				"\u2259": "&wedgeq;",
				"\u2118": "&wp;",
				"\u{1D534}": "&wfr;",
				"\u{1D568}": "&wopf;",
				"\u{1D4CC}": "&wscr;",
				"\u{1D535}": "&xfr;",
				ξ: "&xi;",
				"\u22FB": "&xnis;",
				"\u{1D569}": "&xopf;",
				"\u{1D4CD}": "&xscr;",
				ý: "&yacute;",
				я: "&yacy;",
				ŷ: "&ycirc;",
				ы: "&ycy;",
				"\xA5": "&yen;",
				"\u{1D536}": "&yfr;",
				ї: "&yicy;",
				"\u{1D56A}": "&yopf;",
				"\u{1D4CE}": "&yscr;",
				ю: "&yucy;",
				ÿ: "&yuml;",
				ź: "&zacute;",
				ž: "&zcaron;",
				з: "&zcy;",
				ż: "&zdot;",
				ζ: "&zeta;",
				"\u{1D537}": "&zfr;",
				ж: "&zhcy;",
				"\u21DD": "&zigrarr;",
				"\u{1D56B}": "&zopf;",
				"\u{1D4CF}": "&zscr;",
				"\u200D": "&zwj;",
				"\u200C": "&zwnj;",
			},
		},
	}
})
var Ro = v(vs => {
	"use strict"
	Object.defineProperty(vs, "__esModule", {value: !0})
	vs.numericUnicodeMap = {
		0: 65533,
		128: 8364,
		130: 8218,
		131: 402,
		132: 8222,
		133: 8230,
		134: 8224,
		135: 8225,
		136: 710,
		137: 8240,
		138: 352,
		139: 8249,
		140: 338,
		142: 381,
		145: 8216,
		146: 8217,
		147: 8220,
		148: 8221,
		149: 8226,
		150: 8211,
		151: 8212,
		152: 732,
		153: 8482,
		154: 353,
		155: 8250,
		156: 339,
		158: 382,
		159: 376,
	}
})
var Mo = v(Nt => {
	"use strict"
	Object.defineProperty(Nt, "__esModule", {value: !0})
	Nt.fromCodePoint =
		String.fromCodePoint ||
		function (e) {
			return String.fromCharCode(
				Math.floor((e - 65536) / 1024) + 55296,
				((e - 65536) % 1024) + 56320
			)
		}
	Nt.getCodePoint = String.prototype.codePointAt
		? function (e, t) {
				return e.codePointAt(t)
		  }
		: function (e, t) {
				return (
					(e.charCodeAt(t) - 55296) * 1024 +
					e.charCodeAt(t + 1) -
					56320 +
					65536
				)
		  }
	Nt.highSurrogateFrom = 55296
	Nt.highSurrogateTo = 56319
})
var ko = v(ft => {
	"use strict"
	var Ot =
		(ft && ft.__assign) ||
		function () {
			return (
				(Ot =
					Object.assign ||
					function (e) {
						for (var t, r = 1, a = arguments.length; r < a; r++) {
							t = arguments[r]
							for (var n in t)
								Object.prototype.hasOwnProperty.call(t, n) &&
									(e[n] = t[n])
						}
						return e
					}),
				Ot.apply(this, arguments)
			)
		}
	Object.defineProperty(ft, "__esModule", {value: !0})
	var rr = vo(),
		wo = Ro(),
		Bs = Mo(),
		ws = Ot(Ot({}, rr.namedReferences), {all: rr.namedReferences.html5}),
		EP = {
			specialChars: /[<>'"&]/g,
			nonAscii:
				/(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
			nonAsciiPrintable:
				/(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
			extensive:
				/(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
		},
		yP = {mode: "specialChars", level: "all", numeric: "decimal"}
	function SP(e, t) {
		var D = t === void 0 ? yP : t,
			x = D.mode,
			r = x === void 0 ? "specialChars" : x,
			a = D.numeric,
			n = a === void 0 ? "decimal" : a,
			i = D.level,
			l = i === void 0 ? "all" : i
		if (!e) return ""
		var d = EP[r],
			S = ws[l].characters,
			g = n === "hexadecimal"
		d.lastIndex = 0
		var D = d.exec(e),
			x
		if (D) {
			x = ""
			var a = 0
			do {
				a !== D.index && (x += e.substring(a, D.index))
				var i = D[0],
					M = S[i]
				if (!M) {
					var w = i.length > 1 ? Bs.getCodePoint(i, 0) : i.charCodeAt(0)
					M = (g ? "&#x" + w.toString(16) : "&#" + w) + ";"
				}
				;(x += M), (a = D.index + i.length)
			} while ((D = d.exec(e)))
			a !== e.length && (x += e.substring(a))
		} else x = e
		return x
	}
	ft.encode = SP
	var bP = {scope: "body", level: "all"},
		Rs = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g,
		Ms = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g,
		Bo = {
			xml: {strict: Rs, attribute: Ms, body: rr.bodyRegExps.xml},
			html4: {strict: Rs, attribute: Ms, body: rr.bodyRegExps.html4},
			html5: {strict: Rs, attribute: Ms, body: rr.bodyRegExps.html5},
		},
		AP = Ot(Ot({}, Bo), {all: Bo.html5}),
		Fs = String.fromCharCode,
		Fo = Fs(65533),
		hP = {level: "all"}
	function _P(e, t) {
		var a = (t === void 0 ? hP : t).level,
			r = a === void 0 ? "all" : a
		if (!e) return ""
		var a = e,
			n = e[e.length - 1],
			i = ws[r].entities[e]
		if (i) a = i
		else if (e[0] === "&" && e[1] === "#") {
			var l = e[2],
				d =
					l == "x" || l == "X"
						? parseInt(e.substr(3), 16)
						: parseInt(e.substr(2))
			a =
				d >= 1114111
					? Fo
					: d > 65535
					? Bs.fromCodePoint(d)
					: Fs(wo.numericUnicodeMap[d] || d)
		}
		return a
	}
	ft.decodeEntity = _P
	function IP(e, t) {
		var r = t === void 0 ? bP : t,
			a = r.level,
			n = a === void 0 ? "all" : a,
			i = r.scope,
			l = i === void 0 ? (n === "xml" ? "strict" : "body") : i
		if (!e) return ""
		var d = AP[n][l],
			S = ws[n].entities,
			g = l === "attribute",
			D = l === "strict"
		d.lastIndex = 0
		var x = d.exec(e),
			M
		if (x) {
			M = ""
			var w = 0
			do {
				w !== x.index && (M += e.substring(w, x.index))
				var U = x[0],
					R = U,
					z = U[U.length - 1]
				if (g && z === "=") R = U
				else if (D && z !== ";") R = U
				else {
					var F = S[U]
					if (F) R = F
					else if (U[0] === "&" && U[1] === "#") {
						var V = U[2],
							C =
								V == "x" || V == "X"
									? parseInt(U.substr(3), 16)
									: parseInt(U.substr(2))
						R =
							C >= 1114111
								? Fo
								: C > 65535
								? Bs.fromCodePoint(C)
								: Fs(wo.numericUnicodeMap[C] || C)
					}
				}
				;(M += R), (w = x.index + U.length)
			} while ((x = d.exec(e)))
			w !== e.length && (M += e.substring(w))
		} else M = e
		return M
	}
	ft.decode = IP
})
var Vr = v(Re => {
	"use strict"
	Object.defineProperty(Re, "__esModule", {value: !0})
	Re.SEQUENCES = Re.CODE_POINTS = Re.REPLACEMENT_CHARACTER = void 0
	Re.isSurrogate = DP
	Re.isSurrogatePair = xP
	Re.getSurrogatePairCodePoint = NP
	Re.isControlCodePoint = OP
	Re.isUndefinedCodePoint = PP
	var gP = new Set([
		65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678,
		327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823,
		655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
		917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
	])
	Re.REPLACEMENT_CHARACTER = "\uFFFD"
	var Uo
	;(function (e) {
		;(e[(e.EOF = -1)] = "EOF"),
			(e[(e.NULL = 0)] = "NULL"),
			(e[(e.TABULATION = 9)] = "TABULATION"),
			(e[(e.CARRIAGE_RETURN = 13)] = "CARRIAGE_RETURN"),
			(e[(e.LINE_FEED = 10)] = "LINE_FEED"),
			(e[(e.FORM_FEED = 12)] = "FORM_FEED"),
			(e[(e.SPACE = 32)] = "SPACE"),
			(e[(e.EXCLAMATION_MARK = 33)] = "EXCLAMATION_MARK"),
			(e[(e.QUOTATION_MARK = 34)] = "QUOTATION_MARK"),
			(e[(e.AMPERSAND = 38)] = "AMPERSAND"),
			(e[(e.APOSTROPHE = 39)] = "APOSTROPHE"),
			(e[(e.HYPHEN_MINUS = 45)] = "HYPHEN_MINUS"),
			(e[(e.SOLIDUS = 47)] = "SOLIDUS"),
			(e[(e.DIGIT_0 = 48)] = "DIGIT_0"),
			(e[(e.DIGIT_9 = 57)] = "DIGIT_9"),
			(e[(e.SEMICOLON = 59)] = "SEMICOLON"),
			(e[(e.LESS_THAN_SIGN = 60)] = "LESS_THAN_SIGN"),
			(e[(e.EQUALS_SIGN = 61)] = "EQUALS_SIGN"),
			(e[(e.GREATER_THAN_SIGN = 62)] = "GREATER_THAN_SIGN"),
			(e[(e.QUESTION_MARK = 63)] = "QUESTION_MARK"),
			(e[(e.LATIN_CAPITAL_A = 65)] = "LATIN_CAPITAL_A"),
			(e[(e.LATIN_CAPITAL_Z = 90)] = "LATIN_CAPITAL_Z"),
			(e[(e.RIGHT_SQUARE_BRACKET = 93)] = "RIGHT_SQUARE_BRACKET"),
			(e[(e.GRAVE_ACCENT = 96)] = "GRAVE_ACCENT"),
			(e[(e.LATIN_SMALL_A = 97)] = "LATIN_SMALL_A"),
			(e[(e.LATIN_SMALL_Z = 122)] = "LATIN_SMALL_Z")
	})(Uo || (Re.CODE_POINTS = Uo = {}))
	Re.SEQUENCES = {
		DASH_DASH: "--",
		CDATA_START: "[CDATA[",
		DOCTYPE: "doctype",
		SCRIPT: "script",
		PUBLIC: "public",
		SYSTEM: "system",
	}
	function DP(e) {
		return e >= 55296 && e <= 57343
	}
	function xP(e) {
		return e >= 56320 && e <= 57343
	}
	function NP(e, t) {
		return (e - 55296) * 1024 + 9216 + t
	}
	function OP(e) {
		return (
			(e !== 32 &&
				e !== 10 &&
				e !== 13 &&
				e !== 9 &&
				e !== 12 &&
				e >= 1 &&
				e <= 31) ||
			(e >= 127 && e <= 159)
		)
	}
	function PP(e) {
		return (e >= 64976 && e <= 65007) || gP.has(e)
	}
})
var ar = v(Kr => {
	"use strict"
	Object.defineProperty(Kr, "__esModule", {value: !0})
	Kr.ERR = void 0
	var Go
	;(function (e) {
		;(e.controlCharacterInInputStream = "control-character-in-input-stream"),
			(e.noncharacterInInputStream = "noncharacter-in-input-stream"),
			(e.surrogateInInputStream = "surrogate-in-input-stream"),
			(e.nonVoidHtmlElementStartTagWithTrailingSolidus =
				"non-void-html-element-start-tag-with-trailing-solidus"),
			(e.endTagWithAttributes = "end-tag-with-attributes"),
			(e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus"),
			(e.unexpectedSolidusInTag = "unexpected-solidus-in-tag"),
			(e.unexpectedNullCharacter = "unexpected-null-character"),
			(e.unexpectedQuestionMarkInsteadOfTagName =
				"unexpected-question-mark-instead-of-tag-name"),
			(e.invalidFirstCharacterOfTagName =
				"invalid-first-character-of-tag-name"),
			(e.unexpectedEqualsSignBeforeAttributeName =
				"unexpected-equals-sign-before-attribute-name"),
			(e.missingEndTagName = "missing-end-tag-name"),
			(e.unexpectedCharacterInAttributeName =
				"unexpected-character-in-attribute-name"),
			(e.unknownNamedCharacterReference =
				"unknown-named-character-reference"),
			(e.missingSemicolonAfterCharacterReference =
				"missing-semicolon-after-character-reference"),
			(e.unexpectedCharacterAfterDoctypeSystemIdentifier =
				"unexpected-character-after-doctype-system-identifier"),
			(e.unexpectedCharacterInUnquotedAttributeValue =
				"unexpected-character-in-unquoted-attribute-value"),
			(e.eofBeforeTagName = "eof-before-tag-name"),
			(e.eofInTag = "eof-in-tag"),
			(e.missingAttributeValue = "missing-attribute-value"),
			(e.missingWhitespaceBetweenAttributes =
				"missing-whitespace-between-attributes"),
			(e.missingWhitespaceAfterDoctypePublicKeyword =
				"missing-whitespace-after-doctype-public-keyword"),
			(e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers =
				"missing-whitespace-between-doctype-public-and-system-identifiers"),
			(e.missingWhitespaceAfterDoctypeSystemKeyword =
				"missing-whitespace-after-doctype-system-keyword"),
			(e.missingQuoteBeforeDoctypePublicIdentifier =
				"missing-quote-before-doctype-public-identifier"),
			(e.missingQuoteBeforeDoctypeSystemIdentifier =
				"missing-quote-before-doctype-system-identifier"),
			(e.missingDoctypePublicIdentifier =
				"missing-doctype-public-identifier"),
			(e.missingDoctypeSystemIdentifier =
				"missing-doctype-system-identifier"),
			(e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier"),
			(e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier"),
			(e.cdataInHtmlContent = "cdata-in-html-content"),
			(e.incorrectlyOpenedComment = "incorrectly-opened-comment"),
			(e.eofInScriptHtmlCommentLikeText =
				"eof-in-script-html-comment-like-text"),
			(e.eofInDoctype = "eof-in-doctype"),
			(e.nestedComment = "nested-comment"),
			(e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment"),
			(e.eofInComment = "eof-in-comment"),
			(e.incorrectlyClosedComment = "incorrectly-closed-comment"),
			(e.eofInCdata = "eof-in-cdata"),
			(e.absenceOfDigitsInNumericCharacterReference =
				"absence-of-digits-in-numeric-character-reference"),
			(e.nullCharacterReference = "null-character-reference"),
			(e.surrogateCharacterReference = "surrogate-character-reference"),
			(e.characterReferenceOutsideUnicodeRange =
				"character-reference-outside-unicode-range"),
			(e.controlCharacterReference = "control-character-reference"),
			(e.noncharacterCharacterReference =
				"noncharacter-character-reference"),
			(e.missingWhitespaceBeforeDoctypeName =
				"missing-whitespace-before-doctype-name"),
			(e.missingDoctypeName = "missing-doctype-name"),
			(e.invalidCharacterSequenceAfterDoctypeName =
				"invalid-character-sequence-after-doctype-name"),
			(e.duplicateAttribute = "duplicate-attribute"),
			(e.nonConformingDoctype = "non-conforming-doctype"),
			(e.missingDoctype = "missing-doctype"),
			(e.misplacedDoctype = "misplaced-doctype"),
			(e.endTagWithoutMatchingOpenElement =
				"end-tag-without-matching-open-element"),
			(e.closingOfElementWithOpenChildElements =
				"closing-of-element-with-open-child-elements"),
			(e.disallowedContentInNoscriptInHead =
				"disallowed-content-in-noscript-in-head"),
			(e.openElementsLeftAfterEof = "open-elements-left-after-eof"),
			(e.abandonedHeadElementChild = "abandoned-head-element-child"),
			(e.misplacedStartTagForHeadElement =
				"misplaced-start-tag-for-head-element"),
			(e.nestedNoscriptInHead = "nested-noscript-in-head"),
			(e.eofInElementThatCanContainOnlyText =
				"eof-in-element-that-can-contain-only-text")
	})(Go || (Kr.ERR = Go = {}))
})
var qo = v(Xr => {
	"use strict"
	Object.defineProperty(Xr, "__esModule", {value: !0})
	Xr.Preprocessor = void 0
	var De = Vr(),
		ks = ar(),
		CP = 65536,
		Us = class {
			constructor(t) {
				;(this.handler = t),
					(this.html = ""),
					(this.pos = -1),
					(this.lastGapPos = -2),
					(this.gapStack = []),
					(this.skipNextNewLine = !1),
					(this.lastChunkWritten = !1),
					(this.endOfChunkHit = !1),
					(this.bufferWaterline = CP),
					(this.isEol = !1),
					(this.lineStartPos = 0),
					(this.droppedBufferSize = 0),
					(this.line = 1),
					(this.lastErrOffset = -1)
			}
			get col() {
				return (
					this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos)
				)
			}
			get offset() {
				return this.droppedBufferSize + this.pos
			}
			getError(t, r) {
				let {line: a, col: n, offset: i} = this,
					l = n + r,
					d = i + r
				return {
					code: t,
					startLine: a,
					endLine: a,
					startCol: l,
					endCol: l,
					startOffset: d,
					endOffset: d,
				}
			}
			_err(t) {
				this.handler.onParseError &&
					this.lastErrOffset !== this.offset &&
					((this.lastErrOffset = this.offset),
					this.handler.onParseError(this.getError(t, 0)))
			}
			_addGap() {
				this.gapStack.push(this.lastGapPos), (this.lastGapPos = this.pos)
			}
			_processSurrogate(t) {
				if (this.pos !== this.html.length - 1) {
					let r = this.html.charCodeAt(this.pos + 1)
					if ((0, De.isSurrogatePair)(r))
						return (
							this.pos++,
							this._addGap(),
							(0, De.getSurrogatePairCodePoint)(t, r)
						)
				} else if (!this.lastChunkWritten)
					return (this.endOfChunkHit = !0), De.CODE_POINTS.EOF
				return this._err(ks.ERR.surrogateInInputStream), t
			}
			willDropParsedChunk() {
				return this.pos > this.bufferWaterline
			}
			dropParsedChunk() {
				this.willDropParsedChunk() &&
					((this.html = this.html.substring(this.pos)),
					(this.lineStartPos -= this.pos),
					(this.droppedBufferSize += this.pos),
					(this.pos = 0),
					(this.lastGapPos = -2),
					(this.gapStack.length = 0))
			}
			write(t, r) {
				this.html.length > 0 ? (this.html += t) : (this.html = t),
					(this.endOfChunkHit = !1),
					(this.lastChunkWritten = r)
			}
			insertHtmlAtCurrentPos(t) {
				;(this.html =
					this.html.substring(0, this.pos + 1) +
					t +
					this.html.substring(this.pos + 1)),
					(this.endOfChunkHit = !1)
			}
			startsWith(t, r) {
				if (this.pos + t.length > this.html.length)
					return (this.endOfChunkHit = !this.lastChunkWritten), !1
				if (r) return this.html.startsWith(t, this.pos)
				for (let a = 0; a < t.length; a++)
					if (
						(this.html.charCodeAt(this.pos + a) | 32) !==
						t.charCodeAt(a)
					)
						return !1
				return !0
			}
			peek(t) {
				let r = this.pos + t
				if (r >= this.html.length)
					return (
						(this.endOfChunkHit = !this.lastChunkWritten),
						De.CODE_POINTS.EOF
					)
				let a = this.html.charCodeAt(r)
				return a === De.CODE_POINTS.CARRIAGE_RETURN
					? De.CODE_POINTS.LINE_FEED
					: a
			}
			advance() {
				if (
					(this.pos++,
					this.isEol &&
						((this.isEol = !1),
						this.line++,
						(this.lineStartPos = this.pos)),
					this.pos >= this.html.length)
				)
					return (
						(this.endOfChunkHit = !this.lastChunkWritten),
						De.CODE_POINTS.EOF
					)
				let t = this.html.charCodeAt(this.pos)
				return t === De.CODE_POINTS.CARRIAGE_RETURN
					? ((this.isEol = !0),
					  (this.skipNextNewLine = !0),
					  De.CODE_POINTS.LINE_FEED)
					: t === De.CODE_POINTS.LINE_FEED &&
					  ((this.isEol = !0), this.skipNextNewLine)
					? (this.line--,
					  (this.skipNextNewLine = !1),
					  this._addGap(),
					  this.advance())
					: ((this.skipNextNewLine = !1),
					  (0, De.isSurrogate)(t) && (t = this._processSurrogate(t)),
					  this.handler.onParseError === null ||
							(t > 31 && t < 127) ||
							t === De.CODE_POINTS.LINE_FEED ||
							t === De.CODE_POINTS.CARRIAGE_RETURN ||
							(t > 159 && t < 64976) ||
							this._checkForProblematicCharacters(t),
					  t)
			}
			_checkForProblematicCharacters(t) {
				;(0, De.isControlCodePoint)(t)
					? this._err(ks.ERR.controlCharacterInInputStream)
					: (0, De.isUndefinedCodePoint)(t) &&
					  this._err(ks.ERR.noncharacterInInputStream)
			}
			retreat(t) {
				for (this.pos -= t; this.pos < this.lastGapPos; )
					(this.lastGapPos = this.gapStack.pop()), this.pos--
				this.isEol = !1
			}
		}
	Xr.Preprocessor = Us
})
var Jr = v(nr => {
	"use strict"
	Object.defineProperty(nr, "__esModule", {value: !0})
	nr.TokenType = void 0
	nr.getTokenAttr = LP
	var Ho
	;(function (e) {
		;(e[(e.CHARACTER = 0)] = "CHARACTER"),
			(e[(e.NULL_CHARACTER = 1)] = "NULL_CHARACTER"),
			(e[(e.WHITESPACE_CHARACTER = 2)] = "WHITESPACE_CHARACTER"),
			(e[(e.START_TAG = 3)] = "START_TAG"),
			(e[(e.END_TAG = 4)] = "END_TAG"),
			(e[(e.COMMENT = 5)] = "COMMENT"),
			(e[(e.DOCTYPE = 6)] = "DOCTYPE"),
			(e[(e.EOF = 7)] = "EOF"),
			(e[(e.HIBERNATION = 8)] = "HIBERNATION")
	})(Ho || (nr.TokenType = Ho = {}))
	function LP(e, t) {
		for (let r = e.attrs.length - 1; r >= 0; r--)
			if (e.attrs[r].name === t) return e.attrs[r].value
		return null
	}
})
var Gs = v(Wr => {
	"use strict"
	Object.defineProperty(Wr, "__esModule", {value: !0})
	Wr.htmlDecodeTree = void 0
	Wr.htmlDecodeTree = new Uint16Array(
		'\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'
			.split("")
			.map(e => e.charCodeAt(0))
	)
})
var qs = v(Qr => {
	"use strict"
	Object.defineProperty(Qr, "__esModule", {value: !0})
	Qr.xmlDecodeTree = void 0
	Qr.xmlDecodeTree = new Uint16Array(
		"\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022"
			.split("")
			.map(e => e.charCodeAt(0))
	)
})
var js = v(Tt => {
	"use strict"
	var Hs
	Object.defineProperty(Tt, "__esModule", {value: !0})
	Tt.fromCodePoint = void 0
	Tt.replaceCodePoint = jo
	Tt.decodeCodePoint = RP
	var vP = new Map([
		[0, 65533],
		[128, 8364],
		[130, 8218],
		[131, 402],
		[132, 8222],
		[133, 8230],
		[134, 8224],
		[135, 8225],
		[136, 710],
		[137, 8240],
		[138, 352],
		[139, 8249],
		[140, 338],
		[142, 381],
		[145, 8216],
		[146, 8217],
		[147, 8220],
		[148, 8221],
		[149, 8226],
		[150, 8211],
		[151, 8212],
		[152, 732],
		[153, 8482],
		[154, 353],
		[155, 8250],
		[156, 339],
		[158, 382],
		[159, 376],
	])
	Tt.fromCodePoint =
		(Hs = String.fromCodePoint) !== null && Hs !== void 0
			? Hs
			: function (e) {
					let t = ""
					return (
						e > 65535 &&
							((e -= 65536),
							(t += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
							(e = 56320 | (e & 1023))),
						(t += String.fromCharCode(e)),
						t
					)
			  }
	function jo(e) {
		var t
		return (e >= 55296 && e <= 57343) || e > 1114111
			? 65533
			: (t = vP.get(e)) !== null && t !== void 0
			? t
			: e
	}
	function RP(e) {
		return (0, Tt.fromCodePoint)(jo(e))
	}
})
var Xo = v(le => {
	"use strict"
	Object.defineProperty(le, "__esModule", {value: !0})
	le.fromCodePoint =
		le.replaceCodePoint =
		le.decodeCodePoint =
		le.xmlDecodeTree =
		le.htmlDecodeTree =
		le.EntityDecoder =
		le.DecodingMode =
		le.BinTrieFlags =
			void 0
	le.determineBranch = Ko
	le.decodeHTML = qP
	le.decodeHTMLAttribute = HP
	le.decodeHTMLStrict = jP
	le.decodeXML = YP
	var MP = Gs(),
		BP = qs(),
		Yo = js(),
		Ee
	;(function (e) {
		;(e[(e.NUM = 35)] = "NUM"),
			(e[(e.SEMI = 59)] = "SEMI"),
			(e[(e.EQUALS = 61)] = "EQUALS"),
			(e[(e.ZERO = 48)] = "ZERO"),
			(e[(e.NINE = 57)] = "NINE"),
			(e[(e.LOWER_A = 97)] = "LOWER_A"),
			(e[(e.LOWER_F = 102)] = "LOWER_F"),
			(e[(e.LOWER_X = 120)] = "LOWER_X"),
			(e[(e.LOWER_Z = 122)] = "LOWER_Z"),
			(e[(e.UPPER_A = 65)] = "UPPER_A"),
			(e[(e.UPPER_F = 70)] = "UPPER_F"),
			(e[(e.UPPER_Z = 90)] = "UPPER_Z")
	})(Ee || (Ee = {}))
	var wP = 32,
		tt
	;(function (e) {
		;(e[(e.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
			(e[(e.BRANCH_LENGTH = 16256)] = "BRANCH_LENGTH"),
			(e[(e.JUMP_TABLE = 127)] = "JUMP_TABLE")
	})(tt || (le.BinTrieFlags = tt = {}))
	function Ys(e) {
		return e >= Ee.ZERO && e <= Ee.NINE
	}
	function FP(e) {
		return (
			(e >= Ee.UPPER_A && e <= Ee.UPPER_F) ||
			(e >= Ee.LOWER_A && e <= Ee.LOWER_F)
		)
	}
	function kP(e) {
		return (
			(e >= Ee.UPPER_A && e <= Ee.UPPER_Z) ||
			(e >= Ee.LOWER_A && e <= Ee.LOWER_Z) ||
			Ys(e)
		)
	}
	function UP(e) {
		return e === Ee.EQUALS || kP(e)
	}
	var me
	;(function (e) {
		;(e[(e.EntityStart = 0)] = "EntityStart"),
			(e[(e.NumericStart = 1)] = "NumericStart"),
			(e[(e.NumericDecimal = 2)] = "NumericDecimal"),
			(e[(e.NumericHex = 3)] = "NumericHex"),
			(e[(e.NamedEntity = 4)] = "NamedEntity")
	})(me || (me = {}))
	var Ue
	;(function (e) {
		;(e[(e.Legacy = 0)] = "Legacy"),
			(e[(e.Strict = 1)] = "Strict"),
			(e[(e.Attribute = 2)] = "Attribute")
	})(Ue || (le.DecodingMode = Ue = {}))
	var $r = class {
		constructor(t, r, a) {
			;(this.decodeTree = t),
				(this.emitCodePoint = r),
				(this.errors = a),
				(this.state = me.EntityStart),
				(this.consumed = 1),
				(this.result = 0),
				(this.treeIndex = 0),
				(this.excess = 1),
				(this.decodeMode = Ue.Strict)
		}
		startEntity(t) {
			;(this.decodeMode = t),
				(this.state = me.EntityStart),
				(this.result = 0),
				(this.treeIndex = 0),
				(this.excess = 1),
				(this.consumed = 1)
		}
		write(t, r) {
			switch (this.state) {
				case me.EntityStart:
					return t.charCodeAt(r) === Ee.NUM
						? ((this.state = me.NumericStart),
						  (this.consumed += 1),
						  this.stateNumericStart(t, r + 1))
						: ((this.state = me.NamedEntity), this.stateNamedEntity(t, r))
				case me.NumericStart:
					return this.stateNumericStart(t, r)
				case me.NumericDecimal:
					return this.stateNumericDecimal(t, r)
				case me.NumericHex:
					return this.stateNumericHex(t, r)
				case me.NamedEntity:
					return this.stateNamedEntity(t, r)
			}
		}
		stateNumericStart(t, r) {
			return r >= t.length
				? -1
				: (t.charCodeAt(r) | wP) === Ee.LOWER_X
				? ((this.state = me.NumericHex),
				  (this.consumed += 1),
				  this.stateNumericHex(t, r + 1))
				: ((this.state = me.NumericDecimal), this.stateNumericDecimal(t, r))
		}
		addToNumericResult(t, r, a, n) {
			if (r !== a) {
				let i = a - r
				;(this.result =
					this.result * Math.pow(n, i) +
					Number.parseInt(t.substr(r, i), n)),
					(this.consumed += i)
			}
		}
		stateNumericHex(t, r) {
			let a = r
			for (; r < t.length; ) {
				let n = t.charCodeAt(r)
				if (Ys(n) || FP(n)) r += 1
				else
					return (
						this.addToNumericResult(t, a, r, 16),
						this.emitNumericEntity(n, 3)
					)
			}
			return this.addToNumericResult(t, a, r, 16), -1
		}
		stateNumericDecimal(t, r) {
			let a = r
			for (; r < t.length; ) {
				let n = t.charCodeAt(r)
				if (Ys(n)) r += 1
				else
					return (
						this.addToNumericResult(t, a, r, 10),
						this.emitNumericEntity(n, 2)
					)
			}
			return this.addToNumericResult(t, a, r, 10), -1
		}
		emitNumericEntity(t, r) {
			var a
			if (this.consumed <= r)
				return (
					(a = this.errors) === null ||
						a === void 0 ||
						a.absenceOfDigitsInNumericCharacterReference(this.consumed),
					0
				)
			if (t === Ee.SEMI) this.consumed += 1
			else if (this.decodeMode === Ue.Strict) return 0
			return (
				this.emitCodePoint(
					(0, Yo.replaceCodePoint)(this.result),
					this.consumed
				),
				this.errors &&
					(t !== Ee.SEMI &&
						this.errors.missingSemicolonAfterCharacterReference(),
					this.errors.validateNumericCharacterReference(this.result)),
				this.consumed
			)
		}
		stateNamedEntity(t, r) {
			let {decodeTree: a} = this,
				n = a[this.treeIndex],
				i = (n & tt.VALUE_LENGTH) >> 14
			for (; r < t.length; r++, this.excess++) {
				let l = t.charCodeAt(r)
				if (
					((this.treeIndex = Ko(a, n, this.treeIndex + Math.max(1, i), l)),
					this.treeIndex < 0)
				)
					return this.result === 0 ||
						(this.decodeMode === Ue.Attribute && (i === 0 || UP(l)))
						? 0
						: this.emitNotTerminatedNamedEntity()
				if (
					((n = a[this.treeIndex]),
					(i = (n & tt.VALUE_LENGTH) >> 14),
					i !== 0)
				) {
					if (l === Ee.SEMI)
						return this.emitNamedEntityData(
							this.treeIndex,
							i,
							this.consumed + this.excess
						)
					this.decodeMode !== Ue.Strict &&
						((this.result = this.treeIndex),
						(this.consumed += this.excess),
						(this.excess = 0))
				}
			}
			return -1
		}
		emitNotTerminatedNamedEntity() {
			var t
			let {result: r, decodeTree: a} = this,
				n = (a[r] & tt.VALUE_LENGTH) >> 14
			return (
				this.emitNamedEntityData(r, n, this.consumed),
				(t = this.errors) === null ||
					t === void 0 ||
					t.missingSemicolonAfterCharacterReference(),
				this.consumed
			)
		}
		emitNamedEntityData(t, r, a) {
			let {decodeTree: n} = this
			return (
				this.emitCodePoint(r === 1 ? n[t] & ~tt.VALUE_LENGTH : n[t + 1], a),
				r === 3 && this.emitCodePoint(n[t + 2], a),
				a
			)
		}
		end() {
			var t
			switch (this.state) {
				case me.NamedEntity:
					return this.result !== 0 &&
						(this.decodeMode !== Ue.Attribute ||
							this.result === this.treeIndex)
						? this.emitNotTerminatedNamedEntity()
						: 0
				case me.NumericDecimal:
					return this.emitNumericEntity(0, 2)
				case me.NumericHex:
					return this.emitNumericEntity(0, 3)
				case me.NumericStart:
					return (
						(t = this.errors) === null ||
							t === void 0 ||
							t.absenceOfDigitsInNumericCharacterReference(
								this.consumed
							),
						0
					)
				case me.EntityStart:
					return 0
			}
		}
	}
	le.EntityDecoder = $r
	function Vo(e) {
		let t = "",
			r = new $r(e, a => (t += (0, Yo.fromCodePoint)(a)))
		return function (n, i) {
			let l = 0,
				d = 0
			for (; (d = n.indexOf("&", d)) >= 0; ) {
				;(t += n.slice(l, d)), r.startEntity(i)
				let g = r.write(n, d + 1)
				if (g < 0) {
					l = d + r.end()
					break
				}
				;(l = d + g), (d = g === 0 ? l + 1 : l)
			}
			let S = t + n.slice(l)
			return (t = ""), S
		}
	}
	function Ko(e, t, r, a) {
		let n = (t & tt.BRANCH_LENGTH) >> 7,
			i = t & tt.JUMP_TABLE
		if (n === 0) return i !== 0 && a === i ? r : -1
		if (i) {
			let S = a - i
			return S < 0 || S >= n ? -1 : e[r + S] - 1
		}
		let l = r,
			d = l + n - 1
		for (; l <= d; ) {
			let S = (l + d) >>> 1,
				g = e[S]
			if (g < a) l = S + 1
			else if (g > a) d = S - 1
			else return e[S + n]
		}
		return -1
	}
	var Vs = Vo(MP.htmlDecodeTree),
		GP = Vo(BP.xmlDecodeTree)
	function qP(e, t = Ue.Legacy) {
		return Vs(e, t)
	}
	function HP(e) {
		return Vs(e, Ue.Attribute)
	}
	function jP(e) {
		return Vs(e, Ue.Strict)
	}
	function YP(e) {
		return GP(e, Ue.Strict)
	}
	var VP = Gs()
	Object.defineProperty(le, "htmlDecodeTree", {
		enumerable: !0,
		get: function () {
			return VP.htmlDecodeTree
		},
	})
	var KP = qs()
	Object.defineProperty(le, "xmlDecodeTree", {
		enumerable: !0,
		get: function () {
			return KP.xmlDecodeTree
		},
	})
	var Ks = js()
	Object.defineProperty(le, "decodeCodePoint", {
		enumerable: !0,
		get: function () {
			return Ks.decodeCodePoint
		},
	})
	Object.defineProperty(le, "replaceCodePoint", {
		enumerable: !0,
		get: function () {
			return Ks.replaceCodePoint
		},
	})
	Object.defineProperty(le, "fromCodePoint", {
		enumerable: !0,
		get: function () {
			return Ks.fromCodePoint
		},
	})
})
var Je = v(ye => {
	"use strict"
	Object.defineProperty(ye, "__esModule", {value: !0})
	ye.NUMBERED_HEADERS =
		ye.SPECIAL_ELEMENTS =
		ye.TAG_ID =
		ye.TAG_NAMES =
		ye.DOCUMENT_MODE =
		ye.ATTRS =
		ye.NS =
			void 0
	ye.getTagID = JP
	ye.hasUnescapedText = QP
	var rt
	;(function (e) {
		;(e.HTML = "http://www.w3.org/1999/xhtml"),
			(e.MATHML = "http://www.w3.org/1998/Math/MathML"),
			(e.SVG = "http://www.w3.org/2000/svg"),
			(e.XLINK = "http://www.w3.org/1999/xlink"),
			(e.XML = "http://www.w3.org/XML/1998/namespace"),
			(e.XMLNS = "http://www.w3.org/2000/xmlns/")
	})(rt || (ye.NS = rt = {}))
	var Jo
	;(function (e) {
		;(e.TYPE = "type"),
			(e.ACTION = "action"),
			(e.ENCODING = "encoding"),
			(e.PROMPT = "prompt"),
			(e.NAME = "name"),
			(e.COLOR = "color"),
			(e.FACE = "face"),
			(e.SIZE = "size")
	})(Jo || (ye.ATTRS = Jo = {}))
	var Wo
	;(function (e) {
		;(e.NO_QUIRKS = "no-quirks"),
			(e.QUIRKS = "quirks"),
			(e.LIMITED_QUIRKS = "limited-quirks")
	})(Wo || (ye.DOCUMENT_MODE = Wo = {}))
	var O
	;(function (e) {
		;(e.A = "a"),
			(e.ADDRESS = "address"),
			(e.ANNOTATION_XML = "annotation-xml"),
			(e.APPLET = "applet"),
			(e.AREA = "area"),
			(e.ARTICLE = "article"),
			(e.ASIDE = "aside"),
			(e.B = "b"),
			(e.BASE = "base"),
			(e.BASEFONT = "basefont"),
			(e.BGSOUND = "bgsound"),
			(e.BIG = "big"),
			(e.BLOCKQUOTE = "blockquote"),
			(e.BODY = "body"),
			(e.BR = "br"),
			(e.BUTTON = "button"),
			(e.CAPTION = "caption"),
			(e.CENTER = "center"),
			(e.CODE = "code"),
			(e.COL = "col"),
			(e.COLGROUP = "colgroup"),
			(e.DD = "dd"),
			(e.DESC = "desc"),
			(e.DETAILS = "details"),
			(e.DIALOG = "dialog"),
			(e.DIR = "dir"),
			(e.DIV = "div"),
			(e.DL = "dl"),
			(e.DT = "dt"),
			(e.EM = "em"),
			(e.EMBED = "embed"),
			(e.FIELDSET = "fieldset"),
			(e.FIGCAPTION = "figcaption"),
			(e.FIGURE = "figure"),
			(e.FONT = "font"),
			(e.FOOTER = "footer"),
			(e.FOREIGN_OBJECT = "foreignObject"),
			(e.FORM = "form"),
			(e.FRAME = "frame"),
			(e.FRAMESET = "frameset"),
			(e.H1 = "h1"),
			(e.H2 = "h2"),
			(e.H3 = "h3"),
			(e.H4 = "h4"),
			(e.H5 = "h5"),
			(e.H6 = "h6"),
			(e.HEAD = "head"),
			(e.HEADER = "header"),
			(e.HGROUP = "hgroup"),
			(e.HR = "hr"),
			(e.HTML = "html"),
			(e.I = "i"),
			(e.IMG = "img"),
			(e.IMAGE = "image"),
			(e.INPUT = "input"),
			(e.IFRAME = "iframe"),
			(e.KEYGEN = "keygen"),
			(e.LABEL = "label"),
			(e.LI = "li"),
			(e.LINK = "link"),
			(e.LISTING = "listing"),
			(e.MAIN = "main"),
			(e.MALIGNMARK = "malignmark"),
			(e.MARQUEE = "marquee"),
			(e.MATH = "math"),
			(e.MENU = "menu"),
			(e.META = "meta"),
			(e.MGLYPH = "mglyph"),
			(e.MI = "mi"),
			(e.MO = "mo"),
			(e.MN = "mn"),
			(e.MS = "ms"),
			(e.MTEXT = "mtext"),
			(e.NAV = "nav"),
			(e.NOBR = "nobr"),
			(e.NOFRAMES = "noframes"),
			(e.NOEMBED = "noembed"),
			(e.NOSCRIPT = "noscript"),
			(e.OBJECT = "object"),
			(e.OL = "ol"),
			(e.OPTGROUP = "optgroup"),
			(e.OPTION = "option"),
			(e.P = "p"),
			(e.PARAM = "param"),
			(e.PLAINTEXT = "plaintext"),
			(e.PRE = "pre"),
			(e.RB = "rb"),
			(e.RP = "rp"),
			(e.RT = "rt"),
			(e.RTC = "rtc"),
			(e.RUBY = "ruby"),
			(e.S = "s"),
			(e.SCRIPT = "script"),
			(e.SEARCH = "search"),
			(e.SECTION = "section"),
			(e.SELECT = "select"),
			(e.SOURCE = "source"),
			(e.SMALL = "small"),
			(e.SPAN = "span"),
			(e.STRIKE = "strike"),
			(e.STRONG = "strong"),
			(e.STYLE = "style"),
			(e.SUB = "sub"),
			(e.SUMMARY = "summary"),
			(e.SUP = "sup"),
			(e.TABLE = "table"),
			(e.TBODY = "tbody"),
			(e.TEMPLATE = "template"),
			(e.TEXTAREA = "textarea"),
			(e.TFOOT = "tfoot"),
			(e.TD = "td"),
			(e.TH = "th"),
			(e.THEAD = "thead"),
			(e.TITLE = "title"),
			(e.TR = "tr"),
			(e.TRACK = "track"),
			(e.TT = "tt"),
			(e.U = "u"),
			(e.UL = "ul"),
			(e.SVG = "svg"),
			(e.VAR = "var"),
			(e.WBR = "wbr"),
			(e.XMP = "xmp")
	})(O || (ye.TAG_NAMES = O = {}))
	var P
	;(function (e) {
		;(e[(e.UNKNOWN = 0)] = "UNKNOWN"),
			(e[(e.A = 1)] = "A"),
			(e[(e.ADDRESS = 2)] = "ADDRESS"),
			(e[(e.ANNOTATION_XML = 3)] = "ANNOTATION_XML"),
			(e[(e.APPLET = 4)] = "APPLET"),
			(e[(e.AREA = 5)] = "AREA"),
			(e[(e.ARTICLE = 6)] = "ARTICLE"),
			(e[(e.ASIDE = 7)] = "ASIDE"),
			(e[(e.B = 8)] = "B"),
			(e[(e.BASE = 9)] = "BASE"),
			(e[(e.BASEFONT = 10)] = "BASEFONT"),
			(e[(e.BGSOUND = 11)] = "BGSOUND"),
			(e[(e.BIG = 12)] = "BIG"),
			(e[(e.BLOCKQUOTE = 13)] = "BLOCKQUOTE"),
			(e[(e.BODY = 14)] = "BODY"),
			(e[(e.BR = 15)] = "BR"),
			(e[(e.BUTTON = 16)] = "BUTTON"),
			(e[(e.CAPTION = 17)] = "CAPTION"),
			(e[(e.CENTER = 18)] = "CENTER"),
			(e[(e.CODE = 19)] = "CODE"),
			(e[(e.COL = 20)] = "COL"),
			(e[(e.COLGROUP = 21)] = "COLGROUP"),
			(e[(e.DD = 22)] = "DD"),
			(e[(e.DESC = 23)] = "DESC"),
			(e[(e.DETAILS = 24)] = "DETAILS"),
			(e[(e.DIALOG = 25)] = "DIALOG"),
			(e[(e.DIR = 26)] = "DIR"),
			(e[(e.DIV = 27)] = "DIV"),
			(e[(e.DL = 28)] = "DL"),
			(e[(e.DT = 29)] = "DT"),
			(e[(e.EM = 30)] = "EM"),
			(e[(e.EMBED = 31)] = "EMBED"),
			(e[(e.FIELDSET = 32)] = "FIELDSET"),
			(e[(e.FIGCAPTION = 33)] = "FIGCAPTION"),
			(e[(e.FIGURE = 34)] = "FIGURE"),
			(e[(e.FONT = 35)] = "FONT"),
			(e[(e.FOOTER = 36)] = "FOOTER"),
			(e[(e.FOREIGN_OBJECT = 37)] = "FOREIGN_OBJECT"),
			(e[(e.FORM = 38)] = "FORM"),
			(e[(e.FRAME = 39)] = "FRAME"),
			(e[(e.FRAMESET = 40)] = "FRAMESET"),
			(e[(e.H1 = 41)] = "H1"),
			(e[(e.H2 = 42)] = "H2"),
			(e[(e.H3 = 43)] = "H3"),
			(e[(e.H4 = 44)] = "H4"),
			(e[(e.H5 = 45)] = "H5"),
			(e[(e.H6 = 46)] = "H6"),
			(e[(e.HEAD = 47)] = "HEAD"),
			(e[(e.HEADER = 48)] = "HEADER"),
			(e[(e.HGROUP = 49)] = "HGROUP"),
			(e[(e.HR = 50)] = "HR"),
			(e[(e.HTML = 51)] = "HTML"),
			(e[(e.I = 52)] = "I"),
			(e[(e.IMG = 53)] = "IMG"),
			(e[(e.IMAGE = 54)] = "IMAGE"),
			(e[(e.INPUT = 55)] = "INPUT"),
			(e[(e.IFRAME = 56)] = "IFRAME"),
			(e[(e.KEYGEN = 57)] = "KEYGEN"),
			(e[(e.LABEL = 58)] = "LABEL"),
			(e[(e.LI = 59)] = "LI"),
			(e[(e.LINK = 60)] = "LINK"),
			(e[(e.LISTING = 61)] = "LISTING"),
			(e[(e.MAIN = 62)] = "MAIN"),
			(e[(e.MALIGNMARK = 63)] = "MALIGNMARK"),
			(e[(e.MARQUEE = 64)] = "MARQUEE"),
			(e[(e.MATH = 65)] = "MATH"),
			(e[(e.MENU = 66)] = "MENU"),
			(e[(e.META = 67)] = "META"),
			(e[(e.MGLYPH = 68)] = "MGLYPH"),
			(e[(e.MI = 69)] = "MI"),
			(e[(e.MO = 70)] = "MO"),
			(e[(e.MN = 71)] = "MN"),
			(e[(e.MS = 72)] = "MS"),
			(e[(e.MTEXT = 73)] = "MTEXT"),
			(e[(e.NAV = 74)] = "NAV"),
			(e[(e.NOBR = 75)] = "NOBR"),
			(e[(e.NOFRAMES = 76)] = "NOFRAMES"),
			(e[(e.NOEMBED = 77)] = "NOEMBED"),
			(e[(e.NOSCRIPT = 78)] = "NOSCRIPT"),
			(e[(e.OBJECT = 79)] = "OBJECT"),
			(e[(e.OL = 80)] = "OL"),
			(e[(e.OPTGROUP = 81)] = "OPTGROUP"),
			(e[(e.OPTION = 82)] = "OPTION"),
			(e[(e.P = 83)] = "P"),
			(e[(e.PARAM = 84)] = "PARAM"),
			(e[(e.PLAINTEXT = 85)] = "PLAINTEXT"),
			(e[(e.PRE = 86)] = "PRE"),
			(e[(e.RB = 87)] = "RB"),
			(e[(e.RP = 88)] = "RP"),
			(e[(e.RT = 89)] = "RT"),
			(e[(e.RTC = 90)] = "RTC"),
			(e[(e.RUBY = 91)] = "RUBY"),
			(e[(e.S = 92)] = "S"),
			(e[(e.SCRIPT = 93)] = "SCRIPT"),
			(e[(e.SEARCH = 94)] = "SEARCH"),
			(e[(e.SECTION = 95)] = "SECTION"),
			(e[(e.SELECT = 96)] = "SELECT"),
			(e[(e.SOURCE = 97)] = "SOURCE"),
			(e[(e.SMALL = 98)] = "SMALL"),
			(e[(e.SPAN = 99)] = "SPAN"),
			(e[(e.STRIKE = 100)] = "STRIKE"),
			(e[(e.STRONG = 101)] = "STRONG"),
			(e[(e.STYLE = 102)] = "STYLE"),
			(e[(e.SUB = 103)] = "SUB"),
			(e[(e.SUMMARY = 104)] = "SUMMARY"),
			(e[(e.SUP = 105)] = "SUP"),
			(e[(e.TABLE = 106)] = "TABLE"),
			(e[(e.TBODY = 107)] = "TBODY"),
			(e[(e.TEMPLATE = 108)] = "TEMPLATE"),
			(e[(e.TEXTAREA = 109)] = "TEXTAREA"),
			(e[(e.TFOOT = 110)] = "TFOOT"),
			(e[(e.TD = 111)] = "TD"),
			(e[(e.TH = 112)] = "TH"),
			(e[(e.THEAD = 113)] = "THEAD"),
			(e[(e.TITLE = 114)] = "TITLE"),
			(e[(e.TR = 115)] = "TR"),
			(e[(e.TRACK = 116)] = "TRACK"),
			(e[(e.TT = 117)] = "TT"),
			(e[(e.U = 118)] = "U"),
			(e[(e.UL = 119)] = "UL"),
			(e[(e.SVG = 120)] = "SVG"),
			(e[(e.VAR = 121)] = "VAR"),
			(e[(e.WBR = 122)] = "WBR"),
			(e[(e.XMP = 123)] = "XMP")
	})(P || (ye.TAG_ID = P = {}))
	var XP = new Map([
		[O.A, P.A],
		[O.ADDRESS, P.ADDRESS],
		[O.ANNOTATION_XML, P.ANNOTATION_XML],
		[O.APPLET, P.APPLET],
		[O.AREA, P.AREA],
		[O.ARTICLE, P.ARTICLE],
		[O.ASIDE, P.ASIDE],
		[O.B, P.B],
		[O.BASE, P.BASE],
		[O.BASEFONT, P.BASEFONT],
		[O.BGSOUND, P.BGSOUND],
		[O.BIG, P.BIG],
		[O.BLOCKQUOTE, P.BLOCKQUOTE],
		[O.BODY, P.BODY],
		[O.BR, P.BR],
		[O.BUTTON, P.BUTTON],
		[O.CAPTION, P.CAPTION],
		[O.CENTER, P.CENTER],
		[O.CODE, P.CODE],
		[O.COL, P.COL],
		[O.COLGROUP, P.COLGROUP],
		[O.DD, P.DD],
		[O.DESC, P.DESC],
		[O.DETAILS, P.DETAILS],
		[O.DIALOG, P.DIALOG],
		[O.DIR, P.DIR],
		[O.DIV, P.DIV],
		[O.DL, P.DL],
		[O.DT, P.DT],
		[O.EM, P.EM],
		[O.EMBED, P.EMBED],
		[O.FIELDSET, P.FIELDSET],
		[O.FIGCAPTION, P.FIGCAPTION],
		[O.FIGURE, P.FIGURE],
		[O.FONT, P.FONT],
		[O.FOOTER, P.FOOTER],
		[O.FOREIGN_OBJECT, P.FOREIGN_OBJECT],
		[O.FORM, P.FORM],
		[O.FRAME, P.FRAME],
		[O.FRAMESET, P.FRAMESET],
		[O.H1, P.H1],
		[O.H2, P.H2],
		[O.H3, P.H3],
		[O.H4, P.H4],
		[O.H5, P.H5],
		[O.H6, P.H6],
		[O.HEAD, P.HEAD],
		[O.HEADER, P.HEADER],
		[O.HGROUP, P.HGROUP],
		[O.HR, P.HR],
		[O.HTML, P.HTML],
		[O.I, P.I],
		[O.IMG, P.IMG],
		[O.IMAGE, P.IMAGE],
		[O.INPUT, P.INPUT],
		[O.IFRAME, P.IFRAME],
		[O.KEYGEN, P.KEYGEN],
		[O.LABEL, P.LABEL],
		[O.LI, P.LI],
		[O.LINK, P.LINK],
		[O.LISTING, P.LISTING],
		[O.MAIN, P.MAIN],
		[O.MALIGNMARK, P.MALIGNMARK],
		[O.MARQUEE, P.MARQUEE],
		[O.MATH, P.MATH],
		[O.MENU, P.MENU],
		[O.META, P.META],
		[O.MGLYPH, P.MGLYPH],
		[O.MI, P.MI],
		[O.MO, P.MO],
		[O.MN, P.MN],
		[O.MS, P.MS],
		[O.MTEXT, P.MTEXT],
		[O.NAV, P.NAV],
		[O.NOBR, P.NOBR],
		[O.NOFRAMES, P.NOFRAMES],
		[O.NOEMBED, P.NOEMBED],
		[O.NOSCRIPT, P.NOSCRIPT],
		[O.OBJECT, P.OBJECT],
		[O.OL, P.OL],
		[O.OPTGROUP, P.OPTGROUP],
		[O.OPTION, P.OPTION],
		[O.P, P.P],
		[O.PARAM, P.PARAM],
		[O.PLAINTEXT, P.PLAINTEXT],
		[O.PRE, P.PRE],
		[O.RB, P.RB],
		[O.RP, P.RP],
		[O.RT, P.RT],
		[O.RTC, P.RTC],
		[O.RUBY, P.RUBY],
		[O.S, P.S],
		[O.SCRIPT, P.SCRIPT],
		[O.SEARCH, P.SEARCH],
		[O.SECTION, P.SECTION],
		[O.SELECT, P.SELECT],
		[O.SOURCE, P.SOURCE],
		[O.SMALL, P.SMALL],
		[O.SPAN, P.SPAN],
		[O.STRIKE, P.STRIKE],
		[O.STRONG, P.STRONG],
		[O.STYLE, P.STYLE],
		[O.SUB, P.SUB],
		[O.SUMMARY, P.SUMMARY],
		[O.SUP, P.SUP],
		[O.TABLE, P.TABLE],
		[O.TBODY, P.TBODY],
		[O.TEMPLATE, P.TEMPLATE],
		[O.TEXTAREA, P.TEXTAREA],
		[O.TFOOT, P.TFOOT],
		[O.TD, P.TD],
		[O.TH, P.TH],
		[O.THEAD, P.THEAD],
		[O.TITLE, P.TITLE],
		[O.TR, P.TR],
		[O.TRACK, P.TRACK],
		[O.TT, P.TT],
		[O.U, P.U],
		[O.UL, P.UL],
		[O.SVG, P.SVG],
		[O.VAR, P.VAR],
		[O.WBR, P.WBR],
		[O.XMP, P.XMP],
	])
	function JP(e) {
		var t
		return (t = XP.get(e)) !== null && t !== void 0 ? t : P.UNKNOWN
	}
	var G = P
	ye.SPECIAL_ELEMENTS = {
		[rt.HTML]: new Set([
			G.ADDRESS,
			G.APPLET,
			G.AREA,
			G.ARTICLE,
			G.ASIDE,
			G.BASE,
			G.BASEFONT,
			G.BGSOUND,
			G.BLOCKQUOTE,
			G.BODY,
			G.BR,
			G.BUTTON,
			G.CAPTION,
			G.CENTER,
			G.COL,
			G.COLGROUP,
			G.DD,
			G.DETAILS,
			G.DIR,
			G.DIV,
			G.DL,
			G.DT,
			G.EMBED,
			G.FIELDSET,
			G.FIGCAPTION,
			G.FIGURE,
			G.FOOTER,
			G.FORM,
			G.FRAME,
			G.FRAMESET,
			G.H1,
			G.H2,
			G.H3,
			G.H4,
			G.H5,
			G.H6,
			G.HEAD,
			G.HEADER,
			G.HGROUP,
			G.HR,
			G.HTML,
			G.IFRAME,
			G.IMG,
			G.INPUT,
			G.LI,
			G.LINK,
			G.LISTING,
			G.MAIN,
			G.MARQUEE,
			G.MENU,
			G.META,
			G.NAV,
			G.NOEMBED,
			G.NOFRAMES,
			G.NOSCRIPT,
			G.OBJECT,
			G.OL,
			G.P,
			G.PARAM,
			G.PLAINTEXT,
			G.PRE,
			G.SCRIPT,
			G.SECTION,
			G.SELECT,
			G.SOURCE,
			G.STYLE,
			G.SUMMARY,
			G.TABLE,
			G.TBODY,
			G.TD,
			G.TEMPLATE,
			G.TEXTAREA,
			G.TFOOT,
			G.TH,
			G.THEAD,
			G.TITLE,
			G.TR,
			G.TRACK,
			G.UL,
			G.WBR,
			G.XMP,
		]),
		[rt.MATHML]: new Set([G.MI, G.MO, G.MN, G.MS, G.MTEXT, G.ANNOTATION_XML]),
		[rt.SVG]: new Set([G.TITLE, G.FOREIGN_OBJECT, G.DESC]),
		[rt.XLINK]: new Set(),
		[rt.XML]: new Set(),
		[rt.XMLNS]: new Set(),
	}
	ye.NUMBERED_HEADERS = new Set([G.H1, G.H2, G.H3, G.H4, G.H5, G.H6])
	var WP = new Set([
		O.STYLE,
		O.SCRIPT,
		O.XMP,
		O.IFRAME,
		O.NOEMBED,
		O.NOFRAMES,
		O.PLAINTEXT,
	])
	function QP(e, t) {
		return WP.has(e) || (t && e === O.NOSCRIPT)
	}
})
var Ws = v(Pt => {
	"use strict"
	Object.defineProperty(Pt, "__esModule", {value: !0})
	Pt.Tokenizer = Pt.TokenizerMode = void 0
	var $P = qo(),
		f = Vr(),
		ve = Jr(),
		zr = Xo(),
		B = ar(),
		Xs = Je(),
		A
	;(function (e) {
		;(e[(e.DATA = 0)] = "DATA"),
			(e[(e.RCDATA = 1)] = "RCDATA"),
			(e[(e.RAWTEXT = 2)] = "RAWTEXT"),
			(e[(e.SCRIPT_DATA = 3)] = "SCRIPT_DATA"),
			(e[(e.PLAINTEXT = 4)] = "PLAINTEXT"),
			(e[(e.TAG_OPEN = 5)] = "TAG_OPEN"),
			(e[(e.END_TAG_OPEN = 6)] = "END_TAG_OPEN"),
			(e[(e.TAG_NAME = 7)] = "TAG_NAME"),
			(e[(e.RCDATA_LESS_THAN_SIGN = 8)] = "RCDATA_LESS_THAN_SIGN"),
			(e[(e.RCDATA_END_TAG_OPEN = 9)] = "RCDATA_END_TAG_OPEN"),
			(e[(e.RCDATA_END_TAG_NAME = 10)] = "RCDATA_END_TAG_NAME"),
			(e[(e.RAWTEXT_LESS_THAN_SIGN = 11)] = "RAWTEXT_LESS_THAN_SIGN"),
			(e[(e.RAWTEXT_END_TAG_OPEN = 12)] = "RAWTEXT_END_TAG_OPEN"),
			(e[(e.RAWTEXT_END_TAG_NAME = 13)] = "RAWTEXT_END_TAG_NAME"),
			(e[(e.SCRIPT_DATA_LESS_THAN_SIGN = 14)] =
				"SCRIPT_DATA_LESS_THAN_SIGN"),
			(e[(e.SCRIPT_DATA_END_TAG_OPEN = 15)] = "SCRIPT_DATA_END_TAG_OPEN"),
			(e[(e.SCRIPT_DATA_END_TAG_NAME = 16)] = "SCRIPT_DATA_END_TAG_NAME"),
			(e[(e.SCRIPT_DATA_ESCAPE_START = 17)] = "SCRIPT_DATA_ESCAPE_START"),
			(e[(e.SCRIPT_DATA_ESCAPE_START_DASH = 18)] =
				"SCRIPT_DATA_ESCAPE_START_DASH"),
			(e[(e.SCRIPT_DATA_ESCAPED = 19)] = "SCRIPT_DATA_ESCAPED"),
			(e[(e.SCRIPT_DATA_ESCAPED_DASH = 20)] = "SCRIPT_DATA_ESCAPED_DASH"),
			(e[(e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21)] =
				"SCRIPT_DATA_ESCAPED_DASH_DASH"),
			(e[(e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22)] =
				"SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"),
			(e[(e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23)] =
				"SCRIPT_DATA_ESCAPED_END_TAG_OPEN"),
			(e[(e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24)] =
				"SCRIPT_DATA_ESCAPED_END_TAG_NAME"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25)] =
				"SCRIPT_DATA_DOUBLE_ESCAPE_START"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPED = 26)] =
				"SCRIPT_DATA_DOUBLE_ESCAPED"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27)] =
				"SCRIPT_DATA_DOUBLE_ESCAPED_DASH"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28)] =
				"SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29)] =
				"SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30)] =
				"SCRIPT_DATA_DOUBLE_ESCAPE_END"),
			(e[(e.BEFORE_ATTRIBUTE_NAME = 31)] = "BEFORE_ATTRIBUTE_NAME"),
			(e[(e.ATTRIBUTE_NAME = 32)] = "ATTRIBUTE_NAME"),
			(e[(e.AFTER_ATTRIBUTE_NAME = 33)] = "AFTER_ATTRIBUTE_NAME"),
			(e[(e.BEFORE_ATTRIBUTE_VALUE = 34)] = "BEFORE_ATTRIBUTE_VALUE"),
			(e[(e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35)] =
				"ATTRIBUTE_VALUE_DOUBLE_QUOTED"),
			(e[(e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36)] =
				"ATTRIBUTE_VALUE_SINGLE_QUOTED"),
			(e[(e.ATTRIBUTE_VALUE_UNQUOTED = 37)] = "ATTRIBUTE_VALUE_UNQUOTED"),
			(e[(e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38)] =
				"AFTER_ATTRIBUTE_VALUE_QUOTED"),
			(e[(e.SELF_CLOSING_START_TAG = 39)] = "SELF_CLOSING_START_TAG"),
			(e[(e.BOGUS_COMMENT = 40)] = "BOGUS_COMMENT"),
			(e[(e.MARKUP_DECLARATION_OPEN = 41)] = "MARKUP_DECLARATION_OPEN"),
			(e[(e.COMMENT_START = 42)] = "COMMENT_START"),
			(e[(e.COMMENT_START_DASH = 43)] = "COMMENT_START_DASH"),
			(e[(e.COMMENT = 44)] = "COMMENT"),
			(e[(e.COMMENT_LESS_THAN_SIGN = 45)] = "COMMENT_LESS_THAN_SIGN"),
			(e[(e.COMMENT_LESS_THAN_SIGN_BANG = 46)] =
				"COMMENT_LESS_THAN_SIGN_BANG"),
			(e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47)] =
				"COMMENT_LESS_THAN_SIGN_BANG_DASH"),
			(e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48)] =
				"COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"),
			(e[(e.COMMENT_END_DASH = 49)] = "COMMENT_END_DASH"),
			(e[(e.COMMENT_END = 50)] = "COMMENT_END"),
			(e[(e.COMMENT_END_BANG = 51)] = "COMMENT_END_BANG"),
			(e[(e.DOCTYPE = 52)] = "DOCTYPE"),
			(e[(e.BEFORE_DOCTYPE_NAME = 53)] = "BEFORE_DOCTYPE_NAME"),
			(e[(e.DOCTYPE_NAME = 54)] = "DOCTYPE_NAME"),
			(e[(e.AFTER_DOCTYPE_NAME = 55)] = "AFTER_DOCTYPE_NAME"),
			(e[(e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56)] =
				"AFTER_DOCTYPE_PUBLIC_KEYWORD"),
			(e[(e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57)] =
				"BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"),
			(e[(e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58)] =
				"DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"),
			(e[(e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59)] =
				"DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"),
			(e[(e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60)] =
				"AFTER_DOCTYPE_PUBLIC_IDENTIFIER"),
			(e[(e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61)] =
				"BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"),
			(e[(e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62)] =
				"AFTER_DOCTYPE_SYSTEM_KEYWORD"),
			(e[(e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63)] =
				"BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"),
			(e[(e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64)] =
				"DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"),
			(e[(e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65)] =
				"DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"),
			(e[(e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66)] =
				"AFTER_DOCTYPE_SYSTEM_IDENTIFIER"),
			(e[(e.BOGUS_DOCTYPE = 67)] = "BOGUS_DOCTYPE"),
			(e[(e.CDATA_SECTION = 68)] = "CDATA_SECTION"),
			(e[(e.CDATA_SECTION_BRACKET = 69)] = "CDATA_SECTION_BRACKET"),
			(e[(e.CDATA_SECTION_END = 70)] = "CDATA_SECTION_END"),
			(e[(e.CHARACTER_REFERENCE = 71)] = "CHARACTER_REFERENCE"),
			(e[(e.AMBIGUOUS_AMPERSAND = 72)] = "AMBIGUOUS_AMPERSAND")
	})(A || (A = {}))
	Pt.TokenizerMode = {
		DATA: A.DATA,
		RCDATA: A.RCDATA,
		RAWTEXT: A.RAWTEXT,
		SCRIPT_DATA: A.SCRIPT_DATA,
		PLAINTEXT: A.PLAINTEXT,
		CDATA_SECTION: A.CDATA_SECTION,
	}
	function zP(e) {
		return e >= f.CODE_POINTS.DIGIT_0 && e <= f.CODE_POINTS.DIGIT_9
	}
	function sr(e) {
		return (
			e >= f.CODE_POINTS.LATIN_CAPITAL_A &&
			e <= f.CODE_POINTS.LATIN_CAPITAL_Z
		)
	}
	function ZP(e) {
		return (
			e >= f.CODE_POINTS.LATIN_SMALL_A && e <= f.CODE_POINTS.LATIN_SMALL_Z
		)
	}
	function at(e) {
		return ZP(e) || sr(e)
	}
	function Qo(e) {
		return at(e) || zP(e)
	}
	function Zr(e) {
		return e + 32
	}
	function zo(e) {
		return (
			e === f.CODE_POINTS.SPACE ||
			e === f.CODE_POINTS.LINE_FEED ||
			e === f.CODE_POINTS.TABULATION ||
			e === f.CODE_POINTS.FORM_FEED
		)
	}
	function $o(e) {
		return (
			zo(e) ||
			e === f.CODE_POINTS.SOLIDUS ||
			e === f.CODE_POINTS.GREATER_THAN_SIGN
		)
	}
	function e2(e) {
		return e === f.CODE_POINTS.NULL
			? B.ERR.nullCharacterReference
			: e > 1114111
			? B.ERR.characterReferenceOutsideUnicodeRange
			: (0, f.isSurrogate)(e)
			? B.ERR.surrogateCharacterReference
			: (0, f.isUndefinedCodePoint)(e)
			? B.ERR.noncharacterCharacterReference
			: (0, f.isControlCodePoint)(e) || e === f.CODE_POINTS.CARRIAGE_RETURN
			? B.ERR.controlCharacterReference
			: null
	}
	var Js = class {
		constructor(t, r) {
			;(this.options = t),
				(this.handler = r),
				(this.paused = !1),
				(this.inLoop = !1),
				(this.inForeignNode = !1),
				(this.lastStartTagName = ""),
				(this.active = !1),
				(this.state = A.DATA),
				(this.returnState = A.DATA),
				(this.entityStartPos = 0),
				(this.consumedAfterSnapshot = -1),
				(this.currentCharacterToken = null),
				(this.currentToken = null),
				(this.currentAttr = {name: "", value: ""}),
				(this.preprocessor = new $P.Preprocessor(r)),
				(this.currentLocation = this.getCurrentLocation(-1)),
				(this.entityDecoder = new zr.EntityDecoder(
					zr.htmlDecodeTree,
					(a, n) => {
						;(this.preprocessor.pos = this.entityStartPos + n - 1),
							this._flushCodePointConsumedAsCharacterReference(a)
					},
					r.onParseError
						? {
								missingSemicolonAfterCharacterReference: () => {
									this._err(
										B.ERR.missingSemicolonAfterCharacterReference,
										1
									)
								},
								absenceOfDigitsInNumericCharacterReference: a => {
									this._err(
										B.ERR.absenceOfDigitsInNumericCharacterReference,
										this.entityStartPos - this.preprocessor.pos + a
									)
								},
								validateNumericCharacterReference: a => {
									let n = e2(a)
									n && this._err(n, 1)
								},
						  }
						: void 0
				))
		}
		_err(t, r = 0) {
			var a, n
			;(n = (a = this.handler).onParseError) === null ||
				n === void 0 ||
				n.call(a, this.preprocessor.getError(t, r))
		}
		getCurrentLocation(t) {
			return this.options.sourceCodeLocationInfo
				? {
						startLine: this.preprocessor.line,
						startCol: this.preprocessor.col - t,
						startOffset: this.preprocessor.offset - t,
						endLine: -1,
						endCol: -1,
						endOffset: -1,
				  }
				: null
		}
		_runParsingLoop() {
			if (!this.inLoop) {
				for (this.inLoop = !0; this.active && !this.paused; ) {
					this.consumedAfterSnapshot = 0
					let t = this._consume()
					this._ensureHibernation() || this._callState(t)
				}
				this.inLoop = !1
			}
		}
		pause() {
			this.paused = !0
		}
		resume(t) {
			if (!this.paused) throw new Error("Parser was already resumed")
			;(this.paused = !1),
				!this.inLoop && (this._runParsingLoop(), this.paused || t?.())
		}
		write(t, r, a) {
			;(this.active = !0),
				this.preprocessor.write(t, r),
				this._runParsingLoop(),
				this.paused || a?.()
		}
		insertHtmlAtCurrentPos(t) {
			;(this.active = !0),
				this.preprocessor.insertHtmlAtCurrentPos(t),
				this._runParsingLoop()
		}
		_ensureHibernation() {
			return this.preprocessor.endOfChunkHit
				? (this.preprocessor.retreat(this.consumedAfterSnapshot),
				  (this.consumedAfterSnapshot = 0),
				  (this.active = !1),
				  !0)
				: !1
		}
		_consume() {
			return this.consumedAfterSnapshot++, this.preprocessor.advance()
		}
		_advanceBy(t) {
			this.consumedAfterSnapshot += t
			for (let r = 0; r < t; r++) this.preprocessor.advance()
		}
		_consumeSequenceIfMatch(t, r) {
			return this.preprocessor.startsWith(t, r)
				? (this._advanceBy(t.length - 1), !0)
				: !1
		}
		_createStartTagToken() {
			this.currentToken = {
				type: ve.TokenType.START_TAG,
				tagName: "",
				tagID: Xs.TAG_ID.UNKNOWN,
				selfClosing: !1,
				ackSelfClosing: !1,
				attrs: [],
				location: this.getCurrentLocation(1),
			}
		}
		_createEndTagToken() {
			this.currentToken = {
				type: ve.TokenType.END_TAG,
				tagName: "",
				tagID: Xs.TAG_ID.UNKNOWN,
				selfClosing: !1,
				ackSelfClosing: !1,
				attrs: [],
				location: this.getCurrentLocation(2),
			}
		}
		_createCommentToken(t) {
			this.currentToken = {
				type: ve.TokenType.COMMENT,
				data: "",
				location: this.getCurrentLocation(t),
			}
		}
		_createDoctypeToken(t) {
			this.currentToken = {
				type: ve.TokenType.DOCTYPE,
				name: t,
				forceQuirks: !1,
				publicId: null,
				systemId: null,
				location: this.currentLocation,
			}
		}
		_createCharacterToken(t, r) {
			this.currentCharacterToken = {
				type: t,
				chars: r,
				location: this.currentLocation,
			}
		}
		_createAttr(t) {
			;(this.currentAttr = {name: t, value: ""}),
				(this.currentLocation = this.getCurrentLocation(0))
		}
		_leaveAttrName() {
			var t, r
			let a = this.currentToken
			if ((0, ve.getTokenAttr)(a, this.currentAttr.name) === null) {
				if (
					(a.attrs.push(this.currentAttr),
					a.location && this.currentLocation)
				) {
					let n =
						(t = (r = a.location).attrs) !== null && t !== void 0
							? t
							: (r.attrs = Object.create(null))
					;(n[this.currentAttr.name] = this.currentLocation),
						this._leaveAttrValue()
				}
			} else this._err(B.ERR.duplicateAttribute)
		}
		_leaveAttrValue() {
			this.currentLocation &&
				((this.currentLocation.endLine = this.preprocessor.line),
				(this.currentLocation.endCol = this.preprocessor.col),
				(this.currentLocation.endOffset = this.preprocessor.offset))
		}
		prepareToken(t) {
			this._emitCurrentCharacterToken(t.location),
				(this.currentToken = null),
				t.location &&
					((t.location.endLine = this.preprocessor.line),
					(t.location.endCol = this.preprocessor.col + 1),
					(t.location.endOffset = this.preprocessor.offset + 1)),
				(this.currentLocation = this.getCurrentLocation(-1))
		}
		emitCurrentTagToken() {
			let t = this.currentToken
			this.prepareToken(t),
				(t.tagID = (0, Xs.getTagID)(t.tagName)),
				t.type === ve.TokenType.START_TAG
					? ((this.lastStartTagName = t.tagName),
					  this.handler.onStartTag(t))
					: (t.attrs.length > 0 && this._err(B.ERR.endTagWithAttributes),
					  t.selfClosing && this._err(B.ERR.endTagWithTrailingSolidus),
					  this.handler.onEndTag(t)),
				this.preprocessor.dropParsedChunk()
		}
		emitCurrentComment(t) {
			this.prepareToken(t),
				this.handler.onComment(t),
				this.preprocessor.dropParsedChunk()
		}
		emitCurrentDoctype(t) {
			this.prepareToken(t),
				this.handler.onDoctype(t),
				this.preprocessor.dropParsedChunk()
		}
		_emitCurrentCharacterToken(t) {
			if (this.currentCharacterToken) {
				switch (
					(t &&
						this.currentCharacterToken.location &&
						((this.currentCharacterToken.location.endLine = t.startLine),
						(this.currentCharacterToken.location.endCol = t.startCol),
						(this.currentCharacterToken.location.endOffset =
							t.startOffset)),
					this.currentCharacterToken.type)
				) {
					case ve.TokenType.CHARACTER: {
						this.handler.onCharacter(this.currentCharacterToken)
						break
					}
					case ve.TokenType.NULL_CHARACTER: {
						this.handler.onNullCharacter(this.currentCharacterToken)
						break
					}
					case ve.TokenType.WHITESPACE_CHARACTER: {
						this.handler.onWhitespaceCharacter(this.currentCharacterToken)
						break
					}
				}
				this.currentCharacterToken = null
			}
		}
		_emitEOFToken() {
			let t = this.getCurrentLocation(0)
			t &&
				((t.endLine = t.startLine),
				(t.endCol = t.startCol),
				(t.endOffset = t.startOffset)),
				this._emitCurrentCharacterToken(t),
				this.handler.onEof({type: ve.TokenType.EOF, location: t}),
				(this.active = !1)
		}
		_appendCharToCurrentCharacterToken(t, r) {
			if (this.currentCharacterToken)
				if (this.currentCharacterToken.type === t) {
					this.currentCharacterToken.chars += r
					return
				} else
					(this.currentLocation = this.getCurrentLocation(0)),
						this._emitCurrentCharacterToken(this.currentLocation),
						this.preprocessor.dropParsedChunk()
			this._createCharacterToken(t, r)
		}
		_emitCodePoint(t) {
			let r = zo(t)
				? ve.TokenType.WHITESPACE_CHARACTER
				: t === f.CODE_POINTS.NULL
				? ve.TokenType.NULL_CHARACTER
				: ve.TokenType.CHARACTER
			this._appendCharToCurrentCharacterToken(r, String.fromCodePoint(t))
		}
		_emitChars(t) {
			this._appendCharToCurrentCharacterToken(ve.TokenType.CHARACTER, t)
		}
		_startCharacterReference() {
			;(this.returnState = this.state),
				(this.state = A.CHARACTER_REFERENCE),
				(this.entityStartPos = this.preprocessor.pos),
				this.entityDecoder.startEntity(
					this._isCharacterReferenceInAttribute()
						? zr.DecodingMode.Attribute
						: zr.DecodingMode.Legacy
				)
		}
		_isCharacterReferenceInAttribute() {
			return (
				this.returnState === A.ATTRIBUTE_VALUE_DOUBLE_QUOTED ||
				this.returnState === A.ATTRIBUTE_VALUE_SINGLE_QUOTED ||
				this.returnState === A.ATTRIBUTE_VALUE_UNQUOTED
			)
		}
		_flushCodePointConsumedAsCharacterReference(t) {
			this._isCharacterReferenceInAttribute()
				? (this.currentAttr.value += String.fromCodePoint(t))
				: this._emitCodePoint(t)
		}
		_callState(t) {
			switch (this.state) {
				case A.DATA: {
					this._stateData(t)
					break
				}
				case A.RCDATA: {
					this._stateRcdata(t)
					break
				}
				case A.RAWTEXT: {
					this._stateRawtext(t)
					break
				}
				case A.SCRIPT_DATA: {
					this._stateScriptData(t)
					break
				}
				case A.PLAINTEXT: {
					this._statePlaintext(t)
					break
				}
				case A.TAG_OPEN: {
					this._stateTagOpen(t)
					break
				}
				case A.END_TAG_OPEN: {
					this._stateEndTagOpen(t)
					break
				}
				case A.TAG_NAME: {
					this._stateTagName(t)
					break
				}
				case A.RCDATA_LESS_THAN_SIGN: {
					this._stateRcdataLessThanSign(t)
					break
				}
				case A.RCDATA_END_TAG_OPEN: {
					this._stateRcdataEndTagOpen(t)
					break
				}
				case A.RCDATA_END_TAG_NAME: {
					this._stateRcdataEndTagName(t)
					break
				}
				case A.RAWTEXT_LESS_THAN_SIGN: {
					this._stateRawtextLessThanSign(t)
					break
				}
				case A.RAWTEXT_END_TAG_OPEN: {
					this._stateRawtextEndTagOpen(t)
					break
				}
				case A.RAWTEXT_END_TAG_NAME: {
					this._stateRawtextEndTagName(t)
					break
				}
				case A.SCRIPT_DATA_LESS_THAN_SIGN: {
					this._stateScriptDataLessThanSign(t)
					break
				}
				case A.SCRIPT_DATA_END_TAG_OPEN: {
					this._stateScriptDataEndTagOpen(t)
					break
				}
				case A.SCRIPT_DATA_END_TAG_NAME: {
					this._stateScriptDataEndTagName(t)
					break
				}
				case A.SCRIPT_DATA_ESCAPE_START: {
					this._stateScriptDataEscapeStart(t)
					break
				}
				case A.SCRIPT_DATA_ESCAPE_START_DASH: {
					this._stateScriptDataEscapeStartDash(t)
					break
				}
				case A.SCRIPT_DATA_ESCAPED: {
					this._stateScriptDataEscaped(t)
					break
				}
				case A.SCRIPT_DATA_ESCAPED_DASH: {
					this._stateScriptDataEscapedDash(t)
					break
				}
				case A.SCRIPT_DATA_ESCAPED_DASH_DASH: {
					this._stateScriptDataEscapedDashDash(t)
					break
				}
				case A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
					this._stateScriptDataEscapedLessThanSign(t)
					break
				}
				case A.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
					this._stateScriptDataEscapedEndTagOpen(t)
					break
				}
				case A.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
					this._stateScriptDataEscapedEndTagName(t)
					break
				}
				case A.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
					this._stateScriptDataDoubleEscapeStart(t)
					break
				}
				case A.SCRIPT_DATA_DOUBLE_ESCAPED: {
					this._stateScriptDataDoubleEscaped(t)
					break
				}
				case A.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
					this._stateScriptDataDoubleEscapedDash(t)
					break
				}
				case A.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
					this._stateScriptDataDoubleEscapedDashDash(t)
					break
				}
				case A.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
					this._stateScriptDataDoubleEscapedLessThanSign(t)
					break
				}
				case A.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
					this._stateScriptDataDoubleEscapeEnd(t)
					break
				}
				case A.BEFORE_ATTRIBUTE_NAME: {
					this._stateBeforeAttributeName(t)
					break
				}
				case A.ATTRIBUTE_NAME: {
					this._stateAttributeName(t)
					break
				}
				case A.AFTER_ATTRIBUTE_NAME: {
					this._stateAfterAttributeName(t)
					break
				}
				case A.BEFORE_ATTRIBUTE_VALUE: {
					this._stateBeforeAttributeValue(t)
					break
				}
				case A.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
					this._stateAttributeValueDoubleQuoted(t)
					break
				}
				case A.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
					this._stateAttributeValueSingleQuoted(t)
					break
				}
				case A.ATTRIBUTE_VALUE_UNQUOTED: {
					this._stateAttributeValueUnquoted(t)
					break
				}
				case A.AFTER_ATTRIBUTE_VALUE_QUOTED: {
					this._stateAfterAttributeValueQuoted(t)
					break
				}
				case A.SELF_CLOSING_START_TAG: {
					this._stateSelfClosingStartTag(t)
					break
				}
				case A.BOGUS_COMMENT: {
					this._stateBogusComment(t)
					break
				}
				case A.MARKUP_DECLARATION_OPEN: {
					this._stateMarkupDeclarationOpen(t)
					break
				}
				case A.COMMENT_START: {
					this._stateCommentStart(t)
					break
				}
				case A.COMMENT_START_DASH: {
					this._stateCommentStartDash(t)
					break
				}
				case A.COMMENT: {
					this._stateComment(t)
					break
				}
				case A.COMMENT_LESS_THAN_SIGN: {
					this._stateCommentLessThanSign(t)
					break
				}
				case A.COMMENT_LESS_THAN_SIGN_BANG: {
					this._stateCommentLessThanSignBang(t)
					break
				}
				case A.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
					this._stateCommentLessThanSignBangDash(t)
					break
				}
				case A.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
					this._stateCommentLessThanSignBangDashDash(t)
					break
				}
				case A.COMMENT_END_DASH: {
					this._stateCommentEndDash(t)
					break
				}
				case A.COMMENT_END: {
					this._stateCommentEnd(t)
					break
				}
				case A.COMMENT_END_BANG: {
					this._stateCommentEndBang(t)
					break
				}
				case A.DOCTYPE: {
					this._stateDoctype(t)
					break
				}
				case A.BEFORE_DOCTYPE_NAME: {
					this._stateBeforeDoctypeName(t)
					break
				}
				case A.DOCTYPE_NAME: {
					this._stateDoctypeName(t)
					break
				}
				case A.AFTER_DOCTYPE_NAME: {
					this._stateAfterDoctypeName(t)
					break
				}
				case A.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
					this._stateAfterDoctypePublicKeyword(t)
					break
				}
				case A.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
					this._stateBeforeDoctypePublicIdentifier(t)
					break
				}
				case A.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
					this._stateDoctypePublicIdentifierDoubleQuoted(t)
					break
				}
				case A.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
					this._stateDoctypePublicIdentifierSingleQuoted(t)
					break
				}
				case A.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
					this._stateAfterDoctypePublicIdentifier(t)
					break
				}
				case A.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
					this._stateBetweenDoctypePublicAndSystemIdentifiers(t)
					break
				}
				case A.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
					this._stateAfterDoctypeSystemKeyword(t)
					break
				}
				case A.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
					this._stateBeforeDoctypeSystemIdentifier(t)
					break
				}
				case A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
					this._stateDoctypeSystemIdentifierDoubleQuoted(t)
					break
				}
				case A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
					this._stateDoctypeSystemIdentifierSingleQuoted(t)
					break
				}
				case A.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
					this._stateAfterDoctypeSystemIdentifier(t)
					break
				}
				case A.BOGUS_DOCTYPE: {
					this._stateBogusDoctype(t)
					break
				}
				case A.CDATA_SECTION: {
					this._stateCdataSection(t)
					break
				}
				case A.CDATA_SECTION_BRACKET: {
					this._stateCdataSectionBracket(t)
					break
				}
				case A.CDATA_SECTION_END: {
					this._stateCdataSectionEnd(t)
					break
				}
				case A.CHARACTER_REFERENCE: {
					this._stateCharacterReference()
					break
				}
				case A.AMBIGUOUS_AMPERSAND: {
					this._stateAmbiguousAmpersand(t)
					break
				}
				default:
					throw new Error("Unknown state")
			}
		}
		_stateData(t) {
			switch (t) {
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					this.state = A.TAG_OPEN
					break
				}
				case f.CODE_POINTS.AMPERSAND: {
					this._startCharacterReference()
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter), this._emitCodePoint(t)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._emitEOFToken()
					break
				}
				default:
					this._emitCodePoint(t)
			}
		}
		_stateRcdata(t) {
			switch (t) {
				case f.CODE_POINTS.AMPERSAND: {
					this._startCharacterReference()
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					this.state = A.RCDATA_LESS_THAN_SIGN
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._emitEOFToken()
					break
				}
				default:
					this._emitCodePoint(t)
			}
		}
		_stateRawtext(t) {
			switch (t) {
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					this.state = A.RAWTEXT_LESS_THAN_SIGN
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._emitEOFToken()
					break
				}
				default:
					this._emitCodePoint(t)
			}
		}
		_stateScriptData(t) {
			switch (t) {
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					this.state = A.SCRIPT_DATA_LESS_THAN_SIGN
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._emitEOFToken()
					break
				}
				default:
					this._emitCodePoint(t)
			}
		}
		_statePlaintext(t) {
			switch (t) {
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._emitEOFToken()
					break
				}
				default:
					this._emitCodePoint(t)
			}
		}
		_stateTagOpen(t) {
			if (at(t))
				this._createStartTagToken(),
					(this.state = A.TAG_NAME),
					this._stateTagName(t)
			else
				switch (t) {
					case f.CODE_POINTS.EXCLAMATION_MARK: {
						this.state = A.MARKUP_DECLARATION_OPEN
						break
					}
					case f.CODE_POINTS.SOLIDUS: {
						this.state = A.END_TAG_OPEN
						break
					}
					case f.CODE_POINTS.QUESTION_MARK: {
						this._err(B.ERR.unexpectedQuestionMarkInsteadOfTagName),
							this._createCommentToken(1),
							(this.state = A.BOGUS_COMMENT),
							this._stateBogusComment(t)
						break
					}
					case f.CODE_POINTS.EOF: {
						this._err(B.ERR.eofBeforeTagName),
							this._emitChars("<"),
							this._emitEOFToken()
						break
					}
					default:
						this._err(B.ERR.invalidFirstCharacterOfTagName),
							this._emitChars("<"),
							(this.state = A.DATA),
							this._stateData(t)
				}
		}
		_stateEndTagOpen(t) {
			if (at(t))
				this._createEndTagToken(),
					(this.state = A.TAG_NAME),
					this._stateTagName(t)
			else
				switch (t) {
					case f.CODE_POINTS.GREATER_THAN_SIGN: {
						this._err(B.ERR.missingEndTagName), (this.state = A.DATA)
						break
					}
					case f.CODE_POINTS.EOF: {
						this._err(B.ERR.eofBeforeTagName),
							this._emitChars("</"),
							this._emitEOFToken()
						break
					}
					default:
						this._err(B.ERR.invalidFirstCharacterOfTagName),
							this._createCommentToken(2),
							(this.state = A.BOGUS_COMMENT),
							this._stateBogusComment(t)
				}
		}
		_stateTagName(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED: {
					this.state = A.BEFORE_ATTRIBUTE_NAME
					break
				}
				case f.CODE_POINTS.SOLIDUS: {
					this.state = A.SELF_CLOSING_START_TAG
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.DATA), this.emitCurrentTagToken()
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(r.tagName += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInTag), this._emitEOFToken()
					break
				}
				default:
					r.tagName += String.fromCodePoint(sr(t) ? Zr(t) : t)
			}
		}
		_stateRcdataLessThanSign(t) {
			t === f.CODE_POINTS.SOLIDUS
				? (this.state = A.RCDATA_END_TAG_OPEN)
				: (this._emitChars("<"),
				  (this.state = A.RCDATA),
				  this._stateRcdata(t))
		}
		_stateRcdataEndTagOpen(t) {
			at(t)
				? ((this.state = A.RCDATA_END_TAG_NAME),
				  this._stateRcdataEndTagName(t))
				: (this._emitChars("</"),
				  (this.state = A.RCDATA),
				  this._stateRcdata(t))
		}
		handleSpecialEndTag(t) {
			if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
				return !this._ensureHibernation()
			this._createEndTagToken()
			let r = this.currentToken
			switch (
				((r.tagName = this.lastStartTagName),
				this.preprocessor.peek(this.lastStartTagName.length))
			) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					return (
						this._advanceBy(this.lastStartTagName.length),
						(this.state = A.BEFORE_ATTRIBUTE_NAME),
						!1
					)
				case f.CODE_POINTS.SOLIDUS:
					return (
						this._advanceBy(this.lastStartTagName.length),
						(this.state = A.SELF_CLOSING_START_TAG),
						!1
					)
				case f.CODE_POINTS.GREATER_THAN_SIGN:
					return (
						this._advanceBy(this.lastStartTagName.length),
						this.emitCurrentTagToken(),
						(this.state = A.DATA),
						!1
					)
				default:
					return !this._ensureHibernation()
			}
		}
		_stateRcdataEndTagName(t) {
			this.handleSpecialEndTag(t) &&
				(this._emitChars("</"),
				(this.state = A.RCDATA),
				this._stateRcdata(t))
		}
		_stateRawtextLessThanSign(t) {
			t === f.CODE_POINTS.SOLIDUS
				? (this.state = A.RAWTEXT_END_TAG_OPEN)
				: (this._emitChars("<"),
				  (this.state = A.RAWTEXT),
				  this._stateRawtext(t))
		}
		_stateRawtextEndTagOpen(t) {
			at(t)
				? ((this.state = A.RAWTEXT_END_TAG_NAME),
				  this._stateRawtextEndTagName(t))
				: (this._emitChars("</"),
				  (this.state = A.RAWTEXT),
				  this._stateRawtext(t))
		}
		_stateRawtextEndTagName(t) {
			this.handleSpecialEndTag(t) &&
				(this._emitChars("</"),
				(this.state = A.RAWTEXT),
				this._stateRawtext(t))
		}
		_stateScriptDataLessThanSign(t) {
			switch (t) {
				case f.CODE_POINTS.SOLIDUS: {
					this.state = A.SCRIPT_DATA_END_TAG_OPEN
					break
				}
				case f.CODE_POINTS.EXCLAMATION_MARK: {
					;(this.state = A.SCRIPT_DATA_ESCAPE_START), this._emitChars("<!")
					break
				}
				default:
					this._emitChars("<"),
						(this.state = A.SCRIPT_DATA),
						this._stateScriptData(t)
			}
		}
		_stateScriptDataEndTagOpen(t) {
			at(t)
				? ((this.state = A.SCRIPT_DATA_END_TAG_NAME),
				  this._stateScriptDataEndTagName(t))
				: (this._emitChars("</"),
				  (this.state = A.SCRIPT_DATA),
				  this._stateScriptData(t))
		}
		_stateScriptDataEndTagName(t) {
			this.handleSpecialEndTag(t) &&
				(this._emitChars("</"),
				(this.state = A.SCRIPT_DATA),
				this._stateScriptData(t))
		}
		_stateScriptDataEscapeStart(t) {
			t === f.CODE_POINTS.HYPHEN_MINUS
				? ((this.state = A.SCRIPT_DATA_ESCAPE_START_DASH),
				  this._emitChars("-"))
				: ((this.state = A.SCRIPT_DATA), this._stateScriptData(t))
		}
		_stateScriptDataEscapeStartDash(t) {
			t === f.CODE_POINTS.HYPHEN_MINUS
				? ((this.state = A.SCRIPT_DATA_ESCAPED_DASH_DASH),
				  this._emitChars("-"))
				: ((this.state = A.SCRIPT_DATA), this._stateScriptData(t))
		}
		_stateScriptDataEscaped(t) {
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					;(this.state = A.SCRIPT_DATA_ESCAPED_DASH), this._emitChars("-")
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					this.state = A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInScriptHtmlCommentLikeText),
						this._emitEOFToken()
					break
				}
				default:
					this._emitCodePoint(t)
			}
		}
		_stateScriptDataEscapedDash(t) {
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					;(this.state = A.SCRIPT_DATA_ESCAPED_DASH_DASH),
						this._emitChars("-")
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					this.state = A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(this.state = A.SCRIPT_DATA_ESCAPED),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInScriptHtmlCommentLikeText),
						this._emitEOFToken()
					break
				}
				default:
					;(this.state = A.SCRIPT_DATA_ESCAPED), this._emitCodePoint(t)
			}
		}
		_stateScriptDataEscapedDashDash(t) {
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					this._emitChars("-")
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					this.state = A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.SCRIPT_DATA), this._emitChars(">")
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(this.state = A.SCRIPT_DATA_ESCAPED),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInScriptHtmlCommentLikeText),
						this._emitEOFToken()
					break
				}
				default:
					;(this.state = A.SCRIPT_DATA_ESCAPED), this._emitCodePoint(t)
			}
		}
		_stateScriptDataEscapedLessThanSign(t) {
			t === f.CODE_POINTS.SOLIDUS
				? (this.state = A.SCRIPT_DATA_ESCAPED_END_TAG_OPEN)
				: at(t)
				? (this._emitChars("<"),
				  (this.state = A.SCRIPT_DATA_DOUBLE_ESCAPE_START),
				  this._stateScriptDataDoubleEscapeStart(t))
				: (this._emitChars("<"),
				  (this.state = A.SCRIPT_DATA_ESCAPED),
				  this._stateScriptDataEscaped(t))
		}
		_stateScriptDataEscapedEndTagOpen(t) {
			at(t)
				? ((this.state = A.SCRIPT_DATA_ESCAPED_END_TAG_NAME),
				  this._stateScriptDataEscapedEndTagName(t))
				: (this._emitChars("</"),
				  (this.state = A.SCRIPT_DATA_ESCAPED),
				  this._stateScriptDataEscaped(t))
		}
		_stateScriptDataEscapedEndTagName(t) {
			this.handleSpecialEndTag(t) &&
				(this._emitChars("</"),
				(this.state = A.SCRIPT_DATA_ESCAPED),
				this._stateScriptDataEscaped(t))
		}
		_stateScriptDataDoubleEscapeStart(t) {
			if (
				this.preprocessor.startsWith(f.SEQUENCES.SCRIPT, !1) &&
				$o(this.preprocessor.peek(f.SEQUENCES.SCRIPT.length))
			) {
				this._emitCodePoint(t)
				for (let r = 0; r < f.SEQUENCES.SCRIPT.length; r++)
					this._emitCodePoint(this._consume())
				this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED
			} else
				this._ensureHibernation() ||
					((this.state = A.SCRIPT_DATA_ESCAPED),
					this._stateScriptDataEscaped(t))
		}
		_stateScriptDataDoubleEscaped(t) {
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					;(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_DASH),
						this._emitChars("-")
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					;(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
						this._emitChars("<")
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInScriptHtmlCommentLikeText),
						this._emitEOFToken()
					break
				}
				default:
					this._emitCodePoint(t)
			}
		}
		_stateScriptDataDoubleEscapedDash(t) {
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					;(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH),
						this._emitChars("-")
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					;(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
						this._emitChars("<")
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInScriptHtmlCommentLikeText),
						this._emitEOFToken()
					break
				}
				default:
					;(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED),
						this._emitCodePoint(t)
			}
		}
		_stateScriptDataDoubleEscapedDashDash(t) {
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					this._emitChars("-")
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					;(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
						this._emitChars("<")
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.SCRIPT_DATA), this._emitChars(">")
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED),
						this._emitChars(f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInScriptHtmlCommentLikeText),
						this._emitEOFToken()
					break
				}
				default:
					;(this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED),
						this._emitCodePoint(t)
			}
		}
		_stateScriptDataDoubleEscapedLessThanSign(t) {
			t === f.CODE_POINTS.SOLIDUS
				? ((this.state = A.SCRIPT_DATA_DOUBLE_ESCAPE_END),
				  this._emitChars("/"))
				: ((this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED),
				  this._stateScriptDataDoubleEscaped(t))
		}
		_stateScriptDataDoubleEscapeEnd(t) {
			if (
				this.preprocessor.startsWith(f.SEQUENCES.SCRIPT, !1) &&
				$o(this.preprocessor.peek(f.SEQUENCES.SCRIPT.length))
			) {
				this._emitCodePoint(t)
				for (let r = 0; r < f.SEQUENCES.SCRIPT.length; r++)
					this._emitCodePoint(this._consume())
				this.state = A.SCRIPT_DATA_ESCAPED
			} else
				this._ensureHibernation() ||
					((this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED),
					this._stateScriptDataDoubleEscaped(t))
		}
		_stateBeforeAttributeName(t) {
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					break
				case f.CODE_POINTS.SOLIDUS:
				case f.CODE_POINTS.GREATER_THAN_SIGN:
				case f.CODE_POINTS.EOF: {
					;(this.state = A.AFTER_ATTRIBUTE_NAME),
						this._stateAfterAttributeName(t)
					break
				}
				case f.CODE_POINTS.EQUALS_SIGN: {
					this._err(B.ERR.unexpectedEqualsSignBeforeAttributeName),
						this._createAttr("="),
						(this.state = A.ATTRIBUTE_NAME)
					break
				}
				default:
					this._createAttr(""),
						(this.state = A.ATTRIBUTE_NAME),
						this._stateAttributeName(t)
			}
		}
		_stateAttributeName(t) {
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
				case f.CODE_POINTS.SOLIDUS:
				case f.CODE_POINTS.GREATER_THAN_SIGN:
				case f.CODE_POINTS.EOF: {
					this._leaveAttrName(),
						(this.state = A.AFTER_ATTRIBUTE_NAME),
						this._stateAfterAttributeName(t)
					break
				}
				case f.CODE_POINTS.EQUALS_SIGN: {
					this._leaveAttrName(), (this.state = A.BEFORE_ATTRIBUTE_VALUE)
					break
				}
				case f.CODE_POINTS.QUOTATION_MARK:
				case f.CODE_POINTS.APOSTROPHE:
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					this._err(B.ERR.unexpectedCharacterInAttributeName),
						(this.currentAttr.name += String.fromCodePoint(t))
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(this.currentAttr.name += f.REPLACEMENT_CHARACTER)
					break
				}
				default:
					this.currentAttr.name += String.fromCodePoint(sr(t) ? Zr(t) : t)
			}
		}
		_stateAfterAttributeName(t) {
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					break
				case f.CODE_POINTS.SOLIDUS: {
					this.state = A.SELF_CLOSING_START_TAG
					break
				}
				case f.CODE_POINTS.EQUALS_SIGN: {
					this.state = A.BEFORE_ATTRIBUTE_VALUE
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.DATA), this.emitCurrentTagToken()
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInTag), this._emitEOFToken()
					break
				}
				default:
					this._createAttr(""),
						(this.state = A.ATTRIBUTE_NAME),
						this._stateAttributeName(t)
			}
		}
		_stateBeforeAttributeValue(t) {
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					break
				case f.CODE_POINTS.QUOTATION_MARK: {
					this.state = A.ATTRIBUTE_VALUE_DOUBLE_QUOTED
					break
				}
				case f.CODE_POINTS.APOSTROPHE: {
					this.state = A.ATTRIBUTE_VALUE_SINGLE_QUOTED
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.missingAttributeValue),
						(this.state = A.DATA),
						this.emitCurrentTagToken()
					break
				}
				default:
					;(this.state = A.ATTRIBUTE_VALUE_UNQUOTED),
						this._stateAttributeValueUnquoted(t)
			}
		}
		_stateAttributeValueDoubleQuoted(t) {
			switch (t) {
				case f.CODE_POINTS.QUOTATION_MARK: {
					this.state = A.AFTER_ATTRIBUTE_VALUE_QUOTED
					break
				}
				case f.CODE_POINTS.AMPERSAND: {
					this._startCharacterReference()
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(this.currentAttr.value += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInTag), this._emitEOFToken()
					break
				}
				default:
					this.currentAttr.value += String.fromCodePoint(t)
			}
		}
		_stateAttributeValueSingleQuoted(t) {
			switch (t) {
				case f.CODE_POINTS.APOSTROPHE: {
					this.state = A.AFTER_ATTRIBUTE_VALUE_QUOTED
					break
				}
				case f.CODE_POINTS.AMPERSAND: {
					this._startCharacterReference()
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(this.currentAttr.value += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInTag), this._emitEOFToken()
					break
				}
				default:
					this.currentAttr.value += String.fromCodePoint(t)
			}
		}
		_stateAttributeValueUnquoted(t) {
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED: {
					this._leaveAttrValue(), (this.state = A.BEFORE_ATTRIBUTE_NAME)
					break
				}
				case f.CODE_POINTS.AMPERSAND: {
					this._startCharacterReference()
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._leaveAttrValue(),
						(this.state = A.DATA),
						this.emitCurrentTagToken()
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(this.currentAttr.value += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.QUOTATION_MARK:
				case f.CODE_POINTS.APOSTROPHE:
				case f.CODE_POINTS.LESS_THAN_SIGN:
				case f.CODE_POINTS.EQUALS_SIGN:
				case f.CODE_POINTS.GRAVE_ACCENT: {
					this._err(B.ERR.unexpectedCharacterInUnquotedAttributeValue),
						(this.currentAttr.value += String.fromCodePoint(t))
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInTag), this._emitEOFToken()
					break
				}
				default:
					this.currentAttr.value += String.fromCodePoint(t)
			}
		}
		_stateAfterAttributeValueQuoted(t) {
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED: {
					this._leaveAttrValue(), (this.state = A.BEFORE_ATTRIBUTE_NAME)
					break
				}
				case f.CODE_POINTS.SOLIDUS: {
					this._leaveAttrValue(), (this.state = A.SELF_CLOSING_START_TAG)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._leaveAttrValue(),
						(this.state = A.DATA),
						this.emitCurrentTagToken()
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInTag), this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.missingWhitespaceBetweenAttributes),
						(this.state = A.BEFORE_ATTRIBUTE_NAME),
						this._stateBeforeAttributeName(t)
			}
		}
		_stateSelfClosingStartTag(t) {
			switch (t) {
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					let r = this.currentToken
					;(r.selfClosing = !0),
						(this.state = A.DATA),
						this.emitCurrentTagToken()
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInTag), this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.unexpectedSolidusInTag),
						(this.state = A.BEFORE_ATTRIBUTE_NAME),
						this._stateBeforeAttributeName(t)
			}
		}
		_stateBogusComment(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.DATA), this.emitCurrentComment(r)
					break
				}
				case f.CODE_POINTS.EOF: {
					this.emitCurrentComment(r), this._emitEOFToken()
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(r.data += f.REPLACEMENT_CHARACTER)
					break
				}
				default:
					r.data += String.fromCodePoint(t)
			}
		}
		_stateMarkupDeclarationOpen(t) {
			this._consumeSequenceIfMatch(f.SEQUENCES.DASH_DASH, !0)
				? (this._createCommentToken(f.SEQUENCES.DASH_DASH.length + 1),
				  (this.state = A.COMMENT_START))
				: this._consumeSequenceIfMatch(f.SEQUENCES.DOCTYPE, !1)
				? ((this.currentLocation = this.getCurrentLocation(
						f.SEQUENCES.DOCTYPE.length + 1
				  )),
				  (this.state = A.DOCTYPE))
				: this._consumeSequenceIfMatch(f.SEQUENCES.CDATA_START, !0)
				? this.inForeignNode
					? (this.state = A.CDATA_SECTION)
					: (this._err(B.ERR.cdataInHtmlContent),
					  this._createCommentToken(f.SEQUENCES.CDATA_START.length + 1),
					  (this.currentToken.data = "[CDATA["),
					  (this.state = A.BOGUS_COMMENT))
				: this._ensureHibernation() ||
				  (this._err(B.ERR.incorrectlyOpenedComment),
				  this._createCommentToken(2),
				  (this.state = A.BOGUS_COMMENT),
				  this._stateBogusComment(t))
		}
		_stateCommentStart(t) {
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					this.state = A.COMMENT_START_DASH
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.abruptClosingOfEmptyComment),
						(this.state = A.DATA)
					let r = this.currentToken
					this.emitCurrentComment(r)
					break
				}
				default:
					;(this.state = A.COMMENT), this._stateComment(t)
			}
		}
		_stateCommentStartDash(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					this.state = A.COMMENT_END
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.abruptClosingOfEmptyComment),
						(this.state = A.DATA),
						this.emitCurrentComment(r)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInComment),
						this.emitCurrentComment(r),
						this._emitEOFToken()
					break
				}
				default:
					;(r.data += "-"), (this.state = A.COMMENT), this._stateComment(t)
			}
		}
		_stateComment(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					this.state = A.COMMENT_END_DASH
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					;(r.data += "<"), (this.state = A.COMMENT_LESS_THAN_SIGN)
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(r.data += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInComment),
						this.emitCurrentComment(r),
						this._emitEOFToken()
					break
				}
				default:
					r.data += String.fromCodePoint(t)
			}
		}
		_stateCommentLessThanSign(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.EXCLAMATION_MARK: {
					;(r.data += "!"), (this.state = A.COMMENT_LESS_THAN_SIGN_BANG)
					break
				}
				case f.CODE_POINTS.LESS_THAN_SIGN: {
					r.data += "<"
					break
				}
				default:
					;(this.state = A.COMMENT), this._stateComment(t)
			}
		}
		_stateCommentLessThanSignBang(t) {
			t === f.CODE_POINTS.HYPHEN_MINUS
				? (this.state = A.COMMENT_LESS_THAN_SIGN_BANG_DASH)
				: ((this.state = A.COMMENT), this._stateComment(t))
		}
		_stateCommentLessThanSignBangDash(t) {
			t === f.CODE_POINTS.HYPHEN_MINUS
				? (this.state = A.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH)
				: ((this.state = A.COMMENT_END_DASH), this._stateCommentEndDash(t))
		}
		_stateCommentLessThanSignBangDashDash(t) {
			t !== f.CODE_POINTS.GREATER_THAN_SIGN &&
				t !== f.CODE_POINTS.EOF &&
				this._err(B.ERR.nestedComment),
				(this.state = A.COMMENT_END),
				this._stateCommentEnd(t)
		}
		_stateCommentEndDash(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					this.state = A.COMMENT_END
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInComment),
						this.emitCurrentComment(r),
						this._emitEOFToken()
					break
				}
				default:
					;(r.data += "-"), (this.state = A.COMMENT), this._stateComment(t)
			}
		}
		_stateCommentEnd(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.DATA), this.emitCurrentComment(r)
					break
				}
				case f.CODE_POINTS.EXCLAMATION_MARK: {
					this.state = A.COMMENT_END_BANG
					break
				}
				case f.CODE_POINTS.HYPHEN_MINUS: {
					r.data += "-"
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInComment),
						this.emitCurrentComment(r),
						this._emitEOFToken()
					break
				}
				default:
					;(r.data += "--"),
						(this.state = A.COMMENT),
						this._stateComment(t)
			}
		}
		_stateCommentEndBang(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.HYPHEN_MINUS: {
					;(r.data += "--!"), (this.state = A.COMMENT_END_DASH)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.incorrectlyClosedComment),
						(this.state = A.DATA),
						this.emitCurrentComment(r)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInComment),
						this.emitCurrentComment(r),
						this._emitEOFToken()
					break
				}
				default:
					;(r.data += "--!"),
						(this.state = A.COMMENT),
						this._stateComment(t)
			}
		}
		_stateDoctype(t) {
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED: {
					this.state = A.BEFORE_DOCTYPE_NAME
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.BEFORE_DOCTYPE_NAME),
						this._stateBeforeDoctypeName(t)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype), this._createDoctypeToken(null)
					let r = this.currentToken
					;(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.missingWhitespaceBeforeDoctypeName),
						(this.state = A.BEFORE_DOCTYPE_NAME),
						this._stateBeforeDoctypeName(t)
			}
		}
		_stateBeforeDoctypeName(t) {
			if (sr(t))
				this._createDoctypeToken(String.fromCharCode(Zr(t))),
					(this.state = A.DOCTYPE_NAME)
			else
				switch (t) {
					case f.CODE_POINTS.SPACE:
					case f.CODE_POINTS.LINE_FEED:
					case f.CODE_POINTS.TABULATION:
					case f.CODE_POINTS.FORM_FEED:
						break
					case f.CODE_POINTS.NULL: {
						this._err(B.ERR.unexpectedNullCharacter),
							this._createDoctypeToken(f.REPLACEMENT_CHARACTER),
							(this.state = A.DOCTYPE_NAME)
						break
					}
					case f.CODE_POINTS.GREATER_THAN_SIGN: {
						this._err(B.ERR.missingDoctypeName),
							this._createDoctypeToken(null)
						let r = this.currentToken
						;(r.forceQuirks = !0),
							this.emitCurrentDoctype(r),
							(this.state = A.DATA)
						break
					}
					case f.CODE_POINTS.EOF: {
						this._err(B.ERR.eofInDoctype), this._createDoctypeToken(null)
						let r = this.currentToken
						;(r.forceQuirks = !0),
							this.emitCurrentDoctype(r),
							this._emitEOFToken()
						break
					}
					default:
						this._createDoctypeToken(String.fromCodePoint(t)),
							(this.state = A.DOCTYPE_NAME)
				}
		}
		_stateDoctypeName(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED: {
					this.state = A.AFTER_DOCTYPE_NAME
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.DATA), this.emitCurrentDoctype(r)
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(r.name += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					r.name += String.fromCodePoint(sr(t) ? Zr(t) : t)
			}
		}
		_stateAfterDoctypeName(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					break
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.DATA), this.emitCurrentDoctype(r)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._consumeSequenceIfMatch(f.SEQUENCES.PUBLIC, !1)
						? (this.state = A.AFTER_DOCTYPE_PUBLIC_KEYWORD)
						: this._consumeSequenceIfMatch(f.SEQUENCES.SYSTEM, !1)
						? (this.state = A.AFTER_DOCTYPE_SYSTEM_KEYWORD)
						: this._ensureHibernation() ||
						  (this._err(B.ERR.invalidCharacterSequenceAfterDoctypeName),
						  (r.forceQuirks = !0),
						  (this.state = A.BOGUS_DOCTYPE),
						  this._stateBogusDoctype(t))
			}
		}
		_stateAfterDoctypePublicKeyword(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED: {
					this.state = A.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER
					break
				}
				case f.CODE_POINTS.QUOTATION_MARK: {
					this._err(B.ERR.missingWhitespaceAfterDoctypePublicKeyword),
						(r.publicId = ""),
						(this.state = A.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED)
					break
				}
				case f.CODE_POINTS.APOSTROPHE: {
					this._err(B.ERR.missingWhitespaceAfterDoctypePublicKeyword),
						(r.publicId = ""),
						(this.state = A.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.missingDoctypePublicIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.DATA),
						this.emitCurrentDoctype(r)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.missingQuoteBeforeDoctypePublicIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t)
			}
		}
		_stateBeforeDoctypePublicIdentifier(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					break
				case f.CODE_POINTS.QUOTATION_MARK: {
					;(r.publicId = ""),
						(this.state = A.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED)
					break
				}
				case f.CODE_POINTS.APOSTROPHE: {
					;(r.publicId = ""),
						(this.state = A.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.missingDoctypePublicIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.DATA),
						this.emitCurrentDoctype(r)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.missingQuoteBeforeDoctypePublicIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t)
			}
		}
		_stateDoctypePublicIdentifierDoubleQuoted(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.QUOTATION_MARK: {
					this.state = A.AFTER_DOCTYPE_PUBLIC_IDENTIFIER
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(r.publicId += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.abruptDoctypePublicIdentifier),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						(this.state = A.DATA)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					r.publicId += String.fromCodePoint(t)
			}
		}
		_stateDoctypePublicIdentifierSingleQuoted(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.APOSTROPHE: {
					this.state = A.AFTER_DOCTYPE_PUBLIC_IDENTIFIER
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(r.publicId += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.abruptDoctypePublicIdentifier),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						(this.state = A.DATA)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					r.publicId += String.fromCodePoint(t)
			}
		}
		_stateAfterDoctypePublicIdentifier(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED: {
					this.state = A.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					;(this.state = A.DATA), this.emitCurrentDoctype(r)
					break
				}
				case f.CODE_POINTS.QUOTATION_MARK: {
					this._err(
						B.ERR
							.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
					),
						(r.systemId = ""),
						(this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED)
					break
				}
				case f.CODE_POINTS.APOSTROPHE: {
					this._err(
						B.ERR
							.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
					),
						(r.systemId = ""),
						(this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.missingQuoteBeforeDoctypeSystemIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t)
			}
		}
		_stateBetweenDoctypePublicAndSystemIdentifiers(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					break
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this.emitCurrentDoctype(r), (this.state = A.DATA)
					break
				}
				case f.CODE_POINTS.QUOTATION_MARK: {
					;(r.systemId = ""),
						(this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED)
					break
				}
				case f.CODE_POINTS.APOSTROPHE: {
					;(r.systemId = ""),
						(this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.missingQuoteBeforeDoctypeSystemIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t)
			}
		}
		_stateAfterDoctypeSystemKeyword(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED: {
					this.state = A.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER
					break
				}
				case f.CODE_POINTS.QUOTATION_MARK: {
					this._err(B.ERR.missingWhitespaceAfterDoctypeSystemKeyword),
						(r.systemId = ""),
						(this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED)
					break
				}
				case f.CODE_POINTS.APOSTROPHE: {
					this._err(B.ERR.missingWhitespaceAfterDoctypeSystemKeyword),
						(r.systemId = ""),
						(this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.missingDoctypeSystemIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.DATA),
						this.emitCurrentDoctype(r)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.missingQuoteBeforeDoctypeSystemIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t)
			}
		}
		_stateBeforeDoctypeSystemIdentifier(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					break
				case f.CODE_POINTS.QUOTATION_MARK: {
					;(r.systemId = ""),
						(this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED)
					break
				}
				case f.CODE_POINTS.APOSTROPHE: {
					;(r.systemId = ""),
						(this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.missingDoctypeSystemIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.DATA),
						this.emitCurrentDoctype(r)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.missingQuoteBeforeDoctypeSystemIdentifier),
						(r.forceQuirks = !0),
						(this.state = A.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t)
			}
		}
		_stateDoctypeSystemIdentifierDoubleQuoted(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.QUOTATION_MARK: {
					this.state = A.AFTER_DOCTYPE_SYSTEM_IDENTIFIER
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(r.systemId += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.abruptDoctypeSystemIdentifier),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						(this.state = A.DATA)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					r.systemId += String.fromCodePoint(t)
			}
		}
		_stateDoctypeSystemIdentifierSingleQuoted(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.APOSTROPHE: {
					this.state = A.AFTER_DOCTYPE_SYSTEM_IDENTIFIER
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter),
						(r.systemId += f.REPLACEMENT_CHARACTER)
					break
				}
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this._err(B.ERR.abruptDoctypeSystemIdentifier),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						(this.state = A.DATA)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					r.systemId += String.fromCodePoint(t)
			}
		}
		_stateAfterDoctypeSystemIdentifier(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.SPACE:
				case f.CODE_POINTS.LINE_FEED:
				case f.CODE_POINTS.TABULATION:
				case f.CODE_POINTS.FORM_FEED:
					break
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this.emitCurrentDoctype(r), (this.state = A.DATA)
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInDoctype),
						(r.forceQuirks = !0),
						this.emitCurrentDoctype(r),
						this._emitEOFToken()
					break
				}
				default:
					this._err(B.ERR.unexpectedCharacterAfterDoctypeSystemIdentifier),
						(this.state = A.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t)
			}
		}
		_stateBogusDoctype(t) {
			let r = this.currentToken
			switch (t) {
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this.emitCurrentDoctype(r), (this.state = A.DATA)
					break
				}
				case f.CODE_POINTS.NULL: {
					this._err(B.ERR.unexpectedNullCharacter)
					break
				}
				case f.CODE_POINTS.EOF: {
					this.emitCurrentDoctype(r), this._emitEOFToken()
					break
				}
				default:
			}
		}
		_stateCdataSection(t) {
			switch (t) {
				case f.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
					this.state = A.CDATA_SECTION_BRACKET
					break
				}
				case f.CODE_POINTS.EOF: {
					this._err(B.ERR.eofInCdata), this._emitEOFToken()
					break
				}
				default:
					this._emitCodePoint(t)
			}
		}
		_stateCdataSectionBracket(t) {
			t === f.CODE_POINTS.RIGHT_SQUARE_BRACKET
				? (this.state = A.CDATA_SECTION_END)
				: (this._emitChars("]"),
				  (this.state = A.CDATA_SECTION),
				  this._stateCdataSection(t))
		}
		_stateCdataSectionEnd(t) {
			switch (t) {
				case f.CODE_POINTS.GREATER_THAN_SIGN: {
					this.state = A.DATA
					break
				}
				case f.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
					this._emitChars("]")
					break
				}
				default:
					this._emitChars("]]"),
						(this.state = A.CDATA_SECTION),
						this._stateCdataSection(t)
			}
		}
		_stateCharacterReference() {
			let t = this.entityDecoder.write(
				this.preprocessor.html,
				this.preprocessor.pos
			)
			if (t < 0)
				if (this.preprocessor.lastChunkWritten) t = this.entityDecoder.end()
				else {
					;(this.active = !1),
						(this.preprocessor.pos = this.preprocessor.html.length - 1),
						(this.consumedAfterSnapshot = 0),
						(this.preprocessor.endOfChunkHit = !0)
					return
				}
			t === 0
				? ((this.preprocessor.pos = this.entityStartPos),
				  this._flushCodePointConsumedAsCharacterReference(
						f.CODE_POINTS.AMPERSAND
				  ),
				  (this.state =
						!this._isCharacterReferenceInAttribute() &&
						Qo(this.preprocessor.peek(1))
							? A.AMBIGUOUS_AMPERSAND
							: this.returnState))
				: (this.state = this.returnState)
		}
		_stateAmbiguousAmpersand(t) {
			Qo(t)
				? this._flushCodePointConsumedAsCharacterReference(t)
				: (t === f.CODE_POINTS.SEMICOLON &&
						this._err(B.ERR.unknownNamedCharacterReference),
				  (this.state = this.returnState),
				  this._callState(t))
		}
	}
	Pt.Tokenizer = Js
})
var al = v(ta => {
	"use strict"
	Object.defineProperty(ta, "__esModule", {value: !0})
	ta.OpenElementStack = void 0
	var j = Je(),
		rl = new Set([
			j.TAG_ID.DD,
			j.TAG_ID.DT,
			j.TAG_ID.LI,
			j.TAG_ID.OPTGROUP,
			j.TAG_ID.OPTION,
			j.TAG_ID.P,
			j.TAG_ID.RB,
			j.TAG_ID.RP,
			j.TAG_ID.RT,
			j.TAG_ID.RTC,
		]),
		Zo = new Set([
			...rl,
			j.TAG_ID.CAPTION,
			j.TAG_ID.COLGROUP,
			j.TAG_ID.TBODY,
			j.TAG_ID.TD,
			j.TAG_ID.TFOOT,
			j.TAG_ID.TH,
			j.TAG_ID.THEAD,
			j.TAG_ID.TR,
		]),
		ea = new Set([
			j.TAG_ID.APPLET,
			j.TAG_ID.CAPTION,
			j.TAG_ID.HTML,
			j.TAG_ID.MARQUEE,
			j.TAG_ID.OBJECT,
			j.TAG_ID.TABLE,
			j.TAG_ID.TD,
			j.TAG_ID.TEMPLATE,
			j.TAG_ID.TH,
		]),
		t2 = new Set([...ea, j.TAG_ID.OL, j.TAG_ID.UL]),
		r2 = new Set([...ea, j.TAG_ID.BUTTON]),
		el = new Set([
			j.TAG_ID.ANNOTATION_XML,
			j.TAG_ID.MI,
			j.TAG_ID.MN,
			j.TAG_ID.MO,
			j.TAG_ID.MS,
			j.TAG_ID.MTEXT,
		]),
		tl = new Set([j.TAG_ID.DESC, j.TAG_ID.FOREIGN_OBJECT, j.TAG_ID.TITLE]),
		a2 = new Set([j.TAG_ID.TR, j.TAG_ID.TEMPLATE, j.TAG_ID.HTML]),
		n2 = new Set([
			j.TAG_ID.TBODY,
			j.TAG_ID.TFOOT,
			j.TAG_ID.THEAD,
			j.TAG_ID.TEMPLATE,
			j.TAG_ID.HTML,
		]),
		s2 = new Set([j.TAG_ID.TABLE, j.TAG_ID.TEMPLATE, j.TAG_ID.HTML]),
		i2 = new Set([j.TAG_ID.TD, j.TAG_ID.TH]),
		Qs = class {
			get currentTmplContentOrNode() {
				return this._isInTemplate()
					? this.treeAdapter.getTemplateContent(this.current)
					: this.current
			}
			constructor(t, r, a) {
				;(this.treeAdapter = r),
					(this.handler = a),
					(this.items = []),
					(this.tagIDs = []),
					(this.stackTop = -1),
					(this.tmplCount = 0),
					(this.currentTagId = j.TAG_ID.UNKNOWN),
					(this.current = t)
			}
			_indexOf(t) {
				return this.items.lastIndexOf(t, this.stackTop)
			}
			_isInTemplate() {
				return (
					this.currentTagId === j.TAG_ID.TEMPLATE &&
					this.treeAdapter.getNamespaceURI(this.current) === j.NS.HTML
				)
			}
			_updateCurrentElement() {
				;(this.current = this.items[this.stackTop]),
					(this.currentTagId = this.tagIDs[this.stackTop])
			}
			push(t, r) {
				this.stackTop++,
					(this.items[this.stackTop] = t),
					(this.current = t),
					(this.tagIDs[this.stackTop] = r),
					(this.currentTagId = r),
					this._isInTemplate() && this.tmplCount++,
					this.handler.onItemPush(t, r, !0)
			}
			pop() {
				let t = this.current
				this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--,
					this.stackTop--,
					this._updateCurrentElement(),
					this.handler.onItemPop(t, !0)
			}
			replace(t, r) {
				let a = this._indexOf(t)
				;(this.items[a] = r), a === this.stackTop && (this.current = r)
			}
			insertAfter(t, r, a) {
				let n = this._indexOf(t) + 1
				this.items.splice(n, 0, r),
					this.tagIDs.splice(n, 0, a),
					this.stackTop++,
					n === this.stackTop && this._updateCurrentElement(),
					this.current &&
						this.currentTagId !== void 0 &&
						this.handler.onItemPush(
							this.current,
							this.currentTagId,
							n === this.stackTop
						)
			}
			popUntilTagNamePopped(t) {
				let r = this.stackTop + 1
				do r = this.tagIDs.lastIndexOf(t, r - 1)
				while (
					r > 0 &&
					this.treeAdapter.getNamespaceURI(this.items[r]) !== j.NS.HTML
				)
				this.shortenToLength(Math.max(r, 0))
			}
			shortenToLength(t) {
				for (; this.stackTop >= t; ) {
					let r = this.current
					this.tmplCount > 0 &&
						this._isInTemplate() &&
						(this.tmplCount -= 1),
						this.stackTop--,
						this._updateCurrentElement(),
						this.handler.onItemPop(r, this.stackTop < t)
				}
			}
			popUntilElementPopped(t) {
				let r = this._indexOf(t)
				this.shortenToLength(Math.max(r, 0))
			}
			popUntilPopped(t, r) {
				let a = this._indexOfTagNames(t, r)
				this.shortenToLength(Math.max(a, 0))
			}
			popUntilNumberedHeaderPopped() {
				this.popUntilPopped(j.NUMBERED_HEADERS, j.NS.HTML)
			}
			popUntilTableCellPopped() {
				this.popUntilPopped(i2, j.NS.HTML)
			}
			popAllUpToHtmlElement() {
				;(this.tmplCount = 0), this.shortenToLength(1)
			}
			_indexOfTagNames(t, r) {
				for (let a = this.stackTop; a >= 0; a--)
					if (
						t.has(this.tagIDs[a]) &&
						this.treeAdapter.getNamespaceURI(this.items[a]) === r
					)
						return a
				return -1
			}
			clearBackTo(t, r) {
				let a = this._indexOfTagNames(t, r)
				this.shortenToLength(a + 1)
			}
			clearBackToTableContext() {
				this.clearBackTo(s2, j.NS.HTML)
			}
			clearBackToTableBodyContext() {
				this.clearBackTo(n2, j.NS.HTML)
			}
			clearBackToTableRowContext() {
				this.clearBackTo(a2, j.NS.HTML)
			}
			remove(t) {
				let r = this._indexOf(t)
				r >= 0 &&
					(r === this.stackTop
						? this.pop()
						: (this.items.splice(r, 1),
						  this.tagIDs.splice(r, 1),
						  this.stackTop--,
						  this._updateCurrentElement(),
						  this.handler.onItemPop(t, !1)))
			}
			tryPeekProperlyNestedBodyElement() {
				return this.stackTop >= 1 && this.tagIDs[1] === j.TAG_ID.BODY
					? this.items[1]
					: null
			}
			contains(t) {
				return this._indexOf(t) > -1
			}
			getCommonAncestor(t) {
				let r = this._indexOf(t) - 1
				return r >= 0 ? this.items[r] : null
			}
			isRootHtmlElementCurrent() {
				return this.stackTop === 0 && this.tagIDs[0] === j.TAG_ID.HTML
			}
			hasInDynamicScope(t, r) {
				for (let a = this.stackTop; a >= 0; a--) {
					let n = this.tagIDs[a]
					switch (this.treeAdapter.getNamespaceURI(this.items[a])) {
						case j.NS.HTML: {
							if (n === t) return !0
							if (r.has(n)) return !1
							break
						}
						case j.NS.SVG: {
							if (tl.has(n)) return !1
							break
						}
						case j.NS.MATHML: {
							if (el.has(n)) return !1
							break
						}
					}
				}
				return !0
			}
			hasInScope(t) {
				return this.hasInDynamicScope(t, ea)
			}
			hasInListItemScope(t) {
				return this.hasInDynamicScope(t, t2)
			}
			hasInButtonScope(t) {
				return this.hasInDynamicScope(t, r2)
			}
			hasNumberedHeaderInScope() {
				for (let t = this.stackTop; t >= 0; t--) {
					let r = this.tagIDs[t]
					switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
						case j.NS.HTML: {
							if (j.NUMBERED_HEADERS.has(r)) return !0
							if (ea.has(r)) return !1
							break
						}
						case j.NS.SVG: {
							if (tl.has(r)) return !1
							break
						}
						case j.NS.MATHML: {
							if (el.has(r)) return !1
							break
						}
					}
				}
				return !0
			}
			hasInTableScope(t) {
				for (let r = this.stackTop; r >= 0; r--)
					if (
						this.treeAdapter.getNamespaceURI(this.items[r]) === j.NS.HTML
					)
						switch (this.tagIDs[r]) {
							case t:
								return !0
							case j.TAG_ID.TABLE:
							case j.TAG_ID.HTML:
								return !1
						}
				return !0
			}
			hasTableBodyContextInTableScope() {
				for (let t = this.stackTop; t >= 0; t--)
					if (
						this.treeAdapter.getNamespaceURI(this.items[t]) === j.NS.HTML
					)
						switch (this.tagIDs[t]) {
							case j.TAG_ID.TBODY:
							case j.TAG_ID.THEAD:
							case j.TAG_ID.TFOOT:
								return !0
							case j.TAG_ID.TABLE:
							case j.TAG_ID.HTML:
								return !1
						}
				return !0
			}
			hasInSelectScope(t) {
				for (let r = this.stackTop; r >= 0; r--)
					if (
						this.treeAdapter.getNamespaceURI(this.items[r]) === j.NS.HTML
					)
						switch (this.tagIDs[r]) {
							case t:
								return !0
							case j.TAG_ID.OPTION:
							case j.TAG_ID.OPTGROUP:
								break
							default:
								return !1
						}
				return !0
			}
			generateImpliedEndTags() {
				for (; this.currentTagId !== void 0 && rl.has(this.currentTagId); )
					this.pop()
			}
			generateImpliedEndTagsThoroughly() {
				for (; this.currentTagId !== void 0 && Zo.has(this.currentTagId); )
					this.pop()
			}
			generateImpliedEndTagsWithExclusion(t) {
				for (
					;
					this.currentTagId !== void 0 &&
					this.currentTagId !== t &&
					Zo.has(this.currentTagId);

				)
					this.pop()
			}
		}
	ta.OpenElementStack = Qs
})
var sl = v(Ct => {
	"use strict"
	Object.defineProperty(Ct, "__esModule", {value: !0})
	Ct.FormattingElementList = Ct.EntryType = void 0
	var $s = 3,
		We
	;(function (e) {
		;(e[(e.Marker = 0)] = "Marker"), (e[(e.Element = 1)] = "Element")
	})(We || (Ct.EntryType = We = {}))
	var nl = {type: We.Marker},
		zs = class {
			constructor(t) {
				;(this.treeAdapter = t), (this.entries = []), (this.bookmark = null)
			}
			_getNoahArkConditionCandidates(t, r) {
				let a = [],
					n = r.length,
					i = this.treeAdapter.getTagName(t),
					l = this.treeAdapter.getNamespaceURI(t)
				for (let d = 0; d < this.entries.length; d++) {
					let S = this.entries[d]
					if (S.type === We.Marker) break
					let {element: g} = S
					if (
						this.treeAdapter.getTagName(g) === i &&
						this.treeAdapter.getNamespaceURI(g) === l
					) {
						let D = this.treeAdapter.getAttrList(g)
						D.length === n && a.push({idx: d, attrs: D})
					}
				}
				return a
			}
			_ensureNoahArkCondition(t) {
				if (this.entries.length < $s) return
				let r = this.treeAdapter.getAttrList(t),
					a = this._getNoahArkConditionCandidates(t, r)
				if (a.length < $s) return
				let n = new Map(r.map(l => [l.name, l.value])),
					i = 0
				for (let l = 0; l < a.length; l++) {
					let d = a[l]
					d.attrs.every(S => n.get(S.name) === S.value) &&
						((i += 1), i >= $s && this.entries.splice(d.idx, 1))
				}
			}
			insertMarker() {
				this.entries.unshift(nl)
			}
			pushElement(t, r) {
				this._ensureNoahArkCondition(t),
					this.entries.unshift({type: We.Element, element: t, token: r})
			}
			insertElementAfterBookmark(t, r) {
				let a = this.entries.indexOf(this.bookmark)
				this.entries.splice(a, 0, {type: We.Element, element: t, token: r})
			}
			removeEntry(t) {
				let r = this.entries.indexOf(t)
				r !== -1 && this.entries.splice(r, 1)
			}
			clearToLastMarker() {
				let t = this.entries.indexOf(nl)
				t === -1 ? (this.entries.length = 0) : this.entries.splice(0, t + 1)
			}
			getElementEntryInScopeWithTagName(t) {
				let r = this.entries.find(
					a =>
						a.type === We.Marker ||
						this.treeAdapter.getTagName(a.element) === t
				)
				return r && r.type === We.Element ? r : null
			}
			getElementEntry(t) {
				return this.entries.find(
					r => r.type === We.Element && r.element === t
				)
			}
		}
	Ct.FormattingElementList = zs
})
var ra = v(Ge => {
	"use strict"
	Object.defineProperty(Ge, "__esModule", {value: !0})
	Ge.defaultTreeAdapter = void 0
	var u2 = Je()
	Ge.defaultTreeAdapter = {
		createDocument() {
			return {
				nodeName: "#document",
				mode: u2.DOCUMENT_MODE.NO_QUIRKS,
				childNodes: [],
			}
		},
		createDocumentFragment() {
			return {nodeName: "#document-fragment", childNodes: []}
		},
		createElement(e, t, r) {
			return {
				nodeName: e,
				tagName: e,
				attrs: r,
				namespaceURI: t,
				childNodes: [],
				parentNode: null,
			}
		},
		createCommentNode(e) {
			return {nodeName: "#comment", data: e, parentNode: null}
		},
		createTextNode(e) {
			return {nodeName: "#text", value: e, parentNode: null}
		},
		appendChild(e, t) {
			e.childNodes.push(t), (t.parentNode = e)
		},
		insertBefore(e, t, r) {
			let a = e.childNodes.indexOf(r)
			e.childNodes.splice(a, 0, t), (t.parentNode = e)
		},
		setTemplateContent(e, t) {
			e.content = t
		},
		getTemplateContent(e) {
			return e.content
		},
		setDocumentType(e, t, r, a) {
			let n = e.childNodes.find(i => i.nodeName === "#documentType")
			if (n) (n.name = t), (n.publicId = r), (n.systemId = a)
			else {
				let i = {
					nodeName: "#documentType",
					name: t,
					publicId: r,
					systemId: a,
					parentNode: null,
				}
				Ge.defaultTreeAdapter.appendChild(e, i)
			}
		},
		setDocumentMode(e, t) {
			e.mode = t
		},
		getDocumentMode(e) {
			return e.mode
		},
		detachNode(e) {
			if (e.parentNode) {
				let t = e.parentNode.childNodes.indexOf(e)
				e.parentNode.childNodes.splice(t, 1), (e.parentNode = null)
			}
		},
		insertText(e, t) {
			if (e.childNodes.length > 0) {
				let r = e.childNodes[e.childNodes.length - 1]
				if (Ge.defaultTreeAdapter.isTextNode(r)) {
					r.value += t
					return
				}
			}
			Ge.defaultTreeAdapter.appendChild(
				e,
				Ge.defaultTreeAdapter.createTextNode(t)
			)
		},
		insertTextBefore(e, t, r) {
			let a = e.childNodes[e.childNodes.indexOf(r) - 1]
			a && Ge.defaultTreeAdapter.isTextNode(a)
				? (a.value += t)
				: Ge.defaultTreeAdapter.insertBefore(
						e,
						Ge.defaultTreeAdapter.createTextNode(t),
						r
				  )
		},
		adoptAttributes(e, t) {
			let r = new Set(e.attrs.map(a => a.name))
			for (let a = 0; a < t.length; a++)
				r.has(t[a].name) || e.attrs.push(t[a])
		},
		getFirstChild(e) {
			return e.childNodes[0]
		},
		getChildNodes(e) {
			return e.childNodes
		},
		getParentNode(e) {
			return e.parentNode
		},
		getAttrList(e) {
			return e.attrs
		},
		getTagName(e) {
			return e.tagName
		},
		getNamespaceURI(e) {
			return e.namespaceURI
		},
		getTextNodeContent(e) {
			return e.value
		},
		getCommentNodeContent(e) {
			return e.data
		},
		getDocumentTypeNodeName(e) {
			return e.name
		},
		getDocumentTypeNodePublicId(e) {
			return e.publicId
		},
		getDocumentTypeNodeSystemId(e) {
			return e.systemId
		},
		isTextNode(e) {
			return e.nodeName === "#text"
		},
		isCommentNode(e) {
			return e.nodeName === "#comment"
		},
		isDocumentTypeNode(e) {
			return e.nodeName === "#documentType"
		},
		isElementNode(e) {
			return Object.prototype.hasOwnProperty.call(e, "tagName")
		},
		setNodeSourceCodeLocation(e, t) {
			e.sourceCodeLocation = t
		},
		getNodeSourceCodeLocation(e) {
			return e.sourceCodeLocation
		},
		updateNodeSourceCodeLocation(e, t) {
			e.sourceCodeLocation = Object.assign(
				Object.assign({}, e.sourceCodeLocation),
				t
			)
		},
	}
})
var cl = v(aa => {
	"use strict"
	Object.defineProperty(aa, "__esModule", {value: !0})
	aa.isConforming = f2
	aa.getDocumentMode = T2
	var Lt = Je(),
		ul = "html",
		o2 = "about:legacy-compat",
		l2 = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
		ol = [
			"+//silmaril//dtd html pro v0r11 19970101//",
			"-//as//dtd html 3.0 aswedit + extensions//",
			"-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
			"-//ietf//dtd html 2.0 level 1//",
			"-//ietf//dtd html 2.0 level 2//",
			"-//ietf//dtd html 2.0 strict level 1//",
			"-//ietf//dtd html 2.0 strict level 2//",
			"-//ietf//dtd html 2.0 strict//",
			"-//ietf//dtd html 2.0//",
			"-//ietf//dtd html 2.1e//",
			"-//ietf//dtd html 3.0//",
			"-//ietf//dtd html 3.2 final//",
			"-//ietf//dtd html 3.2//",
			"-//ietf//dtd html 3//",
			"-//ietf//dtd html level 0//",
			"-//ietf//dtd html level 1//",
			"-//ietf//dtd html level 2//",
			"-//ietf//dtd html level 3//",
			"-//ietf//dtd html strict level 0//",
			"-//ietf//dtd html strict level 1//",
			"-//ietf//dtd html strict level 2//",
			"-//ietf//dtd html strict level 3//",
			"-//ietf//dtd html strict//",
			"-//ietf//dtd html//",
			"-//metrius//dtd metrius presentational//",
			"-//microsoft//dtd internet explorer 2.0 html strict//",
			"-//microsoft//dtd internet explorer 2.0 html//",
			"-//microsoft//dtd internet explorer 2.0 tables//",
			"-//microsoft//dtd internet explorer 3.0 html strict//",
			"-//microsoft//dtd internet explorer 3.0 html//",
			"-//microsoft//dtd internet explorer 3.0 tables//",
			"-//netscape comm. corp.//dtd html//",
			"-//netscape comm. corp.//dtd strict html//",
			"-//o'reilly and associates//dtd html 2.0//",
			"-//o'reilly and associates//dtd html extended 1.0//",
			"-//o'reilly and associates//dtd html extended relaxed 1.0//",
			"-//sq//dtd html 2.0 hotmetal + extensions//",
			"-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
			"-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
			"-//spyglass//dtd html 2.0 extended//",
			"-//sun microsystems corp.//dtd hotjava html//",
			"-//sun microsystems corp.//dtd hotjava strict html//",
			"-//w3c//dtd html 3 1995-03-24//",
			"-//w3c//dtd html 3.2 draft//",
			"-//w3c//dtd html 3.2 final//",
			"-//w3c//dtd html 3.2//",
			"-//w3c//dtd html 3.2s draft//",
			"-//w3c//dtd html 4.0 frameset//",
			"-//w3c//dtd html 4.0 transitional//",
			"-//w3c//dtd html experimental 19960712//",
			"-//w3c//dtd html experimental 970421//",
			"-//w3c//dtd w3 html//",
			"-//w3o//dtd w3 html 3.0//",
			"-//webtechs//dtd mozilla html 2.0//",
			"-//webtechs//dtd mozilla html//",
		],
		c2 = [
			...ol,
			"-//w3c//dtd html 4.01 frameset//",
			"-//w3c//dtd html 4.01 transitional//",
		],
		d2 = new Set([
			"-//w3o//dtd w3 html strict 3.0//en//",
			"-/w3c/dtd html 4.0 transitional/en",
			"html",
		]),
		ll = [
			"-//w3c//dtd xhtml 1.0 frameset//",
			"-//w3c//dtd xhtml 1.0 transitional//",
		],
		p2 = [
			...ll,
			"-//w3c//dtd html 4.01 frameset//",
			"-//w3c//dtd html 4.01 transitional//",
		]
	function il(e, t) {
		return t.some(r => e.startsWith(r))
	}
	function f2(e) {
		return (
			e.name === ul &&
			e.publicId === null &&
			(e.systemId === null || e.systemId === o2)
		)
	}
	function T2(e) {
		if (e.name !== ul) return Lt.DOCUMENT_MODE.QUIRKS
		let {systemId: t} = e
		if (t && t.toLowerCase() === l2) return Lt.DOCUMENT_MODE.QUIRKS
		let {publicId: r} = e
		if (r !== null) {
			if (((r = r.toLowerCase()), d2.has(r))) return Lt.DOCUMENT_MODE.QUIRKS
			let a = t === null ? c2 : ol
			if (il(r, a)) return Lt.DOCUMENT_MODE.QUIRKS
			if (((a = t === null ? ll : p2), il(r, a)))
				return Lt.DOCUMENT_MODE.LIMITED_QUIRKS
		}
		return Lt.DOCUMENT_MODE.NO_QUIRKS
	}
})
var Zs = v(qe => {
	"use strict"
	Object.defineProperty(qe, "__esModule", {value: !0})
	qe.SVG_TAG_NAMES_ADJUSTMENT_MAP = void 0
	qe.causesExit = A2
	qe.adjustTokenMathMLAttrs = h2
	qe.adjustTokenSVGAttrs = _2
	qe.adjustTokenXMLAttrs = I2
	qe.adjustTokenSVGTagName = g2
	qe.isIntegrationPoint = N2
	var Y = Je(),
		dl = {TEXT_HTML: "text/html", APPLICATION_XML: "application/xhtml+xml"},
		m2 = "definitionurl",
		E2 = "definitionURL",
		y2 = new Map(
			[
				"attributeName",
				"attributeType",
				"baseFrequency",
				"baseProfile",
				"calcMode",
				"clipPathUnits",
				"diffuseConstant",
				"edgeMode",
				"filterUnits",
				"glyphRef",
				"gradientTransform",
				"gradientUnits",
				"kernelMatrix",
				"kernelUnitLength",
				"keyPoints",
				"keySplines",
				"keyTimes",
				"lengthAdjust",
				"limitingConeAngle",
				"markerHeight",
				"markerUnits",
				"markerWidth",
				"maskContentUnits",
				"maskUnits",
				"numOctaves",
				"pathLength",
				"patternContentUnits",
				"patternTransform",
				"patternUnits",
				"pointsAtX",
				"pointsAtY",
				"pointsAtZ",
				"preserveAlpha",
				"preserveAspectRatio",
				"primitiveUnits",
				"refX",
				"refY",
				"repeatCount",
				"repeatDur",
				"requiredExtensions",
				"requiredFeatures",
				"specularConstant",
				"specularExponent",
				"spreadMethod",
				"startOffset",
				"stdDeviation",
				"stitchTiles",
				"surfaceScale",
				"systemLanguage",
				"tableValues",
				"targetX",
				"targetY",
				"textLength",
				"viewBox",
				"viewTarget",
				"xChannelSelector",
				"yChannelSelector",
				"zoomAndPan",
			].map(e => [e.toLowerCase(), e])
		),
		S2 = new Map([
			[
				"xlink:actuate",
				{prefix: "xlink", name: "actuate", namespace: Y.NS.XLINK},
			],
			[
				"xlink:arcrole",
				{prefix: "xlink", name: "arcrole", namespace: Y.NS.XLINK},
			],
			["xlink:href", {prefix: "xlink", name: "href", namespace: Y.NS.XLINK}],
			["xlink:role", {prefix: "xlink", name: "role", namespace: Y.NS.XLINK}],
			["xlink:show", {prefix: "xlink", name: "show", namespace: Y.NS.XLINK}],
			[
				"xlink:title",
				{prefix: "xlink", name: "title", namespace: Y.NS.XLINK},
			],
			["xlink:type", {prefix: "xlink", name: "type", namespace: Y.NS.XLINK}],
			["xml:lang", {prefix: "xml", name: "lang", namespace: Y.NS.XML}],
			["xml:space", {prefix: "xml", name: "space", namespace: Y.NS.XML}],
			["xmlns", {prefix: "", name: "xmlns", namespace: Y.NS.XMLNS}],
			[
				"xmlns:xlink",
				{prefix: "xmlns", name: "xlink", namespace: Y.NS.XMLNS},
			],
		])
	qe.SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map(
		[
			"altGlyph",
			"altGlyphDef",
			"altGlyphItem",
			"animateColor",
			"animateMotion",
			"animateTransform",
			"clipPath",
			"feBlend",
			"feColorMatrix",
			"feComponentTransfer",
			"feComposite",
			"feConvolveMatrix",
			"feDiffuseLighting",
			"feDisplacementMap",
			"feDistantLight",
			"feFlood",
			"feFuncA",
			"feFuncB",
			"feFuncG",
			"feFuncR",
			"feGaussianBlur",
			"feImage",
			"feMerge",
			"feMergeNode",
			"feMorphology",
			"feOffset",
			"fePointLight",
			"feSpecularLighting",
			"feSpotLight",
			"feTile",
			"feTurbulence",
			"foreignObject",
			"glyphRef",
			"linearGradient",
			"radialGradient",
			"textPath",
		].map(e => [e.toLowerCase(), e])
	)
	var b2 = new Set([
		Y.TAG_ID.B,
		Y.TAG_ID.BIG,
		Y.TAG_ID.BLOCKQUOTE,
		Y.TAG_ID.BODY,
		Y.TAG_ID.BR,
		Y.TAG_ID.CENTER,
		Y.TAG_ID.CODE,
		Y.TAG_ID.DD,
		Y.TAG_ID.DIV,
		Y.TAG_ID.DL,
		Y.TAG_ID.DT,
		Y.TAG_ID.EM,
		Y.TAG_ID.EMBED,
		Y.TAG_ID.H1,
		Y.TAG_ID.H2,
		Y.TAG_ID.H3,
		Y.TAG_ID.H4,
		Y.TAG_ID.H5,
		Y.TAG_ID.H6,
		Y.TAG_ID.HEAD,
		Y.TAG_ID.HR,
		Y.TAG_ID.I,
		Y.TAG_ID.IMG,
		Y.TAG_ID.LI,
		Y.TAG_ID.LISTING,
		Y.TAG_ID.MENU,
		Y.TAG_ID.META,
		Y.TAG_ID.NOBR,
		Y.TAG_ID.OL,
		Y.TAG_ID.P,
		Y.TAG_ID.PRE,
		Y.TAG_ID.RUBY,
		Y.TAG_ID.S,
		Y.TAG_ID.SMALL,
		Y.TAG_ID.SPAN,
		Y.TAG_ID.STRONG,
		Y.TAG_ID.STRIKE,
		Y.TAG_ID.SUB,
		Y.TAG_ID.SUP,
		Y.TAG_ID.TABLE,
		Y.TAG_ID.TT,
		Y.TAG_ID.U,
		Y.TAG_ID.UL,
		Y.TAG_ID.VAR,
	])
	function A2(e) {
		let t = e.tagID
		return (
			(t === Y.TAG_ID.FONT &&
				e.attrs.some(
					({name: a}) =>
						a === Y.ATTRS.COLOR ||
						a === Y.ATTRS.SIZE ||
						a === Y.ATTRS.FACE
				)) ||
			b2.has(t)
		)
	}
	function h2(e) {
		for (let t = 0; t < e.attrs.length; t++)
			if (e.attrs[t].name === m2) {
				e.attrs[t].name = E2
				break
			}
	}
	function _2(e) {
		for (let t = 0; t < e.attrs.length; t++) {
			let r = y2.get(e.attrs[t].name)
			r != null && (e.attrs[t].name = r)
		}
	}
	function I2(e) {
		for (let t = 0; t < e.attrs.length; t++) {
			let r = S2.get(e.attrs[t].name)
			r &&
				((e.attrs[t].prefix = r.prefix),
				(e.attrs[t].name = r.name),
				(e.attrs[t].namespace = r.namespace))
		}
	}
	function g2(e) {
		let t = qe.SVG_TAG_NAMES_ADJUSTMENT_MAP.get(e.tagName)
		t != null && ((e.tagName = t), (e.tagID = (0, Y.getTagID)(e.tagName)))
	}
	function D2(e, t) {
		return (
			t === Y.NS.MATHML &&
			(e === Y.TAG_ID.MI ||
				e === Y.TAG_ID.MO ||
				e === Y.TAG_ID.MN ||
				e === Y.TAG_ID.MS ||
				e === Y.TAG_ID.MTEXT)
		)
	}
	function x2(e, t, r) {
		if (t === Y.NS.MATHML && e === Y.TAG_ID.ANNOTATION_XML) {
			for (let a = 0; a < r.length; a++)
				if (r[a].name === Y.ATTRS.ENCODING) {
					let n = r[a].value.toLowerCase()
					return n === dl.TEXT_HTML || n === dl.APPLICATION_XML
				}
		}
		return (
			t === Y.NS.SVG &&
			(e === Y.TAG_ID.FOREIGN_OBJECT ||
				e === Y.TAG_ID.DESC ||
				e === Y.TAG_ID.TITLE)
		)
	}
	function N2(e, t, r, a) {
		return (
			((!a || a === Y.NS.HTML) && x2(e, t, r)) ||
			((!a || a === Y.NS.MATHML) && D2(e, t))
		)
	}
})
var ui = v(da => {
	"use strict"
	Object.defineProperty(da, "__esModule", {value: !0})
	da.Parser = void 0
	var xe = Ws(),
		O2 = al(),
		pl = sl(),
		P2 = ra(),
		fl = cl(),
		Ke = Zs(),
		be = ar(),
		yl = Vr(),
		u = Je(),
		fe = Jr(),
		C2 = "hidden",
		L2 = 8,
		v2 = 3,
		_
	;(function (e) {
		;(e[(e.INITIAL = 0)] = "INITIAL"),
			(e[(e.BEFORE_HTML = 1)] = "BEFORE_HTML"),
			(e[(e.BEFORE_HEAD = 2)] = "BEFORE_HEAD"),
			(e[(e.IN_HEAD = 3)] = "IN_HEAD"),
			(e[(e.IN_HEAD_NO_SCRIPT = 4)] = "IN_HEAD_NO_SCRIPT"),
			(e[(e.AFTER_HEAD = 5)] = "AFTER_HEAD"),
			(e[(e.IN_BODY = 6)] = "IN_BODY"),
			(e[(e.TEXT = 7)] = "TEXT"),
			(e[(e.IN_TABLE = 8)] = "IN_TABLE"),
			(e[(e.IN_TABLE_TEXT = 9)] = "IN_TABLE_TEXT"),
			(e[(e.IN_CAPTION = 10)] = "IN_CAPTION"),
			(e[(e.IN_COLUMN_GROUP = 11)] = "IN_COLUMN_GROUP"),
			(e[(e.IN_TABLE_BODY = 12)] = "IN_TABLE_BODY"),
			(e[(e.IN_ROW = 13)] = "IN_ROW"),
			(e[(e.IN_CELL = 14)] = "IN_CELL"),
			(e[(e.IN_SELECT = 15)] = "IN_SELECT"),
			(e[(e.IN_SELECT_IN_TABLE = 16)] = "IN_SELECT_IN_TABLE"),
			(e[(e.IN_TEMPLATE = 17)] = "IN_TEMPLATE"),
			(e[(e.AFTER_BODY = 18)] = "AFTER_BODY"),
			(e[(e.IN_FRAMESET = 19)] = "IN_FRAMESET"),
			(e[(e.AFTER_FRAMESET = 20)] = "AFTER_FRAMESET"),
			(e[(e.AFTER_AFTER_BODY = 21)] = "AFTER_AFTER_BODY"),
			(e[(e.AFTER_AFTER_FRAMESET = 22)] = "AFTER_AFTER_FRAMESET")
	})(_ || (_ = {}))
	var R2 = {
			startLine: -1,
			startCol: -1,
			startOffset: -1,
			endLine: -1,
			endCol: -1,
			endOffset: -1,
		},
		Sl = new Set([
			u.TAG_ID.TABLE,
			u.TAG_ID.TBODY,
			u.TAG_ID.TFOOT,
			u.TAG_ID.THEAD,
			u.TAG_ID.TR,
		]),
		Tl = {
			scriptingEnabled: !0,
			sourceCodeLocationInfo: !1,
			treeAdapter: P2.defaultTreeAdapter,
			onParseError: null,
		},
		ti = class {
			constructor(t, r, a = null, n = null) {
				;(this.fragmentContext = a),
					(this.scriptHandler = n),
					(this.currentToken = null),
					(this.stopped = !1),
					(this.insertionMode = _.INITIAL),
					(this.originalInsertionMode = _.INITIAL),
					(this.headElement = null),
					(this.formElement = null),
					(this.currentNotInHTML = !1),
					(this.tmplInsertionModeStack = []),
					(this.pendingCharacterTokens = []),
					(this.hasNonWhitespacePendingCharacterToken = !1),
					(this.framesetOk = !0),
					(this.skipNextNewLine = !1),
					(this.fosterParentingEnabled = !1),
					(this.options = Object.assign(Object.assign({}, Tl), t)),
					(this.treeAdapter = this.options.treeAdapter),
					(this.onParseError = this.options.onParseError),
					this.onParseError && (this.options.sourceCodeLocationInfo = !0),
					(this.document = r ?? this.treeAdapter.createDocument()),
					(this.tokenizer = new xe.Tokenizer(this.options, this)),
					(this.activeFormattingElements = new pl.FormattingElementList(
						this.treeAdapter
					)),
					(this.fragmentContextID = a
						? (0, u.getTagID)(this.treeAdapter.getTagName(a))
						: u.TAG_ID.UNKNOWN),
					this._setContextModes(
						a ?? this.document,
						this.fragmentContextID
					),
					(this.openElements = new O2.OpenElementStack(
						this.document,
						this.treeAdapter,
						this
					))
			}
			static parse(t, r) {
				let a = new this(r)
				return a.tokenizer.write(t, !0), a.document
			}
			static getFragmentParser(t, r) {
				let a = Object.assign(Object.assign({}, Tl), r)
				t ??
					(t = a.treeAdapter.createElement(
						u.TAG_NAMES.TEMPLATE,
						u.NS.HTML,
						[]
					))
				let n = a.treeAdapter.createElement("documentmock", u.NS.HTML, []),
					i = new this(a, n, t)
				return (
					i.fragmentContextID === u.TAG_ID.TEMPLATE &&
						i.tmplInsertionModeStack.unshift(_.IN_TEMPLATE),
					i._initTokenizerForFragmentParsing(),
					i._insertFakeRootElement(),
					i._resetInsertionMode(),
					i._findFormInFragmentContext(),
					i
				)
			}
			getFragment() {
				let t = this.treeAdapter.getFirstChild(this.document),
					r = this.treeAdapter.createDocumentFragment()
				return this._adoptNodes(t, r), r
			}
			_err(t, r, a) {
				var n
				if (!this.onParseError) return
				let i = (n = t.location) !== null && n !== void 0 ? n : R2,
					l = {
						code: r,
						startLine: i.startLine,
						startCol: i.startCol,
						startOffset: i.startOffset,
						endLine: a ? i.startLine : i.endLine,
						endCol: a ? i.startCol : i.endCol,
						endOffset: a ? i.startOffset : i.endOffset,
					}
				this.onParseError(l)
			}
			onItemPush(t, r, a) {
				var n, i
				;(i = (n = this.treeAdapter).onItemPush) === null ||
					i === void 0 ||
					i.call(n, t),
					a &&
						this.openElements.stackTop > 0 &&
						this._setContextModes(t, r)
			}
			onItemPop(t, r) {
				var a, n
				if (
					(this.options.sourceCodeLocationInfo &&
						this._setEndLocation(t, this.currentToken),
					(n = (a = this.treeAdapter).onItemPop) === null ||
						n === void 0 ||
						n.call(a, t, this.openElements.current),
					r)
				) {
					let i, l
					this.openElements.stackTop === 0 && this.fragmentContext
						? ((i = this.fragmentContext), (l = this.fragmentContextID))
						: ({current: i, currentTagId: l} = this.openElements),
						this._setContextModes(i, l)
				}
			}
			_setContextModes(t, r) {
				let a =
					t === this.document ||
					(t && this.treeAdapter.getNamespaceURI(t) === u.NS.HTML)
				;(this.currentNotInHTML = !a),
					(this.tokenizer.inForeignNode =
						!a &&
						t !== void 0 &&
						r !== void 0 &&
						!this._isIntegrationPoint(r, t))
			}
			_switchToTextParsing(t, r) {
				this._insertElement(t, u.NS.HTML),
					(this.tokenizer.state = r),
					(this.originalInsertionMode = this.insertionMode),
					(this.insertionMode = _.TEXT)
			}
			switchToPlaintextParsing() {
				;(this.insertionMode = _.TEXT),
					(this.originalInsertionMode = _.IN_BODY),
					(this.tokenizer.state = xe.TokenizerMode.PLAINTEXT)
			}
			_getAdjustedCurrentElement() {
				return this.openElements.stackTop === 0 && this.fragmentContext
					? this.fragmentContext
					: this.openElements.current
			}
			_findFormInFragmentContext() {
				let t = this.fragmentContext
				for (; t; ) {
					if (this.treeAdapter.getTagName(t) === u.TAG_NAMES.FORM) {
						this.formElement = t
						break
					}
					t = this.treeAdapter.getParentNode(t)
				}
			}
			_initTokenizerForFragmentParsing() {
				if (
					!(
						!this.fragmentContext ||
						this.treeAdapter.getNamespaceURI(this.fragmentContext) !==
							u.NS.HTML
					)
				)
					switch (this.fragmentContextID) {
						case u.TAG_ID.TITLE:
						case u.TAG_ID.TEXTAREA: {
							this.tokenizer.state = xe.TokenizerMode.RCDATA
							break
						}
						case u.TAG_ID.STYLE:
						case u.TAG_ID.XMP:
						case u.TAG_ID.IFRAME:
						case u.TAG_ID.NOEMBED:
						case u.TAG_ID.NOFRAMES:
						case u.TAG_ID.NOSCRIPT: {
							this.tokenizer.state = xe.TokenizerMode.RAWTEXT
							break
						}
						case u.TAG_ID.SCRIPT: {
							this.tokenizer.state = xe.TokenizerMode.SCRIPT_DATA
							break
						}
						case u.TAG_ID.PLAINTEXT: {
							this.tokenizer.state = xe.TokenizerMode.PLAINTEXT
							break
						}
						default:
					}
			}
			_setDocumentType(t) {
				let r = t.name || "",
					a = t.publicId || "",
					n = t.systemId || ""
				if (
					(this.treeAdapter.setDocumentType(this.document, r, a, n),
					t.location)
				) {
					let l = this.treeAdapter
						.getChildNodes(this.document)
						.find(d => this.treeAdapter.isDocumentTypeNode(d))
					l && this.treeAdapter.setNodeSourceCodeLocation(l, t.location)
				}
			}
			_attachElementToTree(t, r) {
				if (this.options.sourceCodeLocationInfo) {
					let a = r && Object.assign(Object.assign({}, r), {startTag: r})
					this.treeAdapter.setNodeSourceCodeLocation(t, a)
				}
				if (this._shouldFosterParentOnInsertion())
					this._fosterParentElement(t)
				else {
					let a = this.openElements.currentTmplContentOrNode
					this.treeAdapter.appendChild(a ?? this.document, t)
				}
			}
			_appendElement(t, r) {
				let a = this.treeAdapter.createElement(t.tagName, r, t.attrs)
				this._attachElementToTree(a, t.location)
			}
			_insertElement(t, r) {
				let a = this.treeAdapter.createElement(t.tagName, r, t.attrs)
				this._attachElementToTree(a, t.location),
					this.openElements.push(a, t.tagID)
			}
			_insertFakeElement(t, r) {
				let a = this.treeAdapter.createElement(t, u.NS.HTML, [])
				this._attachElementToTree(a, null), this.openElements.push(a, r)
			}
			_insertTemplate(t) {
				let r = this.treeAdapter.createElement(
						t.tagName,
						u.NS.HTML,
						t.attrs
					),
					a = this.treeAdapter.createDocumentFragment()
				this.treeAdapter.setTemplateContent(r, a),
					this._attachElementToTree(r, t.location),
					this.openElements.push(r, t.tagID),
					this.options.sourceCodeLocationInfo &&
						this.treeAdapter.setNodeSourceCodeLocation(a, null)
			}
			_insertFakeRootElement() {
				let t = this.treeAdapter.createElement(
					u.TAG_NAMES.HTML,
					u.NS.HTML,
					[]
				)
				this.options.sourceCodeLocationInfo &&
					this.treeAdapter.setNodeSourceCodeLocation(t, null),
					this.treeAdapter.appendChild(this.openElements.current, t),
					this.openElements.push(t, u.TAG_ID.HTML)
			}
			_appendCommentNode(t, r) {
				let a = this.treeAdapter.createCommentNode(t.data)
				this.treeAdapter.appendChild(r, a),
					this.options.sourceCodeLocationInfo &&
						this.treeAdapter.setNodeSourceCodeLocation(a, t.location)
			}
			_insertCharacters(t) {
				let r, a
				if (
					(this._shouldFosterParentOnInsertion()
						? (({parent: r, beforeElement: a} =
								this._findFosterParentingLocation()),
						  a
								? this.treeAdapter.insertTextBefore(r, t.chars, a)
								: this.treeAdapter.insertText(r, t.chars))
						: ((r = this.openElements.currentTmplContentOrNode),
						  this.treeAdapter.insertText(r, t.chars)),
					!t.location)
				)
					return
				let n = this.treeAdapter.getChildNodes(r),
					i = a ? n.lastIndexOf(a) : n.length,
					l = n[i - 1]
				if (this.treeAdapter.getNodeSourceCodeLocation(l)) {
					let {endLine: S, endCol: g, endOffset: D} = t.location
					this.treeAdapter.updateNodeSourceCodeLocation(l, {
						endLine: S,
						endCol: g,
						endOffset: D,
					})
				} else
					this.options.sourceCodeLocationInfo &&
						this.treeAdapter.setNodeSourceCodeLocation(l, t.location)
			}
			_adoptNodes(t, r) {
				for (
					let a = this.treeAdapter.getFirstChild(t);
					a;
					a = this.treeAdapter.getFirstChild(t)
				)
					this.treeAdapter.detachNode(a),
						this.treeAdapter.appendChild(r, a)
			}
			_setEndLocation(t, r) {
				if (this.treeAdapter.getNodeSourceCodeLocation(t) && r.location) {
					let a = r.location,
						n = this.treeAdapter.getTagName(t),
						i =
							r.type === fe.TokenType.END_TAG && n === r.tagName
								? {
										endTag: Object.assign({}, a),
										endLine: a.endLine,
										endCol: a.endCol,
										endOffset: a.endOffset,
								  }
								: {
										endLine: a.startLine,
										endCol: a.startCol,
										endOffset: a.startOffset,
								  }
					this.treeAdapter.updateNodeSourceCodeLocation(t, i)
				}
			}
			shouldProcessStartTagTokenInForeignContent(t) {
				if (!this.currentNotInHTML) return !1
				let r, a
				return (
					this.openElements.stackTop === 0 && this.fragmentContext
						? ((r = this.fragmentContext), (a = this.fragmentContextID))
						: ({current: r, currentTagId: a} = this.openElements),
					t.tagID === u.TAG_ID.SVG &&
					this.treeAdapter.getTagName(r) === u.TAG_NAMES.ANNOTATION_XML &&
					this.treeAdapter.getNamespaceURI(r) === u.NS.MATHML
						? !1
						: this.tokenizer.inForeignNode ||
						  ((t.tagID === u.TAG_ID.MGLYPH ||
								t.tagID === u.TAG_ID.MALIGNMARK) &&
								a !== void 0 &&
								!this._isIntegrationPoint(a, r, u.NS.HTML))
				)
			}
			_processToken(t) {
				switch (t.type) {
					case fe.TokenType.CHARACTER: {
						this.onCharacter(t)
						break
					}
					case fe.TokenType.NULL_CHARACTER: {
						this.onNullCharacter(t)
						break
					}
					case fe.TokenType.COMMENT: {
						this.onComment(t)
						break
					}
					case fe.TokenType.DOCTYPE: {
						this.onDoctype(t)
						break
					}
					case fe.TokenType.START_TAG: {
						this._processStartTag(t)
						break
					}
					case fe.TokenType.END_TAG: {
						this.onEndTag(t)
						break
					}
					case fe.TokenType.EOF: {
						this.onEof(t)
						break
					}
					case fe.TokenType.WHITESPACE_CHARACTER: {
						this.onWhitespaceCharacter(t)
						break
					}
				}
			}
			_isIntegrationPoint(t, r, a) {
				let n = this.treeAdapter.getNamespaceURI(r),
					i = this.treeAdapter.getAttrList(r)
				return Ke.isIntegrationPoint(t, n, i, a)
			}
			_reconstructActiveFormattingElements() {
				let t = this.activeFormattingElements.entries.length
				if (t) {
					let r = this.activeFormattingElements.entries.findIndex(
							n =>
								n.type === pl.EntryType.Marker ||
								this.openElements.contains(n.element)
						),
						a = r === -1 ? t - 1 : r - 1
					for (let n = a; n >= 0; n--) {
						let i = this.activeFormattingElements.entries[n]
						this._insertElement(
							i.token,
							this.treeAdapter.getNamespaceURI(i.element)
						),
							(i.element = this.openElements.current)
					}
				}
			}
			_closeTableCell() {
				this.openElements.generateImpliedEndTags(),
					this.openElements.popUntilTableCellPopped(),
					this.activeFormattingElements.clearToLastMarker(),
					(this.insertionMode = _.IN_ROW)
			}
			_closePElement() {
				this.openElements.generateImpliedEndTagsWithExclusion(u.TAG_ID.P),
					this.openElements.popUntilTagNamePopped(u.TAG_ID.P)
			}
			_resetInsertionMode() {
				for (let t = this.openElements.stackTop; t >= 0; t--)
					switch (
						t === 0 && this.fragmentContext
							? this.fragmentContextID
							: this.openElements.tagIDs[t]
					) {
						case u.TAG_ID.TR: {
							this.insertionMode = _.IN_ROW
							return
						}
						case u.TAG_ID.TBODY:
						case u.TAG_ID.THEAD:
						case u.TAG_ID.TFOOT: {
							this.insertionMode = _.IN_TABLE_BODY
							return
						}
						case u.TAG_ID.CAPTION: {
							this.insertionMode = _.IN_CAPTION
							return
						}
						case u.TAG_ID.COLGROUP: {
							this.insertionMode = _.IN_COLUMN_GROUP
							return
						}
						case u.TAG_ID.TABLE: {
							this.insertionMode = _.IN_TABLE
							return
						}
						case u.TAG_ID.BODY: {
							this.insertionMode = _.IN_BODY
							return
						}
						case u.TAG_ID.FRAMESET: {
							this.insertionMode = _.IN_FRAMESET
							return
						}
						case u.TAG_ID.SELECT: {
							this._resetInsertionModeForSelect(t)
							return
						}
						case u.TAG_ID.TEMPLATE: {
							this.insertionMode = this.tmplInsertionModeStack[0]
							return
						}
						case u.TAG_ID.HTML: {
							this.insertionMode = this.headElement
								? _.AFTER_HEAD
								: _.BEFORE_HEAD
							return
						}
						case u.TAG_ID.TD:
						case u.TAG_ID.TH: {
							if (t > 0) {
								this.insertionMode = _.IN_CELL
								return
							}
							break
						}
						case u.TAG_ID.HEAD: {
							if (t > 0) {
								this.insertionMode = _.IN_HEAD
								return
							}
							break
						}
					}
				this.insertionMode = _.IN_BODY
			}
			_resetInsertionModeForSelect(t) {
				if (t > 0)
					for (let r = t - 1; r > 0; r--) {
						let a = this.openElements.tagIDs[r]
						if (a === u.TAG_ID.TEMPLATE) break
						if (a === u.TAG_ID.TABLE) {
							this.insertionMode = _.IN_SELECT_IN_TABLE
							return
						}
					}
				this.insertionMode = _.IN_SELECT
			}
			_isElementCausesFosterParenting(t) {
				return Sl.has(t)
			}
			_shouldFosterParentOnInsertion() {
				return (
					this.fosterParentingEnabled &&
					this.openElements.currentTagId !== void 0 &&
					this._isElementCausesFosterParenting(
						this.openElements.currentTagId
					)
				)
			}
			_findFosterParentingLocation() {
				for (let t = this.openElements.stackTop; t >= 0; t--) {
					let r = this.openElements.items[t]
					switch (this.openElements.tagIDs[t]) {
						case u.TAG_ID.TEMPLATE: {
							if (this.treeAdapter.getNamespaceURI(r) === u.NS.HTML)
								return {
									parent: this.treeAdapter.getTemplateContent(r),
									beforeElement: null,
								}
							break
						}
						case u.TAG_ID.TABLE: {
							let a = this.treeAdapter.getParentNode(r)
							return a
								? {parent: a, beforeElement: r}
								: {
										parent: this.openElements.items[t - 1],
										beforeElement: null,
								  }
						}
						default:
					}
				}
				return {parent: this.openElements.items[0], beforeElement: null}
			}
			_fosterParentElement(t) {
				let r = this._findFosterParentingLocation()
				r.beforeElement
					? this.treeAdapter.insertBefore(r.parent, t, r.beforeElement)
					: this.treeAdapter.appendChild(r.parent, t)
			}
			_isSpecialElement(t, r) {
				let a = this.treeAdapter.getNamespaceURI(t)
				return u.SPECIAL_ELEMENTS[a].has(r)
			}
			onCharacter(t) {
				if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
					l3(this, t)
					return
				}
				switch (this.insertionMode) {
					case _.INITIAL: {
						ir(this, t)
						break
					}
					case _.BEFORE_HTML: {
						or(this, t)
						break
					}
					case _.BEFORE_HEAD: {
						lr(this, t)
						break
					}
					case _.IN_HEAD: {
						cr(this, t)
						break
					}
					case _.IN_HEAD_NO_SCRIPT: {
						dr(this, t)
						break
					}
					case _.AFTER_HEAD: {
						pr(this, t)
						break
					}
					case _.IN_BODY:
					case _.IN_CAPTION:
					case _.IN_CELL:
					case _.IN_TEMPLATE: {
						Al(this, t)
						break
					}
					case _.TEXT:
					case _.IN_SELECT:
					case _.IN_SELECT_IN_TABLE: {
						this._insertCharacters(t)
						break
					}
					case _.IN_TABLE:
					case _.IN_TABLE_BODY:
					case _.IN_ROW: {
						ei(this, t)
						break
					}
					case _.IN_TABLE_TEXT: {
						xl(this, t)
						break
					}
					case _.IN_COLUMN_GROUP: {
						sa(this, t)
						break
					}
					case _.AFTER_BODY: {
						ia(this, t)
						break
					}
					case _.AFTER_AFTER_BODY: {
						na(this, t)
						break
					}
					default:
				}
			}
			onNullCharacter(t) {
				if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
					o3(this, t)
					return
				}
				switch (this.insertionMode) {
					case _.INITIAL: {
						ir(this, t)
						break
					}
					case _.BEFORE_HTML: {
						or(this, t)
						break
					}
					case _.BEFORE_HEAD: {
						lr(this, t)
						break
					}
					case _.IN_HEAD: {
						cr(this, t)
						break
					}
					case _.IN_HEAD_NO_SCRIPT: {
						dr(this, t)
						break
					}
					case _.AFTER_HEAD: {
						pr(this, t)
						break
					}
					case _.TEXT: {
						this._insertCharacters(t)
						break
					}
					case _.IN_TABLE:
					case _.IN_TABLE_BODY:
					case _.IN_ROW: {
						ei(this, t)
						break
					}
					case _.IN_COLUMN_GROUP: {
						sa(this, t)
						break
					}
					case _.AFTER_BODY: {
						ia(this, t)
						break
					}
					case _.AFTER_AFTER_BODY: {
						na(this, t)
						break
					}
					default:
				}
			}
			onComment(t) {
				if (((this.skipNextNewLine = !1), this.currentNotInHTML)) {
					ri(this, t)
					return
				}
				switch (this.insertionMode) {
					case _.INITIAL:
					case _.BEFORE_HTML:
					case _.BEFORE_HEAD:
					case _.IN_HEAD:
					case _.IN_HEAD_NO_SCRIPT:
					case _.AFTER_HEAD:
					case _.IN_BODY:
					case _.IN_TABLE:
					case _.IN_CAPTION:
					case _.IN_COLUMN_GROUP:
					case _.IN_TABLE_BODY:
					case _.IN_ROW:
					case _.IN_CELL:
					case _.IN_SELECT:
					case _.IN_SELECT_IN_TABLE:
					case _.IN_TEMPLATE:
					case _.IN_FRAMESET:
					case _.AFTER_FRAMESET: {
						ri(this, t)
						break
					}
					case _.IN_TABLE_TEXT: {
						ur(this, t)
						break
					}
					case _.AFTER_BODY: {
						G2(this, t)
						break
					}
					case _.AFTER_AFTER_BODY:
					case _.AFTER_AFTER_FRAMESET: {
						q2(this, t)
						break
					}
					default:
				}
			}
			onDoctype(t) {
				switch (((this.skipNextNewLine = !1), this.insertionMode)) {
					case _.INITIAL: {
						H2(this, t)
						break
					}
					case _.BEFORE_HEAD:
					case _.IN_HEAD:
					case _.IN_HEAD_NO_SCRIPT:
					case _.AFTER_HEAD: {
						this._err(t, be.ERR.misplacedDoctype)
						break
					}
					case _.IN_TABLE_TEXT: {
						ur(this, t)
						break
					}
					default:
				}
			}
			onStartTag(t) {
				;(this.skipNextNewLine = !1),
					(this.currentToken = t),
					this._processStartTag(t),
					t.selfClosing &&
						!t.ackSelfClosing &&
						this._err(
							t,
							be.ERR.nonVoidHtmlElementStartTagWithTrailingSolidus
						)
			}
			_processStartTag(t) {
				this.shouldProcessStartTagTokenInForeignContent(t)
					? c3(this, t)
					: this._startTagOutsideForeignContent(t)
			}
			_startTagOutsideForeignContent(t) {
				switch (this.insertionMode) {
					case _.INITIAL: {
						ir(this, t)
						break
					}
					case _.BEFORE_HTML: {
						j2(this, t)
						break
					}
					case _.BEFORE_HEAD: {
						V2(this, t)
						break
					}
					case _.IN_HEAD: {
						He(this, t)
						break
					}
					case _.IN_HEAD_NO_SCRIPT: {
						J2(this, t)
						break
					}
					case _.AFTER_HEAD: {
						Q2(this, t)
						break
					}
					case _.IN_BODY: {
						he(this, t)
						break
					}
					case _.IN_TABLE: {
						vt(this, t)
						break
					}
					case _.IN_TABLE_TEXT: {
						ur(this, t)
						break
					}
					case _.IN_CAPTION: {
						KC(this, t)
						break
					}
					case _.IN_COLUMN_GROUP: {
						ii(this, t)
						break
					}
					case _.IN_TABLE_BODY: {
						la(this, t)
						break
					}
					case _.IN_ROW: {
						ca(this, t)
						break
					}
					case _.IN_CELL: {
						WC(this, t)
						break
					}
					case _.IN_SELECT: {
						Pl(this, t)
						break
					}
					case _.IN_SELECT_IN_TABLE: {
						$C(this, t)
						break
					}
					case _.IN_TEMPLATE: {
						ZC(this, t)
						break
					}
					case _.AFTER_BODY: {
						t3(this, t)
						break
					}
					case _.IN_FRAMESET: {
						r3(this, t)
						break
					}
					case _.AFTER_FRAMESET: {
						n3(this, t)
						break
					}
					case _.AFTER_AFTER_BODY: {
						i3(this, t)
						break
					}
					case _.AFTER_AFTER_FRAMESET: {
						u3(this, t)
						break
					}
					default:
				}
			}
			onEndTag(t) {
				;(this.skipNextNewLine = !1),
					(this.currentToken = t),
					this.currentNotInHTML
						? d3(this, t)
						: this._endTagOutsideForeignContent(t)
			}
			_endTagOutsideForeignContent(t) {
				switch (this.insertionMode) {
					case _.INITIAL: {
						ir(this, t)
						break
					}
					case _.BEFORE_HTML: {
						Y2(this, t)
						break
					}
					case _.BEFORE_HEAD: {
						K2(this, t)
						break
					}
					case _.IN_HEAD: {
						X2(this, t)
						break
					}
					case _.IN_HEAD_NO_SCRIPT: {
						W2(this, t)
						break
					}
					case _.AFTER_HEAD: {
						$2(this, t)
						break
					}
					case _.IN_BODY: {
						oa(this, t)
						break
					}
					case _.TEXT: {
						wC(this, t)
						break
					}
					case _.IN_TABLE: {
						fr(this, t)
						break
					}
					case _.IN_TABLE_TEXT: {
						ur(this, t)
						break
					}
					case _.IN_CAPTION: {
						XC(this, t)
						break
					}
					case _.IN_COLUMN_GROUP: {
						JC(this, t)
						break
					}
					case _.IN_TABLE_BODY: {
						ai(this, t)
						break
					}
					case _.IN_ROW: {
						Ol(this, t)
						break
					}
					case _.IN_CELL: {
						QC(this, t)
						break
					}
					case _.IN_SELECT: {
						Cl(this, t)
						break
					}
					case _.IN_SELECT_IN_TABLE: {
						zC(this, t)
						break
					}
					case _.IN_TEMPLATE: {
						e3(this, t)
						break
					}
					case _.AFTER_BODY: {
						vl(this, t)
						break
					}
					case _.IN_FRAMESET: {
						a3(this, t)
						break
					}
					case _.AFTER_FRAMESET: {
						s3(this, t)
						break
					}
					case _.AFTER_AFTER_BODY: {
						na(this, t)
						break
					}
					default:
				}
			}
			onEof(t) {
				switch (this.insertionMode) {
					case _.INITIAL: {
						ir(this, t)
						break
					}
					case _.BEFORE_HTML: {
						or(this, t)
						break
					}
					case _.BEFORE_HEAD: {
						lr(this, t)
						break
					}
					case _.IN_HEAD: {
						cr(this, t)
						break
					}
					case _.IN_HEAD_NO_SCRIPT: {
						dr(this, t)
						break
					}
					case _.AFTER_HEAD: {
						pr(this, t)
						break
					}
					case _.IN_BODY:
					case _.IN_TABLE:
					case _.IN_CAPTION:
					case _.IN_COLUMN_GROUP:
					case _.IN_TABLE_BODY:
					case _.IN_ROW:
					case _.IN_CELL:
					case _.IN_SELECT:
					case _.IN_SELECT_IN_TABLE: {
						gl(this, t)
						break
					}
					case _.TEXT: {
						FC(this, t)
						break
					}
					case _.IN_TABLE_TEXT: {
						ur(this, t)
						break
					}
					case _.IN_TEMPLATE: {
						Ll(this, t)
						break
					}
					case _.AFTER_BODY:
					case _.IN_FRAMESET:
					case _.AFTER_FRAMESET:
					case _.AFTER_AFTER_BODY:
					case _.AFTER_AFTER_FRAMESET: {
						si(this, t)
						break
					}
					default:
				}
			}
			onWhitespaceCharacter(t) {
				if (
					this.skipNextNewLine &&
					((this.skipNextNewLine = !1),
					t.chars.charCodeAt(0) === yl.CODE_POINTS.LINE_FEED)
				) {
					if (t.chars.length === 1) return
					t.chars = t.chars.substr(1)
				}
				if (this.tokenizer.inForeignNode) {
					this._insertCharacters(t)
					return
				}
				switch (this.insertionMode) {
					case _.IN_HEAD:
					case _.IN_HEAD_NO_SCRIPT:
					case _.AFTER_HEAD:
					case _.TEXT:
					case _.IN_COLUMN_GROUP:
					case _.IN_SELECT:
					case _.IN_SELECT_IN_TABLE:
					case _.IN_FRAMESET:
					case _.AFTER_FRAMESET: {
						this._insertCharacters(t)
						break
					}
					case _.IN_BODY:
					case _.IN_CAPTION:
					case _.IN_CELL:
					case _.IN_TEMPLATE:
					case _.AFTER_BODY:
					case _.AFTER_AFTER_BODY:
					case _.AFTER_AFTER_FRAMESET: {
						bl(this, t)
						break
					}
					case _.IN_TABLE:
					case _.IN_TABLE_BODY:
					case _.IN_ROW: {
						ei(this, t)
						break
					}
					case _.IN_TABLE_TEXT: {
						Dl(this, t)
						break
					}
					default:
				}
			}
		}
	da.Parser = ti
	function M2(e, t) {
		let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(
			t.tagName
		)
		return (
			r
				? e.openElements.contains(r.element)
					? e.openElements.hasInScope(t.tagID) || (r = null)
					: (e.activeFormattingElements.removeEntry(r), (r = null))
				: Il(e, t),
			r
		)
	}
	function B2(e, t) {
		let r = null,
			a = e.openElements.stackTop
		for (; a >= 0; a--) {
			let n = e.openElements.items[a]
			if (n === t.element) break
			e._isSpecialElement(n, e.openElements.tagIDs[a]) && (r = n)
		}
		return (
			r ||
				(e.openElements.shortenToLength(Math.max(a, 0)),
				e.activeFormattingElements.removeEntry(t)),
			r
		)
	}
	function w2(e, t, r) {
		let a = t,
			n = e.openElements.getCommonAncestor(t)
		for (let i = 0, l = n; l !== r; i++, l = n) {
			n = e.openElements.getCommonAncestor(l)
			let d = e.activeFormattingElements.getElementEntry(l),
				S = d && i >= v2
			!d || S
				? (S && e.activeFormattingElements.removeEntry(d),
				  e.openElements.remove(l))
				: ((l = F2(e, d)),
				  a === t && (e.activeFormattingElements.bookmark = d),
				  e.treeAdapter.detachNode(a),
				  e.treeAdapter.appendChild(l, a),
				  (a = l))
		}
		return a
	}
	function F2(e, t) {
		let r = e.treeAdapter.getNamespaceURI(t.element),
			a = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs)
		return e.openElements.replace(t.element, a), (t.element = a), a
	}
	function k2(e, t, r) {
		let a = e.treeAdapter.getTagName(t),
			n = (0, u.getTagID)(a)
		if (e._isElementCausesFosterParenting(n)) e._fosterParentElement(r)
		else {
			let i = e.treeAdapter.getNamespaceURI(t)
			n === u.TAG_ID.TEMPLATE &&
				i === u.NS.HTML &&
				(t = e.treeAdapter.getTemplateContent(t)),
				e.treeAdapter.appendChild(t, r)
		}
	}
	function U2(e, t, r) {
		let a = e.treeAdapter.getNamespaceURI(r.element),
			{token: n} = r,
			i = e.treeAdapter.createElement(n.tagName, a, n.attrs)
		e._adoptNodes(t, i),
			e.treeAdapter.appendChild(t, i),
			e.activeFormattingElements.insertElementAfterBookmark(i, n),
			e.activeFormattingElements.removeEntry(r),
			e.openElements.remove(r.element),
			e.openElements.insertAfter(t, i, n.tagID)
	}
	function ni(e, t) {
		for (let r = 0; r < L2; r++) {
			let a = M2(e, t)
			if (!a) break
			let n = B2(e, a)
			if (!n) break
			e.activeFormattingElements.bookmark = a
			let i = w2(e, n, a.element),
				l = e.openElements.getCommonAncestor(a.element)
			e.treeAdapter.detachNode(i), l && k2(e, l, i), U2(e, n, a)
		}
	}
	function ri(e, t) {
		e._appendCommentNode(t, e.openElements.currentTmplContentOrNode)
	}
	function G2(e, t) {
		e._appendCommentNode(t, e.openElements.items[0])
	}
	function q2(e, t) {
		e._appendCommentNode(t, e.document)
	}
	function si(e, t) {
		if (((e.stopped = !0), t.location)) {
			let r = e.fragmentContext ? 0 : 2
			for (let a = e.openElements.stackTop; a >= r; a--)
				e._setEndLocation(e.openElements.items[a], t)
			if (!e.fragmentContext && e.openElements.stackTop >= 0) {
				let a = e.openElements.items[0],
					n = e.treeAdapter.getNodeSourceCodeLocation(a)
				if (
					n &&
					!n.endTag &&
					(e._setEndLocation(a, t), e.openElements.stackTop >= 1)
				) {
					let i = e.openElements.items[1],
						l = e.treeAdapter.getNodeSourceCodeLocation(i)
					l && !l.endTag && e._setEndLocation(i, t)
				}
			}
		}
	}
	function H2(e, t) {
		e._setDocumentType(t)
		let r = t.forceQuirks ? u.DOCUMENT_MODE.QUIRKS : fl.getDocumentMode(t)
		fl.isConforming(t) || e._err(t, be.ERR.nonConformingDoctype),
			e.treeAdapter.setDocumentMode(e.document, r),
			(e.insertionMode = _.BEFORE_HTML)
	}
	function ir(e, t) {
		e._err(t, be.ERR.missingDoctype, !0),
			e.treeAdapter.setDocumentMode(e.document, u.DOCUMENT_MODE.QUIRKS),
			(e.insertionMode = _.BEFORE_HTML),
			e._processToken(t)
	}
	function j2(e, t) {
		t.tagID === u.TAG_ID.HTML
			? (e._insertElement(t, u.NS.HTML), (e.insertionMode = _.BEFORE_HEAD))
			: or(e, t)
	}
	function Y2(e, t) {
		let r = t.tagID
		;(r === u.TAG_ID.HTML ||
			r === u.TAG_ID.HEAD ||
			r === u.TAG_ID.BODY ||
			r === u.TAG_ID.BR) &&
			or(e, t)
	}
	function or(e, t) {
		e._insertFakeRootElement(),
			(e.insertionMode = _.BEFORE_HEAD),
			e._processToken(t)
	}
	function V2(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.HEAD: {
				e._insertElement(t, u.NS.HTML),
					(e.headElement = e.openElements.current),
					(e.insertionMode = _.IN_HEAD)
				break
			}
			default:
				lr(e, t)
		}
	}
	function K2(e, t) {
		let r = t.tagID
		r === u.TAG_ID.HEAD ||
		r === u.TAG_ID.BODY ||
		r === u.TAG_ID.HTML ||
		r === u.TAG_ID.BR
			? lr(e, t)
			: e._err(t, be.ERR.endTagWithoutMatchingOpenElement)
	}
	function lr(e, t) {
		e._insertFakeElement(u.TAG_NAMES.HEAD, u.TAG_ID.HEAD),
			(e.headElement = e.openElements.current),
			(e.insertionMode = _.IN_HEAD),
			e._processToken(t)
	}
	function He(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.BASE:
			case u.TAG_ID.BASEFONT:
			case u.TAG_ID.BGSOUND:
			case u.TAG_ID.LINK:
			case u.TAG_ID.META: {
				e._appendElement(t, u.NS.HTML), (t.ackSelfClosing = !0)
				break
			}
			case u.TAG_ID.TITLE: {
				e._switchToTextParsing(t, xe.TokenizerMode.RCDATA)
				break
			}
			case u.TAG_ID.NOSCRIPT: {
				e.options.scriptingEnabled
					? e._switchToTextParsing(t, xe.TokenizerMode.RAWTEXT)
					: (e._insertElement(t, u.NS.HTML),
					  (e.insertionMode = _.IN_HEAD_NO_SCRIPT))
				break
			}
			case u.TAG_ID.NOFRAMES:
			case u.TAG_ID.STYLE: {
				e._switchToTextParsing(t, xe.TokenizerMode.RAWTEXT)
				break
			}
			case u.TAG_ID.SCRIPT: {
				e._switchToTextParsing(t, xe.TokenizerMode.SCRIPT_DATA)
				break
			}
			case u.TAG_ID.TEMPLATE: {
				e._insertTemplate(t),
					e.activeFormattingElements.insertMarker(),
					(e.framesetOk = !1),
					(e.insertionMode = _.IN_TEMPLATE),
					e.tmplInsertionModeStack.unshift(_.IN_TEMPLATE)
				break
			}
			case u.TAG_ID.HEAD: {
				e._err(t, be.ERR.misplacedStartTagForHeadElement)
				break
			}
			default:
				cr(e, t)
		}
	}
	function X2(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HEAD: {
				e.openElements.pop(), (e.insertionMode = _.AFTER_HEAD)
				break
			}
			case u.TAG_ID.BODY:
			case u.TAG_ID.BR:
			case u.TAG_ID.HTML: {
				cr(e, t)
				break
			}
			case u.TAG_ID.TEMPLATE: {
				mt(e, t)
				break
			}
			default:
				e._err(t, be.ERR.endTagWithoutMatchingOpenElement)
		}
	}
	function mt(e, t) {
		e.openElements.tmplCount > 0
			? (e.openElements.generateImpliedEndTagsThoroughly(),
			  e.openElements.currentTagId !== u.TAG_ID.TEMPLATE &&
					e._err(t, be.ERR.closingOfElementWithOpenChildElements),
			  e.openElements.popUntilTagNamePopped(u.TAG_ID.TEMPLATE),
			  e.activeFormattingElements.clearToLastMarker(),
			  e.tmplInsertionModeStack.shift(),
			  e._resetInsertionMode())
			: e._err(t, be.ERR.endTagWithoutMatchingOpenElement)
	}
	function cr(e, t) {
		e.openElements.pop(), (e.insertionMode = _.AFTER_HEAD), e._processToken(t)
	}
	function J2(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.BASEFONT:
			case u.TAG_ID.BGSOUND:
			case u.TAG_ID.HEAD:
			case u.TAG_ID.LINK:
			case u.TAG_ID.META:
			case u.TAG_ID.NOFRAMES:
			case u.TAG_ID.STYLE: {
				He(e, t)
				break
			}
			case u.TAG_ID.NOSCRIPT: {
				e._err(t, be.ERR.nestedNoscriptInHead)
				break
			}
			default:
				dr(e, t)
		}
	}
	function W2(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.NOSCRIPT: {
				e.openElements.pop(), (e.insertionMode = _.IN_HEAD)
				break
			}
			case u.TAG_ID.BR: {
				dr(e, t)
				break
			}
			default:
				e._err(t, be.ERR.endTagWithoutMatchingOpenElement)
		}
	}
	function dr(e, t) {
		let r =
			t.type === fe.TokenType.EOF
				? be.ERR.openElementsLeftAfterEof
				: be.ERR.disallowedContentInNoscriptInHead
		e._err(t, r),
			e.openElements.pop(),
			(e.insertionMode = _.IN_HEAD),
			e._processToken(t)
	}
	function Q2(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.BODY: {
				e._insertElement(t, u.NS.HTML),
					(e.framesetOk = !1),
					(e.insertionMode = _.IN_BODY)
				break
			}
			case u.TAG_ID.FRAMESET: {
				e._insertElement(t, u.NS.HTML), (e.insertionMode = _.IN_FRAMESET)
				break
			}
			case u.TAG_ID.BASE:
			case u.TAG_ID.BASEFONT:
			case u.TAG_ID.BGSOUND:
			case u.TAG_ID.LINK:
			case u.TAG_ID.META:
			case u.TAG_ID.NOFRAMES:
			case u.TAG_ID.SCRIPT:
			case u.TAG_ID.STYLE:
			case u.TAG_ID.TEMPLATE:
			case u.TAG_ID.TITLE: {
				e._err(t, be.ERR.abandonedHeadElementChild),
					e.openElements.push(e.headElement, u.TAG_ID.HEAD),
					He(e, t),
					e.openElements.remove(e.headElement)
				break
			}
			case u.TAG_ID.HEAD: {
				e._err(t, be.ERR.misplacedStartTagForHeadElement)
				break
			}
			default:
				pr(e, t)
		}
	}
	function $2(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.BODY:
			case u.TAG_ID.HTML:
			case u.TAG_ID.BR: {
				pr(e, t)
				break
			}
			case u.TAG_ID.TEMPLATE: {
				mt(e, t)
				break
			}
			default:
				e._err(t, be.ERR.endTagWithoutMatchingOpenElement)
		}
	}
	function pr(e, t) {
		e._insertFakeElement(u.TAG_NAMES.BODY, u.TAG_ID.BODY),
			(e.insertionMode = _.IN_BODY),
			ua(e, t)
	}
	function ua(e, t) {
		switch (t.type) {
			case fe.TokenType.CHARACTER: {
				Al(e, t)
				break
			}
			case fe.TokenType.WHITESPACE_CHARACTER: {
				bl(e, t)
				break
			}
			case fe.TokenType.COMMENT: {
				ri(e, t)
				break
			}
			case fe.TokenType.START_TAG: {
				he(e, t)
				break
			}
			case fe.TokenType.END_TAG: {
				oa(e, t)
				break
			}
			case fe.TokenType.EOF: {
				gl(e, t)
				break
			}
			default:
		}
	}
	function bl(e, t) {
		e._reconstructActiveFormattingElements(), e._insertCharacters(t)
	}
	function Al(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertCharacters(t),
			(e.framesetOk = !1)
	}
	function z2(e, t) {
		e.openElements.tmplCount === 0 &&
			e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs)
	}
	function Z2(e, t) {
		let r = e.openElements.tryPeekProperlyNestedBodyElement()
		r &&
			e.openElements.tmplCount === 0 &&
			((e.framesetOk = !1), e.treeAdapter.adoptAttributes(r, t.attrs))
	}
	function eC(e, t) {
		let r = e.openElements.tryPeekProperlyNestedBodyElement()
		e.framesetOk &&
			r &&
			(e.treeAdapter.detachNode(r),
			e.openElements.popAllUpToHtmlElement(),
			e._insertElement(t, u.NS.HTML),
			(e.insertionMode = _.IN_FRAMESET))
	}
	function tC(e, t) {
		e.openElements.hasInButtonScope(u.TAG_ID.P) && e._closePElement(),
			e._insertElement(t, u.NS.HTML)
	}
	function rC(e, t) {
		e.openElements.hasInButtonScope(u.TAG_ID.P) && e._closePElement(),
			e.openElements.currentTagId !== void 0 &&
				u.NUMBERED_HEADERS.has(e.openElements.currentTagId) &&
				e.openElements.pop(),
			e._insertElement(t, u.NS.HTML)
	}
	function aC(e, t) {
		e.openElements.hasInButtonScope(u.TAG_ID.P) && e._closePElement(),
			e._insertElement(t, u.NS.HTML),
			(e.skipNextNewLine = !0),
			(e.framesetOk = !1)
	}
	function nC(e, t) {
		let r = e.openElements.tmplCount > 0
		;(!e.formElement || r) &&
			(e.openElements.hasInButtonScope(u.TAG_ID.P) && e._closePElement(),
			e._insertElement(t, u.NS.HTML),
			r || (e.formElement = e.openElements.current))
	}
	function sC(e, t) {
		e.framesetOk = !1
		let r = t.tagID
		for (let a = e.openElements.stackTop; a >= 0; a--) {
			let n = e.openElements.tagIDs[a]
			if (
				(r === u.TAG_ID.LI && n === u.TAG_ID.LI) ||
				((r === u.TAG_ID.DD || r === u.TAG_ID.DT) &&
					(n === u.TAG_ID.DD || n === u.TAG_ID.DT))
			) {
				e.openElements.generateImpliedEndTagsWithExclusion(n),
					e.openElements.popUntilTagNamePopped(n)
				break
			}
			if (
				n !== u.TAG_ID.ADDRESS &&
				n !== u.TAG_ID.DIV &&
				n !== u.TAG_ID.P &&
				e._isSpecialElement(e.openElements.items[a], n)
			)
				break
		}
		e.openElements.hasInButtonScope(u.TAG_ID.P) && e._closePElement(),
			e._insertElement(t, u.NS.HTML)
	}
	function iC(e, t) {
		e.openElements.hasInButtonScope(u.TAG_ID.P) && e._closePElement(),
			e._insertElement(t, u.NS.HTML),
			(e.tokenizer.state = xe.TokenizerMode.PLAINTEXT)
	}
	function uC(e, t) {
		e.openElements.hasInScope(u.TAG_ID.BUTTON) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(u.TAG_ID.BUTTON)),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, u.NS.HTML),
			(e.framesetOk = !1)
	}
	function oC(e, t) {
		let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(
			u.TAG_NAMES.A
		)
		r &&
			(ni(e, t),
			e.openElements.remove(r.element),
			e.activeFormattingElements.removeEntry(r)),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, u.NS.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t)
	}
	function lC(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, u.NS.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t)
	}
	function cC(e, t) {
		e._reconstructActiveFormattingElements(),
			e.openElements.hasInScope(u.TAG_ID.NOBR) &&
				(ni(e, t), e._reconstructActiveFormattingElements()),
			e._insertElement(t, u.NS.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t)
	}
	function dC(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, u.NS.HTML),
			e.activeFormattingElements.insertMarker(),
			(e.framesetOk = !1)
	}
	function pC(e, t) {
		e.treeAdapter.getDocumentMode(e.document) !== u.DOCUMENT_MODE.QUIRKS &&
			e.openElements.hasInButtonScope(u.TAG_ID.P) &&
			e._closePElement(),
			e._insertElement(t, u.NS.HTML),
			(e.framesetOk = !1),
			(e.insertionMode = _.IN_TABLE)
	}
	function hl(e, t) {
		e._reconstructActiveFormattingElements(),
			e._appendElement(t, u.NS.HTML),
			(e.framesetOk = !1),
			(t.ackSelfClosing = !0)
	}
	function _l(e) {
		let t = (0, fe.getTokenAttr)(e, u.ATTRS.TYPE)
		return t != null && t.toLowerCase() === C2
	}
	function fC(e, t) {
		e._reconstructActiveFormattingElements(),
			e._appendElement(t, u.NS.HTML),
			_l(t) || (e.framesetOk = !1),
			(t.ackSelfClosing = !0)
	}
	function TC(e, t) {
		e._appendElement(t, u.NS.HTML), (t.ackSelfClosing = !0)
	}
	function mC(e, t) {
		e.openElements.hasInButtonScope(u.TAG_ID.P) && e._closePElement(),
			e._appendElement(t, u.NS.HTML),
			(e.framesetOk = !1),
			(t.ackSelfClosing = !0)
	}
	function EC(e, t) {
		;(t.tagName = u.TAG_NAMES.IMG), (t.tagID = u.TAG_ID.IMG), hl(e, t)
	}
	function yC(e, t) {
		e._insertElement(t, u.NS.HTML),
			(e.skipNextNewLine = !0),
			(e.tokenizer.state = xe.TokenizerMode.RCDATA),
			(e.originalInsertionMode = e.insertionMode),
			(e.framesetOk = !1),
			(e.insertionMode = _.TEXT)
	}
	function SC(e, t) {
		e.openElements.hasInButtonScope(u.TAG_ID.P) && e._closePElement(),
			e._reconstructActiveFormattingElements(),
			(e.framesetOk = !1),
			e._switchToTextParsing(t, xe.TokenizerMode.RAWTEXT)
	}
	function bC(e, t) {
		;(e.framesetOk = !1), e._switchToTextParsing(t, xe.TokenizerMode.RAWTEXT)
	}
	function ml(e, t) {
		e._switchToTextParsing(t, xe.TokenizerMode.RAWTEXT)
	}
	function AC(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, u.NS.HTML),
			(e.framesetOk = !1),
			(e.insertionMode =
				e.insertionMode === _.IN_TABLE ||
				e.insertionMode === _.IN_CAPTION ||
				e.insertionMode === _.IN_TABLE_BODY ||
				e.insertionMode === _.IN_ROW ||
				e.insertionMode === _.IN_CELL
					? _.IN_SELECT_IN_TABLE
					: _.IN_SELECT)
	}
	function hC(e, t) {
		e.openElements.currentTagId === u.TAG_ID.OPTION && e.openElements.pop(),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, u.NS.HTML)
	}
	function _C(e, t) {
		e.openElements.hasInScope(u.TAG_ID.RUBY) &&
			e.openElements.generateImpliedEndTags(),
			e._insertElement(t, u.NS.HTML)
	}
	function IC(e, t) {
		e.openElements.hasInScope(u.TAG_ID.RUBY) &&
			e.openElements.generateImpliedEndTagsWithExclusion(u.TAG_ID.RTC),
			e._insertElement(t, u.NS.HTML)
	}
	function gC(e, t) {
		e._reconstructActiveFormattingElements(),
			Ke.adjustTokenMathMLAttrs(t),
			Ke.adjustTokenXMLAttrs(t),
			t.selfClosing
				? e._appendElement(t, u.NS.MATHML)
				: e._insertElement(t, u.NS.MATHML),
			(t.ackSelfClosing = !0)
	}
	function DC(e, t) {
		e._reconstructActiveFormattingElements(),
			Ke.adjustTokenSVGAttrs(t),
			Ke.adjustTokenXMLAttrs(t),
			t.selfClosing
				? e._appendElement(t, u.NS.SVG)
				: e._insertElement(t, u.NS.SVG),
			(t.ackSelfClosing = !0)
	}
	function El(e, t) {
		e._reconstructActiveFormattingElements(), e._insertElement(t, u.NS.HTML)
	}
	function he(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.I:
			case u.TAG_ID.S:
			case u.TAG_ID.B:
			case u.TAG_ID.U:
			case u.TAG_ID.EM:
			case u.TAG_ID.TT:
			case u.TAG_ID.BIG:
			case u.TAG_ID.CODE:
			case u.TAG_ID.FONT:
			case u.TAG_ID.SMALL:
			case u.TAG_ID.STRIKE:
			case u.TAG_ID.STRONG: {
				lC(e, t)
				break
			}
			case u.TAG_ID.A: {
				oC(e, t)
				break
			}
			case u.TAG_ID.H1:
			case u.TAG_ID.H2:
			case u.TAG_ID.H3:
			case u.TAG_ID.H4:
			case u.TAG_ID.H5:
			case u.TAG_ID.H6: {
				rC(e, t)
				break
			}
			case u.TAG_ID.P:
			case u.TAG_ID.DL:
			case u.TAG_ID.OL:
			case u.TAG_ID.UL:
			case u.TAG_ID.DIV:
			case u.TAG_ID.DIR:
			case u.TAG_ID.NAV:
			case u.TAG_ID.MAIN:
			case u.TAG_ID.MENU:
			case u.TAG_ID.ASIDE:
			case u.TAG_ID.CENTER:
			case u.TAG_ID.FIGURE:
			case u.TAG_ID.FOOTER:
			case u.TAG_ID.HEADER:
			case u.TAG_ID.HGROUP:
			case u.TAG_ID.DIALOG:
			case u.TAG_ID.DETAILS:
			case u.TAG_ID.ADDRESS:
			case u.TAG_ID.ARTICLE:
			case u.TAG_ID.SEARCH:
			case u.TAG_ID.SECTION:
			case u.TAG_ID.SUMMARY:
			case u.TAG_ID.FIELDSET:
			case u.TAG_ID.BLOCKQUOTE:
			case u.TAG_ID.FIGCAPTION: {
				tC(e, t)
				break
			}
			case u.TAG_ID.LI:
			case u.TAG_ID.DD:
			case u.TAG_ID.DT: {
				sC(e, t)
				break
			}
			case u.TAG_ID.BR:
			case u.TAG_ID.IMG:
			case u.TAG_ID.WBR:
			case u.TAG_ID.AREA:
			case u.TAG_ID.EMBED:
			case u.TAG_ID.KEYGEN: {
				hl(e, t)
				break
			}
			case u.TAG_ID.HR: {
				mC(e, t)
				break
			}
			case u.TAG_ID.RB:
			case u.TAG_ID.RTC: {
				_C(e, t)
				break
			}
			case u.TAG_ID.RT:
			case u.TAG_ID.RP: {
				IC(e, t)
				break
			}
			case u.TAG_ID.PRE:
			case u.TAG_ID.LISTING: {
				aC(e, t)
				break
			}
			case u.TAG_ID.XMP: {
				SC(e, t)
				break
			}
			case u.TAG_ID.SVG: {
				DC(e, t)
				break
			}
			case u.TAG_ID.HTML: {
				z2(e, t)
				break
			}
			case u.TAG_ID.BASE:
			case u.TAG_ID.LINK:
			case u.TAG_ID.META:
			case u.TAG_ID.STYLE:
			case u.TAG_ID.TITLE:
			case u.TAG_ID.SCRIPT:
			case u.TAG_ID.BGSOUND:
			case u.TAG_ID.BASEFONT:
			case u.TAG_ID.TEMPLATE: {
				He(e, t)
				break
			}
			case u.TAG_ID.BODY: {
				Z2(e, t)
				break
			}
			case u.TAG_ID.FORM: {
				nC(e, t)
				break
			}
			case u.TAG_ID.NOBR: {
				cC(e, t)
				break
			}
			case u.TAG_ID.MATH: {
				gC(e, t)
				break
			}
			case u.TAG_ID.TABLE: {
				pC(e, t)
				break
			}
			case u.TAG_ID.INPUT: {
				fC(e, t)
				break
			}
			case u.TAG_ID.PARAM:
			case u.TAG_ID.TRACK:
			case u.TAG_ID.SOURCE: {
				TC(e, t)
				break
			}
			case u.TAG_ID.IMAGE: {
				EC(e, t)
				break
			}
			case u.TAG_ID.BUTTON: {
				uC(e, t)
				break
			}
			case u.TAG_ID.APPLET:
			case u.TAG_ID.OBJECT:
			case u.TAG_ID.MARQUEE: {
				dC(e, t)
				break
			}
			case u.TAG_ID.IFRAME: {
				bC(e, t)
				break
			}
			case u.TAG_ID.SELECT: {
				AC(e, t)
				break
			}
			case u.TAG_ID.OPTION:
			case u.TAG_ID.OPTGROUP: {
				hC(e, t)
				break
			}
			case u.TAG_ID.NOEMBED:
			case u.TAG_ID.NOFRAMES: {
				ml(e, t)
				break
			}
			case u.TAG_ID.FRAMESET: {
				eC(e, t)
				break
			}
			case u.TAG_ID.TEXTAREA: {
				yC(e, t)
				break
			}
			case u.TAG_ID.NOSCRIPT: {
				e.options.scriptingEnabled ? ml(e, t) : El(e, t)
				break
			}
			case u.TAG_ID.PLAINTEXT: {
				iC(e, t)
				break
			}
			case u.TAG_ID.COL:
			case u.TAG_ID.TH:
			case u.TAG_ID.TD:
			case u.TAG_ID.TR:
			case u.TAG_ID.HEAD:
			case u.TAG_ID.FRAME:
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.THEAD:
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.COLGROUP:
				break
			default:
				El(e, t)
		}
	}
	function xC(e, t) {
		if (
			e.openElements.hasInScope(u.TAG_ID.BODY) &&
			((e.insertionMode = _.AFTER_BODY), e.options.sourceCodeLocationInfo)
		) {
			let r = e.openElements.tryPeekProperlyNestedBodyElement()
			r && e._setEndLocation(r, t)
		}
	}
	function NC(e, t) {
		e.openElements.hasInScope(u.TAG_ID.BODY) &&
			((e.insertionMode = _.AFTER_BODY), vl(e, t))
	}
	function OC(e, t) {
		let r = t.tagID
		e.openElements.hasInScope(r) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(r))
	}
	function PC(e) {
		let t = e.openElements.tmplCount > 0,
			{formElement: r} = e
		t || (e.formElement = null),
			(r || t) &&
				e.openElements.hasInScope(u.TAG_ID.FORM) &&
				(e.openElements.generateImpliedEndTags(),
				t
					? e.openElements.popUntilTagNamePopped(u.TAG_ID.FORM)
					: r && e.openElements.remove(r))
	}
	function CC(e) {
		e.openElements.hasInButtonScope(u.TAG_ID.P) ||
			e._insertFakeElement(u.TAG_NAMES.P, u.TAG_ID.P),
			e._closePElement()
	}
	function LC(e) {
		e.openElements.hasInListItemScope(u.TAG_ID.LI) &&
			(e.openElements.generateImpliedEndTagsWithExclusion(u.TAG_ID.LI),
			e.openElements.popUntilTagNamePopped(u.TAG_ID.LI))
	}
	function vC(e, t) {
		let r = t.tagID
		e.openElements.hasInScope(r) &&
			(e.openElements.generateImpliedEndTagsWithExclusion(r),
			e.openElements.popUntilTagNamePopped(r))
	}
	function RC(e) {
		e.openElements.hasNumberedHeaderInScope() &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilNumberedHeaderPopped())
	}
	function MC(e, t) {
		let r = t.tagID
		e.openElements.hasInScope(r) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(r),
			e.activeFormattingElements.clearToLastMarker())
	}
	function BC(e) {
		e._reconstructActiveFormattingElements(),
			e._insertFakeElement(u.TAG_NAMES.BR, u.TAG_ID.BR),
			e.openElements.pop(),
			(e.framesetOk = !1)
	}
	function Il(e, t) {
		let r = t.tagName,
			a = t.tagID
		for (let n = e.openElements.stackTop; n > 0; n--) {
			let i = e.openElements.items[n],
				l = e.openElements.tagIDs[n]
			if (
				a === l &&
				(a !== u.TAG_ID.UNKNOWN || e.treeAdapter.getTagName(i) === r)
			) {
				e.openElements.generateImpliedEndTagsWithExclusion(a),
					e.openElements.stackTop >= n && e.openElements.shortenToLength(n)
				break
			}
			if (e._isSpecialElement(i, l)) break
		}
	}
	function oa(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.A:
			case u.TAG_ID.B:
			case u.TAG_ID.I:
			case u.TAG_ID.S:
			case u.TAG_ID.U:
			case u.TAG_ID.EM:
			case u.TAG_ID.TT:
			case u.TAG_ID.BIG:
			case u.TAG_ID.CODE:
			case u.TAG_ID.FONT:
			case u.TAG_ID.NOBR:
			case u.TAG_ID.SMALL:
			case u.TAG_ID.STRIKE:
			case u.TAG_ID.STRONG: {
				ni(e, t)
				break
			}
			case u.TAG_ID.P: {
				CC(e)
				break
			}
			case u.TAG_ID.DL:
			case u.TAG_ID.UL:
			case u.TAG_ID.OL:
			case u.TAG_ID.DIR:
			case u.TAG_ID.DIV:
			case u.TAG_ID.NAV:
			case u.TAG_ID.PRE:
			case u.TAG_ID.MAIN:
			case u.TAG_ID.MENU:
			case u.TAG_ID.ASIDE:
			case u.TAG_ID.BUTTON:
			case u.TAG_ID.CENTER:
			case u.TAG_ID.FIGURE:
			case u.TAG_ID.FOOTER:
			case u.TAG_ID.HEADER:
			case u.TAG_ID.HGROUP:
			case u.TAG_ID.DIALOG:
			case u.TAG_ID.ADDRESS:
			case u.TAG_ID.ARTICLE:
			case u.TAG_ID.DETAILS:
			case u.TAG_ID.SEARCH:
			case u.TAG_ID.SECTION:
			case u.TAG_ID.SUMMARY:
			case u.TAG_ID.LISTING:
			case u.TAG_ID.FIELDSET:
			case u.TAG_ID.BLOCKQUOTE:
			case u.TAG_ID.FIGCAPTION: {
				OC(e, t)
				break
			}
			case u.TAG_ID.LI: {
				LC(e)
				break
			}
			case u.TAG_ID.DD:
			case u.TAG_ID.DT: {
				vC(e, t)
				break
			}
			case u.TAG_ID.H1:
			case u.TAG_ID.H2:
			case u.TAG_ID.H3:
			case u.TAG_ID.H4:
			case u.TAG_ID.H5:
			case u.TAG_ID.H6: {
				RC(e)
				break
			}
			case u.TAG_ID.BR: {
				BC(e)
				break
			}
			case u.TAG_ID.BODY: {
				xC(e, t)
				break
			}
			case u.TAG_ID.HTML: {
				NC(e, t)
				break
			}
			case u.TAG_ID.FORM: {
				PC(e)
				break
			}
			case u.TAG_ID.APPLET:
			case u.TAG_ID.OBJECT:
			case u.TAG_ID.MARQUEE: {
				MC(e, t)
				break
			}
			case u.TAG_ID.TEMPLATE: {
				mt(e, t)
				break
			}
			default:
				Il(e, t)
		}
	}
	function gl(e, t) {
		e.tmplInsertionModeStack.length > 0 ? Ll(e, t) : si(e, t)
	}
	function wC(e, t) {
		var r
		t.tagID === u.TAG_ID.SCRIPT &&
			((r = e.scriptHandler) === null ||
				r === void 0 ||
				r.call(e, e.openElements.current)),
			e.openElements.pop(),
			(e.insertionMode = e.originalInsertionMode)
	}
	function FC(e, t) {
		e._err(t, be.ERR.eofInElementThatCanContainOnlyText),
			e.openElements.pop(),
			(e.insertionMode = e.originalInsertionMode),
			e.onEof(t)
	}
	function ei(e, t) {
		if (
			e.openElements.currentTagId !== void 0 &&
			Sl.has(e.openElements.currentTagId)
		)
			switch (
				((e.pendingCharacterTokens.length = 0),
				(e.hasNonWhitespacePendingCharacterToken = !1),
				(e.originalInsertionMode = e.insertionMode),
				(e.insertionMode = _.IN_TABLE_TEXT),
				t.type)
			) {
				case fe.TokenType.CHARACTER: {
					xl(e, t)
					break
				}
				case fe.TokenType.WHITESPACE_CHARACTER: {
					Dl(e, t)
					break
				}
			}
		else Tr(e, t)
	}
	function kC(e, t) {
		e.openElements.clearBackToTableContext(),
			e.activeFormattingElements.insertMarker(),
			e._insertElement(t, u.NS.HTML),
			(e.insertionMode = _.IN_CAPTION)
	}
	function UC(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertElement(t, u.NS.HTML),
			(e.insertionMode = _.IN_COLUMN_GROUP)
	}
	function GC(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertFakeElement(u.TAG_NAMES.COLGROUP, u.TAG_ID.COLGROUP),
			(e.insertionMode = _.IN_COLUMN_GROUP),
			ii(e, t)
	}
	function qC(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertElement(t, u.NS.HTML),
			(e.insertionMode = _.IN_TABLE_BODY)
	}
	function HC(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertFakeElement(u.TAG_NAMES.TBODY, u.TAG_ID.TBODY),
			(e.insertionMode = _.IN_TABLE_BODY),
			la(e, t)
	}
	function jC(e, t) {
		e.openElements.hasInTableScope(u.TAG_ID.TABLE) &&
			(e.openElements.popUntilTagNamePopped(u.TAG_ID.TABLE),
			e._resetInsertionMode(),
			e._processStartTag(t))
	}
	function YC(e, t) {
		_l(t) ? e._appendElement(t, u.NS.HTML) : Tr(e, t), (t.ackSelfClosing = !0)
	}
	function VC(e, t) {
		!e.formElement &&
			e.openElements.tmplCount === 0 &&
			(e._insertElement(t, u.NS.HTML),
			(e.formElement = e.openElements.current),
			e.openElements.pop())
	}
	function vt(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.TD:
			case u.TAG_ID.TH:
			case u.TAG_ID.TR: {
				HC(e, t)
				break
			}
			case u.TAG_ID.STYLE:
			case u.TAG_ID.SCRIPT:
			case u.TAG_ID.TEMPLATE: {
				He(e, t)
				break
			}
			case u.TAG_ID.COL: {
				GC(e, t)
				break
			}
			case u.TAG_ID.FORM: {
				VC(e, t)
				break
			}
			case u.TAG_ID.TABLE: {
				jC(e, t)
				break
			}
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.THEAD: {
				qC(e, t)
				break
			}
			case u.TAG_ID.INPUT: {
				YC(e, t)
				break
			}
			case u.TAG_ID.CAPTION: {
				kC(e, t)
				break
			}
			case u.TAG_ID.COLGROUP: {
				UC(e, t)
				break
			}
			default:
				Tr(e, t)
		}
	}
	function fr(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.TABLE: {
				e.openElements.hasInTableScope(u.TAG_ID.TABLE) &&
					(e.openElements.popUntilTagNamePopped(u.TAG_ID.TABLE),
					e._resetInsertionMode())
				break
			}
			case u.TAG_ID.TEMPLATE: {
				mt(e, t)
				break
			}
			case u.TAG_ID.BODY:
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.COL:
			case u.TAG_ID.COLGROUP:
			case u.TAG_ID.HTML:
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TD:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.TH:
			case u.TAG_ID.THEAD:
			case u.TAG_ID.TR:
				break
			default:
				Tr(e, t)
		}
	}
	function Tr(e, t) {
		let r = e.fosterParentingEnabled
		;(e.fosterParentingEnabled = !0), ua(e, t), (e.fosterParentingEnabled = r)
	}
	function Dl(e, t) {
		e.pendingCharacterTokens.push(t)
	}
	function xl(e, t) {
		e.pendingCharacterTokens.push(t),
			(e.hasNonWhitespacePendingCharacterToken = !0)
	}
	function ur(e, t) {
		let r = 0
		if (e.hasNonWhitespacePendingCharacterToken)
			for (; r < e.pendingCharacterTokens.length; r++)
				Tr(e, e.pendingCharacterTokens[r])
		else
			for (; r < e.pendingCharacterTokens.length; r++)
				e._insertCharacters(e.pendingCharacterTokens[r])
		;(e.insertionMode = e.originalInsertionMode), e._processToken(t)
	}
	var Nl = new Set([
		u.TAG_ID.CAPTION,
		u.TAG_ID.COL,
		u.TAG_ID.COLGROUP,
		u.TAG_ID.TBODY,
		u.TAG_ID.TD,
		u.TAG_ID.TFOOT,
		u.TAG_ID.TH,
		u.TAG_ID.THEAD,
		u.TAG_ID.TR,
	])
	function KC(e, t) {
		let r = t.tagID
		Nl.has(r)
			? e.openElements.hasInTableScope(u.TAG_ID.CAPTION) &&
			  (e.openElements.generateImpliedEndTags(),
			  e.openElements.popUntilTagNamePopped(u.TAG_ID.CAPTION),
			  e.activeFormattingElements.clearToLastMarker(),
			  (e.insertionMode = _.IN_TABLE),
			  vt(e, t))
			: he(e, t)
	}
	function XC(e, t) {
		let r = t.tagID
		switch (r) {
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.TABLE: {
				e.openElements.hasInTableScope(u.TAG_ID.CAPTION) &&
					(e.openElements.generateImpliedEndTags(),
					e.openElements.popUntilTagNamePopped(u.TAG_ID.CAPTION),
					e.activeFormattingElements.clearToLastMarker(),
					(e.insertionMode = _.IN_TABLE),
					r === u.TAG_ID.TABLE && fr(e, t))
				break
			}
			case u.TAG_ID.BODY:
			case u.TAG_ID.COL:
			case u.TAG_ID.COLGROUP:
			case u.TAG_ID.HTML:
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TD:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.TH:
			case u.TAG_ID.THEAD:
			case u.TAG_ID.TR:
				break
			default:
				oa(e, t)
		}
	}
	function ii(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.COL: {
				e._appendElement(t, u.NS.HTML), (t.ackSelfClosing = !0)
				break
			}
			case u.TAG_ID.TEMPLATE: {
				He(e, t)
				break
			}
			default:
				sa(e, t)
		}
	}
	function JC(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.COLGROUP: {
				e.openElements.currentTagId === u.TAG_ID.COLGROUP &&
					(e.openElements.pop(), (e.insertionMode = _.IN_TABLE))
				break
			}
			case u.TAG_ID.TEMPLATE: {
				mt(e, t)
				break
			}
			case u.TAG_ID.COL:
				break
			default:
				sa(e, t)
		}
	}
	function sa(e, t) {
		e.openElements.currentTagId === u.TAG_ID.COLGROUP &&
			(e.openElements.pop(),
			(e.insertionMode = _.IN_TABLE),
			e._processToken(t))
	}
	function la(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.TR: {
				e.openElements.clearBackToTableBodyContext(),
					e._insertElement(t, u.NS.HTML),
					(e.insertionMode = _.IN_ROW)
				break
			}
			case u.TAG_ID.TH:
			case u.TAG_ID.TD: {
				e.openElements.clearBackToTableBodyContext(),
					e._insertFakeElement(u.TAG_NAMES.TR, u.TAG_ID.TR),
					(e.insertionMode = _.IN_ROW),
					ca(e, t)
				break
			}
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.COL:
			case u.TAG_ID.COLGROUP:
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.THEAD: {
				e.openElements.hasTableBodyContextInTableScope() &&
					(e.openElements.clearBackToTableBodyContext(),
					e.openElements.pop(),
					(e.insertionMode = _.IN_TABLE),
					vt(e, t))
				break
			}
			default:
				vt(e, t)
		}
	}
	function ai(e, t) {
		let r = t.tagID
		switch (t.tagID) {
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.THEAD: {
				e.openElements.hasInTableScope(r) &&
					(e.openElements.clearBackToTableBodyContext(),
					e.openElements.pop(),
					(e.insertionMode = _.IN_TABLE))
				break
			}
			case u.TAG_ID.TABLE: {
				e.openElements.hasTableBodyContextInTableScope() &&
					(e.openElements.clearBackToTableBodyContext(),
					e.openElements.pop(),
					(e.insertionMode = _.IN_TABLE),
					fr(e, t))
				break
			}
			case u.TAG_ID.BODY:
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.COL:
			case u.TAG_ID.COLGROUP:
			case u.TAG_ID.HTML:
			case u.TAG_ID.TD:
			case u.TAG_ID.TH:
			case u.TAG_ID.TR:
				break
			default:
				fr(e, t)
		}
	}
	function ca(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.TH:
			case u.TAG_ID.TD: {
				e.openElements.clearBackToTableRowContext(),
					e._insertElement(t, u.NS.HTML),
					(e.insertionMode = _.IN_CELL),
					e.activeFormattingElements.insertMarker()
				break
			}
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.COL:
			case u.TAG_ID.COLGROUP:
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.THEAD:
			case u.TAG_ID.TR: {
				e.openElements.hasInTableScope(u.TAG_ID.TR) &&
					(e.openElements.clearBackToTableRowContext(),
					e.openElements.pop(),
					(e.insertionMode = _.IN_TABLE_BODY),
					la(e, t))
				break
			}
			default:
				vt(e, t)
		}
	}
	function Ol(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.TR: {
				e.openElements.hasInTableScope(u.TAG_ID.TR) &&
					(e.openElements.clearBackToTableRowContext(),
					e.openElements.pop(),
					(e.insertionMode = _.IN_TABLE_BODY))
				break
			}
			case u.TAG_ID.TABLE: {
				e.openElements.hasInTableScope(u.TAG_ID.TR) &&
					(e.openElements.clearBackToTableRowContext(),
					e.openElements.pop(),
					(e.insertionMode = _.IN_TABLE_BODY),
					ai(e, t))
				break
			}
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.THEAD: {
				;(e.openElements.hasInTableScope(t.tagID) ||
					e.openElements.hasInTableScope(u.TAG_ID.TR)) &&
					(e.openElements.clearBackToTableRowContext(),
					e.openElements.pop(),
					(e.insertionMode = _.IN_TABLE_BODY),
					ai(e, t))
				break
			}
			case u.TAG_ID.BODY:
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.COL:
			case u.TAG_ID.COLGROUP:
			case u.TAG_ID.HTML:
			case u.TAG_ID.TD:
			case u.TAG_ID.TH:
				break
			default:
				fr(e, t)
		}
	}
	function WC(e, t) {
		let r = t.tagID
		Nl.has(r)
			? (e.openElements.hasInTableScope(u.TAG_ID.TD) ||
					e.openElements.hasInTableScope(u.TAG_ID.TH)) &&
			  (e._closeTableCell(), ca(e, t))
			: he(e, t)
	}
	function QC(e, t) {
		let r = t.tagID
		switch (r) {
			case u.TAG_ID.TD:
			case u.TAG_ID.TH: {
				e.openElements.hasInTableScope(r) &&
					(e.openElements.generateImpliedEndTags(),
					e.openElements.popUntilTagNamePopped(r),
					e.activeFormattingElements.clearToLastMarker(),
					(e.insertionMode = _.IN_ROW))
				break
			}
			case u.TAG_ID.TABLE:
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.THEAD:
			case u.TAG_ID.TR: {
				e.openElements.hasInTableScope(r) && (e._closeTableCell(), Ol(e, t))
				break
			}
			case u.TAG_ID.BODY:
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.COL:
			case u.TAG_ID.COLGROUP:
			case u.TAG_ID.HTML:
				break
			default:
				oa(e, t)
		}
	}
	function Pl(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.OPTION: {
				e.openElements.currentTagId === u.TAG_ID.OPTION &&
					e.openElements.pop(),
					e._insertElement(t, u.NS.HTML)
				break
			}
			case u.TAG_ID.OPTGROUP: {
				e.openElements.currentTagId === u.TAG_ID.OPTION &&
					e.openElements.pop(),
					e.openElements.currentTagId === u.TAG_ID.OPTGROUP &&
						e.openElements.pop(),
					e._insertElement(t, u.NS.HTML)
				break
			}
			case u.TAG_ID.HR: {
				e.openElements.currentTagId === u.TAG_ID.OPTION &&
					e.openElements.pop(),
					e.openElements.currentTagId === u.TAG_ID.OPTGROUP &&
						e.openElements.pop(),
					e._appendElement(t, u.NS.HTML),
					(t.ackSelfClosing = !0)
				break
			}
			case u.TAG_ID.INPUT:
			case u.TAG_ID.KEYGEN:
			case u.TAG_ID.TEXTAREA:
			case u.TAG_ID.SELECT: {
				e.openElements.hasInSelectScope(u.TAG_ID.SELECT) &&
					(e.openElements.popUntilTagNamePopped(u.TAG_ID.SELECT),
					e._resetInsertionMode(),
					t.tagID !== u.TAG_ID.SELECT && e._processStartTag(t))
				break
			}
			case u.TAG_ID.SCRIPT:
			case u.TAG_ID.TEMPLATE: {
				He(e, t)
				break
			}
			default:
		}
	}
	function Cl(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.OPTGROUP: {
				e.openElements.stackTop > 0 &&
					e.openElements.currentTagId === u.TAG_ID.OPTION &&
					e.openElements.tagIDs[e.openElements.stackTop - 1] ===
						u.TAG_ID.OPTGROUP &&
					e.openElements.pop(),
					e.openElements.currentTagId === u.TAG_ID.OPTGROUP &&
						e.openElements.pop()
				break
			}
			case u.TAG_ID.OPTION: {
				e.openElements.currentTagId === u.TAG_ID.OPTION &&
					e.openElements.pop()
				break
			}
			case u.TAG_ID.SELECT: {
				e.openElements.hasInSelectScope(u.TAG_ID.SELECT) &&
					(e.openElements.popUntilTagNamePopped(u.TAG_ID.SELECT),
					e._resetInsertionMode())
				break
			}
			case u.TAG_ID.TEMPLATE: {
				mt(e, t)
				break
			}
			default:
		}
	}
	function $C(e, t) {
		let r = t.tagID
		r === u.TAG_ID.CAPTION ||
		r === u.TAG_ID.TABLE ||
		r === u.TAG_ID.TBODY ||
		r === u.TAG_ID.TFOOT ||
		r === u.TAG_ID.THEAD ||
		r === u.TAG_ID.TR ||
		r === u.TAG_ID.TD ||
		r === u.TAG_ID.TH
			? (e.openElements.popUntilTagNamePopped(u.TAG_ID.SELECT),
			  e._resetInsertionMode(),
			  e._processStartTag(t))
			: Pl(e, t)
	}
	function zC(e, t) {
		let r = t.tagID
		r === u.TAG_ID.CAPTION ||
		r === u.TAG_ID.TABLE ||
		r === u.TAG_ID.TBODY ||
		r === u.TAG_ID.TFOOT ||
		r === u.TAG_ID.THEAD ||
		r === u.TAG_ID.TR ||
		r === u.TAG_ID.TD ||
		r === u.TAG_ID.TH
			? e.openElements.hasInTableScope(r) &&
			  (e.openElements.popUntilTagNamePopped(u.TAG_ID.SELECT),
			  e._resetInsertionMode(),
			  e.onEndTag(t))
			: Cl(e, t)
	}
	function ZC(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.BASE:
			case u.TAG_ID.BASEFONT:
			case u.TAG_ID.BGSOUND:
			case u.TAG_ID.LINK:
			case u.TAG_ID.META:
			case u.TAG_ID.NOFRAMES:
			case u.TAG_ID.SCRIPT:
			case u.TAG_ID.STYLE:
			case u.TAG_ID.TEMPLATE:
			case u.TAG_ID.TITLE: {
				He(e, t)
				break
			}
			case u.TAG_ID.CAPTION:
			case u.TAG_ID.COLGROUP:
			case u.TAG_ID.TBODY:
			case u.TAG_ID.TFOOT:
			case u.TAG_ID.THEAD: {
				;(e.tmplInsertionModeStack[0] = _.IN_TABLE),
					(e.insertionMode = _.IN_TABLE),
					vt(e, t)
				break
			}
			case u.TAG_ID.COL: {
				;(e.tmplInsertionModeStack[0] = _.IN_COLUMN_GROUP),
					(e.insertionMode = _.IN_COLUMN_GROUP),
					ii(e, t)
				break
			}
			case u.TAG_ID.TR: {
				;(e.tmplInsertionModeStack[0] = _.IN_TABLE_BODY),
					(e.insertionMode = _.IN_TABLE_BODY),
					la(e, t)
				break
			}
			case u.TAG_ID.TD:
			case u.TAG_ID.TH: {
				;(e.tmplInsertionModeStack[0] = _.IN_ROW),
					(e.insertionMode = _.IN_ROW),
					ca(e, t)
				break
			}
			default:
				;(e.tmplInsertionModeStack[0] = _.IN_BODY),
					(e.insertionMode = _.IN_BODY),
					he(e, t)
		}
	}
	function e3(e, t) {
		t.tagID === u.TAG_ID.TEMPLATE && mt(e, t)
	}
	function Ll(e, t) {
		e.openElements.tmplCount > 0
			? (e.openElements.popUntilTagNamePopped(u.TAG_ID.TEMPLATE),
			  e.activeFormattingElements.clearToLastMarker(),
			  e.tmplInsertionModeStack.shift(),
			  e._resetInsertionMode(),
			  e.onEof(t))
			: si(e, t)
	}
	function t3(e, t) {
		t.tagID === u.TAG_ID.HTML ? he(e, t) : ia(e, t)
	}
	function vl(e, t) {
		var r
		if (t.tagID === u.TAG_ID.HTML) {
			if (
				(e.fragmentContext || (e.insertionMode = _.AFTER_AFTER_BODY),
				e.options.sourceCodeLocationInfo &&
					e.openElements.tagIDs[0] === u.TAG_ID.HTML)
			) {
				e._setEndLocation(e.openElements.items[0], t)
				let a = e.openElements.items[1]
				a &&
					!(
						!(
							(r = e.treeAdapter.getNodeSourceCodeLocation(a)) ===
								null || r === void 0
						) && r.endTag
					) &&
					e._setEndLocation(a, t)
			}
		} else ia(e, t)
	}
	function ia(e, t) {
		;(e.insertionMode = _.IN_BODY), ua(e, t)
	}
	function r3(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.FRAMESET: {
				e._insertElement(t, u.NS.HTML)
				break
			}
			case u.TAG_ID.FRAME: {
				e._appendElement(t, u.NS.HTML), (t.ackSelfClosing = !0)
				break
			}
			case u.TAG_ID.NOFRAMES: {
				He(e, t)
				break
			}
			default:
		}
	}
	function a3(e, t) {
		t.tagID === u.TAG_ID.FRAMESET &&
			!e.openElements.isRootHtmlElementCurrent() &&
			(e.openElements.pop(),
			!e.fragmentContext &&
				e.openElements.currentTagId !== u.TAG_ID.FRAMESET &&
				(e.insertionMode = _.AFTER_FRAMESET))
	}
	function n3(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.NOFRAMES: {
				He(e, t)
				break
			}
			default:
		}
	}
	function s3(e, t) {
		t.tagID === u.TAG_ID.HTML && (e.insertionMode = _.AFTER_AFTER_FRAMESET)
	}
	function i3(e, t) {
		t.tagID === u.TAG_ID.HTML ? he(e, t) : na(e, t)
	}
	function na(e, t) {
		;(e.insertionMode = _.IN_BODY), ua(e, t)
	}
	function u3(e, t) {
		switch (t.tagID) {
			case u.TAG_ID.HTML: {
				he(e, t)
				break
			}
			case u.TAG_ID.NOFRAMES: {
				He(e, t)
				break
			}
			default:
		}
	}
	function o3(e, t) {
		;(t.chars = yl.REPLACEMENT_CHARACTER), e._insertCharacters(t)
	}
	function l3(e, t) {
		e._insertCharacters(t), (e.framesetOk = !1)
	}
	function Rl(e) {
		for (
			;
			e.treeAdapter.getNamespaceURI(e.openElements.current) !== u.NS.HTML &&
			e.openElements.currentTagId !== void 0 &&
			!e._isIntegrationPoint(
				e.openElements.currentTagId,
				e.openElements.current
			);

		)
			e.openElements.pop()
	}
	function c3(e, t) {
		if (Ke.causesExit(t)) Rl(e), e._startTagOutsideForeignContent(t)
		else {
			let r = e._getAdjustedCurrentElement(),
				a = e.treeAdapter.getNamespaceURI(r)
			a === u.NS.MATHML
				? Ke.adjustTokenMathMLAttrs(t)
				: a === u.NS.SVG &&
				  (Ke.adjustTokenSVGTagName(t), Ke.adjustTokenSVGAttrs(t)),
				Ke.adjustTokenXMLAttrs(t),
				t.selfClosing ? e._appendElement(t, a) : e._insertElement(t, a),
				(t.ackSelfClosing = !0)
		}
	}
	function d3(e, t) {
		if (t.tagID === u.TAG_ID.P || t.tagID === u.TAG_ID.BR) {
			Rl(e), e._endTagOutsideForeignContent(t)
			return
		}
		for (let r = e.openElements.stackTop; r > 0; r--) {
			let a = e.openElements.items[r]
			if (e.treeAdapter.getNamespaceURI(a) === u.NS.HTML) {
				e._endTagOutsideForeignContent(t)
				break
			}
			let n = e.treeAdapter.getTagName(a)
			if (n.toLowerCase() === t.tagName) {
				;(t.tagName = n), e.openElements.shortenToLength(r)
				break
			}
		}
	}
})
var wl = v(Se => {
	"use strict"
	Object.defineProperty(Se, "__esModule", {value: !0})
	Se.escapeText =
		Se.escapeAttribute =
		Se.escapeUTF8 =
		Se.escape =
		Se.getCodePoint =
		Se.xmlReplacer =
			void 0
	Se.encodeXML = Bl
	Se.xmlReplacer = /["$&'<>\u0080-\uFFFF]/g
	var Ml = new Map([
		[34, "&quot;"],
		[38, "&amp;"],
		[39, "&apos;"],
		[60, "&lt;"],
		[62, "&gt;"],
	])
	Se.getCodePoint =
		String.prototype.codePointAt == null
			? (e, t) =>
					(e.charCodeAt(t) & 64512) === 55296
						? (e.charCodeAt(t) - 55296) * 1024 +
						  e.charCodeAt(t + 1) -
						  56320 +
						  65536
						: e.charCodeAt(t)
			: (e, t) => e.codePointAt(t)
	function Bl(e) {
		let t = "",
			r = 0,
			a
		for (; (a = Se.xmlReplacer.exec(e)) !== null; ) {
			let {index: n} = a,
				i = e.charCodeAt(n),
				l = Ml.get(i)
			l === void 0
				? ((t += `${e.substring(r, n)}&#x${(0, Se.getCodePoint)(
						e,
						n
				  ).toString(16)};`),
				  (r = Se.xmlReplacer.lastIndex += +((i & 64512) === 55296)))
				: ((t += e.substring(r, n) + l), (r = n + 1))
		}
		return t + e.substr(r)
	}
	Se.escape = Bl
	function oi(e, t) {
		return function (a) {
			let n,
				i = 0,
				l = ""
			for (; (n = e.exec(a)); )
				i !== n.index && (l += a.substring(i, n.index)),
					(l += t.get(n[0].charCodeAt(0))),
					(i = n.index + 1)
			return l + a.substring(i)
		}
	}
	Se.escapeUTF8 = oi(/["&'<>]/g, Ml)
	Se.escapeAttribute = oi(
		/["&\u00A0]/g,
		new Map([
			[34, "&quot;"],
			[38, "&amp;"],
			[160, "&nbsp;"],
		])
	)
	Se.escapeText = oi(
		/[&<>\u00A0]/g,
		new Map([
			[38, "&amp;"],
			[60, "&lt;"],
			[62, "&gt;"],
			[160, "&nbsp;"],
		])
	)
})
var Hl = v(pa => {
	"use strict"
	Object.defineProperty(pa, "__esModule", {value: !0})
	pa.serialize = T3
	pa.serializeOuter = m3
	var ne = Je(),
		Fl = wl(),
		p3 = ra(),
		f3 = new Set([
			ne.TAG_NAMES.AREA,
			ne.TAG_NAMES.BASE,
			ne.TAG_NAMES.BASEFONT,
			ne.TAG_NAMES.BGSOUND,
			ne.TAG_NAMES.BR,
			ne.TAG_NAMES.COL,
			ne.TAG_NAMES.EMBED,
			ne.TAG_NAMES.FRAME,
			ne.TAG_NAMES.HR,
			ne.TAG_NAMES.IMG,
			ne.TAG_NAMES.INPUT,
			ne.TAG_NAMES.KEYGEN,
			ne.TAG_NAMES.LINK,
			ne.TAG_NAMES.META,
			ne.TAG_NAMES.PARAM,
			ne.TAG_NAMES.SOURCE,
			ne.TAG_NAMES.TRACK,
			ne.TAG_NAMES.WBR,
		])
	function kl(e, t) {
		return (
			t.treeAdapter.isElementNode(e) &&
			t.treeAdapter.getNamespaceURI(e) === ne.NS.HTML &&
			f3.has(t.treeAdapter.getTagName(e))
		)
	}
	var Ul = {treeAdapter: p3.defaultTreeAdapter, scriptingEnabled: !0}
	function T3(e, t) {
		let r = Object.assign(Object.assign({}, Ul), t)
		return kl(e, r) ? "" : Gl(e, r)
	}
	function m3(e, t) {
		let r = Object.assign(Object.assign({}, Ul), t)
		return ql(e, r)
	}
	function Gl(e, t) {
		let r = "",
			a =
				t.treeAdapter.isElementNode(e) &&
				t.treeAdapter.getTagName(e) === ne.TAG_NAMES.TEMPLATE &&
				t.treeAdapter.getNamespaceURI(e) === ne.NS.HTML
					? t.treeAdapter.getTemplateContent(e)
					: e,
			n = t.treeAdapter.getChildNodes(a)
		if (n) for (let i of n) r += ql(i, t)
		return r
	}
	function ql(e, t) {
		return t.treeAdapter.isElementNode(e)
			? E3(e, t)
			: t.treeAdapter.isTextNode(e)
			? S3(e, t)
			: t.treeAdapter.isCommentNode(e)
			? b3(e, t)
			: t.treeAdapter.isDocumentTypeNode(e)
			? A3(e, t)
			: ""
	}
	function E3(e, t) {
		let r = t.treeAdapter.getTagName(e)
		return `<${r}${y3(e, t)}>${kl(e, t) ? "" : `${Gl(e, t)}</${r}>`}`
	}
	function y3(e, {treeAdapter: t}) {
		let r = ""
		for (let a of t.getAttrList(e)) {
			if (((r += " "), a.namespace))
				switch (a.namespace) {
					case ne.NS.XML: {
						r += `xml:${a.name}`
						break
					}
					case ne.NS.XMLNS: {
						a.name !== "xmlns" && (r += "xmlns:"), (r += a.name)
						break
					}
					case ne.NS.XLINK: {
						r += `xlink:${a.name}`
						break
					}
					default:
						r += `${a.prefix}:${a.name}`
				}
			else r += a.name
			r += `="${(0, Fl.escapeAttribute)(a.value)}"`
		}
		return r
	}
	function S3(e, t) {
		let {treeAdapter: r} = t,
			a = r.getTextNodeContent(e),
			n = r.getParentNode(e),
			i = n && r.isElementNode(n) && r.getTagName(n)
		return i &&
			r.getNamespaceURI(n) === ne.NS.HTML &&
			(0, ne.hasUnescapedText)(i, t.scriptingEnabled)
			? a
			: (0, Fl.escapeText)(a)
	}
	function b3(e, {treeAdapter: t}) {
		return `<!--${t.getCommentNodeContent(e)}-->`
	}
	function A3(e, {treeAdapter: t}) {
		return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`
	}
})
var Kl = v(oe => {
	"use strict"
	Object.defineProperty(oe, "__esModule", {value: !0})
	oe.TokenizerMode =
		oe.Tokenizer =
		oe.Token =
		oe.html =
		oe.foreignContent =
		oe.ErrorCodes =
		oe.serializeOuter =
		oe.serialize =
		oe.Parser =
		oe.defaultTreeAdapter =
			void 0
	oe.parse = g3
	oe.parseFragment = D3
	var jl = ui(),
		h3 = ra()
	Object.defineProperty(oe, "defaultTreeAdapter", {
		enumerable: !0,
		get: function () {
			return h3.defaultTreeAdapter
		},
	})
	var _3 = ui()
	Object.defineProperty(oe, "Parser", {
		enumerable: !0,
		get: function () {
			return _3.Parser
		},
	})
	var Yl = Hl()
	Object.defineProperty(oe, "serialize", {
		enumerable: !0,
		get: function () {
			return Yl.serialize
		},
	})
	Object.defineProperty(oe, "serializeOuter", {
		enumerable: !0,
		get: function () {
			return Yl.serializeOuter
		},
	})
	var I3 = ar()
	Object.defineProperty(oe, "ErrorCodes", {
		enumerable: !0,
		get: function () {
			return I3.ERR
		},
	})
	oe.foreignContent = Zs()
	oe.html = Je()
	oe.Token = Jr()
	var Vl = Ws()
	Object.defineProperty(oe, "Tokenizer", {
		enumerable: !0,
		get: function () {
			return Vl.Tokenizer
		},
	})
	Object.defineProperty(oe, "TokenizerMode", {
		enumerable: !0,
		get: function () {
			return Vl.TokenizerMode
		},
	})
	function g3(e, t) {
		return jl.Parser.parse(e, t)
	}
	function D3(e, t, r) {
		typeof e == "string" && ((r = t), (t = e), (e = null))
		let a = jl.Parser.getFragmentParser(e, r)
		return a.tokenizer.write(t, !0), a.getFragment()
	}
})
var Jl = v((Vw, Xl) => {
	var Rt = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]),
		Mt = new Set([]),
		x3 = {
			head: new Set([
				"base",
				"basefront",
				"bgsound",
				"link",
				"meta",
				"title",
				"noscript",
				"noframes",
				"style",
				"script",
				"template",
			]),
			optgroup: new Set(["option"]),
			select: new Set(["optgroup", "option"]),
			math: new Set(["mrow"]),
			script: new Set(),
			table: new Set(["caption", "colgroup", "tbody", "tfoot", "thead"]),
			tr: new Set(["td", "th"]),
			colgroup: new Set(["col"]),
			tbody: new Set(["tr"]),
			thead: new Set(["tr"]),
			tfoot: new Set(["tr"]),
			iframe: Mt,
			option: Mt,
			textarea: Mt,
			style: Mt,
			title: Mt,
		},
		N3 = {
			html: Mt,
			body: new Set(["html"]),
			head: new Set(["html"]),
			td: new Set(["tr"]),
			colgroup: new Set(["table"]),
			caption: new Set(["table"]),
			tbody: new Set(["table"]),
			tfoot: new Set(["table"]),
			col: new Set(["colgroup"]),
			th: new Set(["tr"]),
			thead: new Set(["table"]),
			tr: new Set(["tbody", "thead", "tfoot"]),
			dd: new Set(["dl", "div"]),
			dt: new Set(["dl", "div"]),
			figcaption: new Set(["figure"]),
			summary: new Set(["details"]),
			area: new Set(["map"]),
		},
		O3 = {
			p: new Set([
				"address",
				"article",
				"aside",
				"blockquote",
				"center",
				"details",
				"dialog",
				"dir",
				"div",
				"dl",
				"fieldset",
				"figure",
				"footer",
				"form",
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"header",
				"hgroup",
				"hr",
				"li",
				"main",
				"nav",
				"menu",
				"ol",
				"p",
				"pre",
				"section",
				"table",
				"ul",
			]),
			svg: new Set([
				"b",
				"blockquote",
				"br",
				"code",
				"dd",
				"div",
				"dl",
				"dt",
				"em",
				"embed",
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"hr",
				"i",
				"img",
				"li",
				"menu",
				"meta",
				"ol",
				"p",
				"pre",
				"ruby",
				"s",
				"small",
				"span",
				"strong",
				"sub",
				"sup",
				"table",
				"u",
				"ul",
				"var",
			]),
		},
		P3 = {
			a: new Set(["a"]),
			button: new Set(["button"]),
			dd: new Set(["dd", "dt"]),
			dt: new Set(["dd", "dt"]),
			form: new Set(["form"]),
			li: new Set(["li"]),
			h1: Rt,
			h2: Rt,
			h3: Rt,
			h4: Rt,
			h5: Rt,
			h6: Rt,
		}
	Xl.exports = {
		onlyValidChildren: x3,
		onlyValidParents: N3,
		knownInvalidChildren: O3,
		knownInvalidParents: P3,
	}
})
var ec = v((Kw, Zl) => {
	var {
		onlyValidChildren: Wl,
		onlyValidParents: Ql,
		knownInvalidChildren: $l,
		knownInvalidParents: zl,
	} = Jl()
	function C3(e, t) {
		return e in Wl
			? Wl[e].has(t)
			: t in Ql
			? Ql[t].has(e)
			: !((e in $l && $l[e].has(t)) || (t in zl && zl[t].has(e)))
	}
	Zl.exports = {isValidHTMLNesting: C3}
})
var hc = v((Xw, Ac) => {
	"use strict"
	var L3 = Ii(),
		v3 = Dt(),
		R3 = Lo(),
		fi = ko()
	function M3(e) {
		var t = Object.create(null)
		return (
			e &&
				Object.keys(e).forEach(function (r) {
					if (r !== "default") {
						var a = Object.getOwnPropertyDescriptor(e, r)
						Object.defineProperty(
							t,
							r,
							a.get
								? a
								: {
										enumerable: !0,
										get: function () {
											return e[r]
										},
								  }
						)
					}
				}),
			(t.default = e),
			Object.freeze(t)
		)
	}
	var s = M3(v3),
		oc = [
			"allowfullscreen",
			"async",
			"autofocus",
			"autoplay",
			"checked",
			"controls",
			"default",
			"disabled",
			"formnovalidate",
			"hidden",
			"indeterminate",
			"inert",
			"ismap",
			"loop",
			"multiple",
			"muted",
			"nomodule",
			"novalidate",
			"open",
			"playsinline",
			"readonly",
			"required",
			"reversed",
			"seamless",
			"selected",
		],
		tc = new Set(oc),
		Ti = new Set([
			"className",
			"value",
			"readOnly",
			"formNoValidate",
			"isMap",
			"noModule",
			"playsInline",
			...oc,
		]),
		mr = new Set(["innerHTML", "textContent", "innerText", "children"]),
		mi = Object.assign(Object.create(null), {
			className: "class",
			htmlFor: "for",
		}),
		B3 = Object.assign(Object.create(null), {
			class: "className",
			formnovalidate: {$: "formNoValidate", BUTTON: 1, INPUT: 1},
			ismap: {$: "isMap", IMG: 1},
			nomodule: {$: "noModule", SCRIPT: 1},
			playsinline: {$: "playsInline", VIDEO: 1},
			readonly: {$: "readOnly", INPUT: 1, TEXTAREA: 1},
		})
	function w3(e, t) {
		let r = B3[e]
		return typeof r == "object" ? (r[t] ? r.$ : void 0) : r
	}
	var F3 = new Set([
			"beforeinput",
			"click",
			"dblclick",
			"contextmenu",
			"focusin",
			"focusout",
			"input",
			"keydown",
			"keyup",
			"mousedown",
			"mousemove",
			"mouseout",
			"mouseover",
			"mouseup",
			"pointerdown",
			"pointermove",
			"pointerout",
			"pointerover",
			"pointerup",
			"touchend",
			"touchmove",
			"touchstart",
		]),
		Ei = new Set([
			"altGlyph",
			"altGlyphDef",
			"altGlyphItem",
			"animate",
			"animateColor",
			"animateMotion",
			"animateTransform",
			"circle",
			"clipPath",
			"color-profile",
			"cursor",
			"defs",
			"desc",
			"ellipse",
			"feBlend",
			"feColorMatrix",
			"feComponentTransfer",
			"feComposite",
			"feConvolveMatrix",
			"feDiffuseLighting",
			"feDisplacementMap",
			"feDistantLight",
			"feDropShadow",
			"feFlood",
			"feFuncA",
			"feFuncB",
			"feFuncG",
			"feFuncR",
			"feGaussianBlur",
			"feImage",
			"feMerge",
			"feMergeNode",
			"feMorphology",
			"feOffset",
			"fePointLight",
			"feSpecularLighting",
			"feSpotLight",
			"feTile",
			"feTurbulence",
			"filter",
			"font",
			"font-face",
			"font-face-format",
			"font-face-name",
			"font-face-src",
			"font-face-uri",
			"foreignObject",
			"g",
			"glyph",
			"glyphRef",
			"hkern",
			"image",
			"line",
			"linearGradient",
			"marker",
			"mask",
			"metadata",
			"missing-glyph",
			"mpath",
			"path",
			"pattern",
			"polygon",
			"polyline",
			"radialGradient",
			"rect",
			"set",
			"stop",
			"svg",
			"switch",
			"symbol",
			"text",
			"textPath",
			"tref",
			"tspan",
			"use",
			"view",
			"vkern",
		]),
		k3 = {
			xlink: "http://www.w3.org/1999/xlink",
			xml: "http://www.w3.org/XML/1998/namespace",
		},
		lc = [
			"area",
			"base",
			"br",
			"col",
			"embed",
			"hr",
			"img",
			"input",
			"keygen",
			"link",
			"menuitem",
			"meta",
			"param",
			"source",
			"track",
			"wbr",
		],
		ma = new Set([
			"class",
			"on",
			"oncapture",
			"style",
			"use",
			"prop",
			"attr",
			"bool",
		]),
		U3 = new Set(["class", "style", "use", "prop", "attr", "bool"])
	function pe(e) {
		return e.hub.file.metadata.config
	}
	var te = (e, t) => {
		let r = pe(e)
		return r?.renderers?.find(a => a.name === t) ?? r
	}
	function K(e, t, r) {
		let a =
			e.scope.getProgramParent().data.imports ||
			(e.scope.getProgramParent().data.imports = new Map())
		if (((r = r || pe(e).moduleName), a.has(`${r}:${t}`))) {
			let n = a.get(`${r}:${t}`)
			return s.cloneNode(n)
		} else {
			let n = R3.addNamed(e, t, r, {nameHint: `_$${t}`})
			return a.set(`${r}:${t}`, n), n
		}
	}
	function cc(e) {
		return s.isJSXMemberExpression(e)
			? `${cc(e.object)}.${e.property.name}`
			: s.isJSXIdentifier(e) || s.isIdentifier(e)
			? e.name
			: `${e.namespace.name}:${e.name.name}`
	}
	function Oe(e) {
		let t = e.openingElement.name
		return cc(t)
	}
	function it(e) {
		return (
			(e[0] && e[0].toLowerCase() !== e[0]) ||
			e.includes(".") ||
			/[^a-zA-Z]/.test(e[0])
		)
	}
	function de(
		e,
		{checkMember: t, checkTags: r, checkCallExpressions: a = !0, native: n}
	) {
		let i = pe(e)
		i.generate === "ssr" && n && ((t = !1), (a = !1))
		let l = e.node
		if (s.isFunction(l)) return !1
		if (
			l.leadingComments &&
			l.leadingComments[0] &&
			l.leadingComments[0].value.trim() === i.staticMarker
		)
			return l.leadingComments.shift(), !1
		if (
			a &&
			(s.isCallExpression(l) ||
				s.isOptionalCallExpression(l) ||
				s.isTaggedTemplateExpression(l))
		)
			return !0
		if (t && s.isMemberExpression(l)) {
			let S = e.get("object").node
			if (
				s.isIdentifier(S) &&
				(!l.computed ||
					!de(e.get("property"), {
						checkMember: t,
						checkTags: r,
						checkCallExpressions: a,
						native: n,
					}))
			) {
				let g = e.scope.getBinding(S.name)
				if (g && g.path.isImportNamespaceSpecifier()) return !1
			}
			return !0
		}
		if (
			(t &&
				(s.isOptionalMemberExpression(l) ||
					s.isSpreadElement(l) ||
					(s.isBinaryExpression(l) && l.operator === "in"))) ||
			(r && (s.isJSXElement(l) || (s.isJSXFragment(l) && l.children.length)))
		)
			return !0
		let d
		return (
			e.traverse({
				Function(S) {
					s.isObjectMethod(S.node) &&
						S.node.computed &&
						(d = de(S.get("key"), {
							checkMember: t,
							checkTags: r,
							checkCallExpressions: a,
							native: n,
						})),
						S.skip()
				},
				CallExpression(S) {
					a && (d = !0) && S.stop()
				},
				OptionalCallExpression(S) {
					a && (d = !0) && S.stop()
				},
				MemberExpression(S) {
					t && (d = !0) && S.stop()
				},
				OptionalMemberExpression(S) {
					t && (d = !0) && S.stop()
				},
				SpreadElement(S) {
					t && (d = !0) && S.stop()
				},
				BinaryExpression(S) {
					t && S.node.operator === "in" && (d = !0) && S.stop()
				},
				JSXElement(S) {
					r ? (d = !0) && S.stop() : S.skip()
				},
				JSXFragment(S) {
					r && S.node.children.length ? (d = !0) && S.stop() : S.skip()
				},
			}),
			d
		)
	}
	function fa(e) {
		let t = e.node,
			r,
			a
		return (
			s.isJSXExpressionContainer(t) &&
			s.isJSXElement(e.parent) &&
			!it(Oe(e.parent)) &&
			!s.isSequenceExpression(t.expression) &&
			(r = e.get("expression").evaluate().value) !== void 0 &&
			((a = typeof r) == "string" || a === "number") &&
			r
		)
	}
	function yt(e) {
		return e.filter(
			({node: t}) =>
				!(
					s.isJSXExpressionContainer(t) &&
					s.isJSXEmptyExpression(t.expression)
				) &&
				(!s.isJSXText(t) || !/^[\r\n]\s*$/.test(t.extra.raw))
		)
	}
	function Ea(e) {
		let t = 0
		return (
			e.forEach(r => {
				let a = r.node
				!(
					s.isJSXExpressionContainer(a) &&
					s.isJSXEmptyExpression(a.expression)
				) &&
					(!s.isJSXText(a) ||
						!/^\s*$/.test(a.extra.raw) ||
						/^ *$/.test(a.extra.raw)) &&
					t++
			}),
			t > 1
		)
	}
	function Ft(e) {
		return (
			(e = e.replace(/\r/g, "")),
			/\n/g.test(e) &&
				(e = e
					.split(
						`
`
					)
					.map((t, r) => (r ? t.replace(/^\s*/g, "") : t))
					.filter(t => !/^\s*$/.test(t))
					.join(" ")),
			e.replace(/\s+/g, " ")
		)
	}
	function G3(e) {
		return e.slice(2).toLowerCase()
	}
	function q3(e) {
		return e.toLowerCase().replace(/-([a-z])/g, (t, r) => r.toUpperCase())
	}
	function H3(e, t) {
		let r = t,
			a
		for (; --r >= 0; ) {
			let n = e[r]
			if (n) {
				if (n.text) {
					a = !0
					break
				}
				if (n.id) return !1
			}
		}
		if (!a) return !1
		for (r = t; ++r < e.length; ) {
			let n = e[r]
			if (n) {
				if (n.text) return !0
				if (n.id) return !1
			}
		}
		return !1
	}
	function Bt(e, t, r) {
		let a = pe(e),
			n = e.node,
			i = K(e, a.memoWrapper),
			l,
			d,
			S
		if (
			s.isConditionalExpression(n) &&
			(de(e.get("consequent"), {checkTags: !0}) ||
				de(e.get("alternate"), {checkTags: !0}))
		)
			(l = de(e.get("test"), {checkMember: !0})),
				l &&
					((d = n.test),
					s.isBinaryExpression(d) ||
						(d = s.unaryExpression(
							"!",
							s.unaryExpression("!", d, !0),
							!0
						)),
					(S = t
						? s.callExpression(i, [s.arrowFunctionExpression([], d)])
						: e.scope.generateUidIdentifier("_c$")),
					(n.test = s.callExpression(S, [])),
					(s.isConditionalExpression(n.consequent) ||
						s.isLogicalExpression(n.consequent)) &&
						(n.consequent = Bt(e.get("consequent"), !0, !0)),
					(s.isConditionalExpression(n.alternate) ||
						s.isLogicalExpression(n.alternate)) &&
						(n.alternate = Bt(e.get("alternate"), !0, !0)))
		else if (s.isLogicalExpression(n)) {
			let g = e
			for (
				;
				g.node.operator !== "&&" && s.isLogicalExpression(g.node.left);

			)
				g = g.get("left")
			g.node.operator === "&&" &&
				de(g.get("right"), {checkTags: !0}) &&
				(l = de(g.get("left"), {checkMember: !0})),
				l &&
					((d = g.node.left),
					s.isBinaryExpression(d) ||
						(d = s.unaryExpression(
							"!",
							s.unaryExpression("!", d, !0),
							!0
						)),
					(S = t
						? s.callExpression(i, [s.arrowFunctionExpression([], d)])
						: e.scope.generateUidIdentifier("_c$")),
					(g.node.left = s.callExpression(S, [])))
		}
		if (l && !t) {
			let g = [
				s.variableDeclaration("var", [
					s.variableDeclarator(
						S,
						a.memoWrapper
							? s.callExpression(i, [s.arrowFunctionExpression([], d)])
							: s.arrowFunctionExpression([], d)
					),
				]),
				s.arrowFunctionExpression([], n),
			]
			return r
				? s.callExpression(
						s.arrowFunctionExpression(
							[],
							s.blockStatement([g[0], s.returnStatement(g[1])])
						),
						[]
				  )
				: g
		}
		return r ? n : s.arrowFunctionExpression([], n)
	}
	function Et(e, t) {
		if (typeof e != "string") return e
		let r = t ? '"' : "<",
			a = t ? "&quot;" : "&lt;",
			n = e.indexOf(r),
			i = e.indexOf("&")
		if (n < 0 && i < 0) return e
		let l = 0,
			d = ""
		for (; n >= 0 && i >= 0; )
			n < i
				? (l < n && (d += e.substring(l, n)),
				  (d += a),
				  (l = n + 1),
				  (n = e.indexOf(r, l)))
				: (l < i && (d += e.substring(l, i)),
				  (d += "&amp;"),
				  (l = i + 1),
				  (i = e.indexOf("&", l)))
		if (n >= 0)
			do
				l < n && (d += e.substring(l, n)),
					(d += a),
					(l = n + 1),
					(n = e.indexOf(r, l))
			while (n >= 0)
		else
			for (; i >= 0; )
				l < i && (d += e.substring(l, i)),
					(d += "&amp;"),
					(l = i + 1),
					(i = e.indexOf("&", l))
		return l < e.length ? d + e.substring(l) : d
	}
	function wt(e) {
		if (s.isJSXIdentifier(e))
			if (s.isValidIdentifier(e.name)) e.type = "Identifier"
			else return s.stringLiteral(e.name)
		else {
			if (s.isJSXMemberExpression(e))
				return s.memberExpression(wt(e.object), wt(e.property))
			if (s.isJSXNamespacedName(e))
				return s.stringLiteral(`${e.namespace.name}:${e.name.name}`)
		}
		return e
	}
	function dc(e, {checkNameSpaces: t} = {}) {
		return !((t && e.includes(":") && U3.has(e.split(":")[0])) || e === "ref")
	}
	var pc = "etaoinshrdlucwmfygpbTAOISWCBvkxjqzPHFMDRELNGUKVYJQZX_$",
		rc = pc.length
	function fc(e) {
		let t = ""
		do {
			let r = e % rc
			;(e = Math.floor(e / rc)), (t = pc[r] + t)
		} while (e !== 0)
		return t
	}
	function li(e) {
		return e.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, t => j3.get(t))
	}
	var j3 = new Map([
			["{", "\\{"],
			["`", "\\`"],
			["\\", "\\\\"],
			[
				`
`,
				"\\n",
			],
			["	", "\\t"],
			["\b", "\\b"],
			["\f", "\\f"],
			["\v", "\\v"],
			["\r", "\\r"],
			["\u2028", "\\u2028"],
			["\u2029", "\\u2029"],
		]),
		Y3 = [
			"a",
			"abbr",
			"acronym",
			"b",
			"bdi",
			"bdo",
			"big",
			"br",
			"button",
			"canvas",
			"cite",
			"code",
			"data",
			"datalist",
			"del",
			"dfn",
			"em",
			"embed",
			"i",
			"iframe",
			"img",
			"input",
			"ins",
			"kbd",
			"label",
			"map",
			"mark",
			"meter",
			"noscript",
			"object",
			"output",
			"picture",
			"progress",
			"q",
			"ruby",
			"s",
			"samp",
			"script",
			"select",
			"slot",
			"small",
			"span",
			"strong",
			"sub",
			"sup",
			"svg",
			"template",
			"textarea",
			"time",
			"u",
			"tt",
			"var",
			"video",
		],
		V3 = [
			"address",
			"article",
			"aside",
			"blockquote",
			"dd",
			"details",
			"dialog",
			"div",
			"dl",
			"dt",
			"fieldset",
			"figcaption",
			"figure",
			"footer",
			"form",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"header",
			"hgroup",
			"hr",
			"li",
			"main",
			"menu",
			"nav",
			"ol",
			"p",
			"pre",
			"section",
			"table",
			"ul",
		],
		K3 = [
			"title",
			"style",
			"a",
			"strong",
			"small",
			"b",
			"u",
			"i",
			"em",
			"s",
			"code",
			"object",
			"table",
			"button",
			"textarea",
			"select",
			"iframe",
			"script",
			"noscript",
			"template",
			"fieldset",
		]
	function X3(e, t) {
		let r = Oe(e.node),
			a = pe(e),
			n = t.topLevel && r != "svg" && Ei.has(r),
			i = lc.indexOf(r) > -1,
			l =
				r.indexOf("-") > -1 ||
				e
					.get("openingElement")
					.get("attributes")
					.some(g => g.node?.name?.name === "is" || g.name?.name === "is"),
			d =
				(r === "img" || r === "iframe") &&
				e
					.get("openingElement")
					.get("attributes")
					.some(g => g.node.name?.name === "loading"),
			S = {
				template: `<${r}`,
				templateWithClosingTags: `<${r}`,
				declarations: [],
				exprs: [],
				dynamics: [],
				postExprs: [],
				isSVG: n,
				hasCustomElement: l,
				isImportNode: d,
				tagName: r,
				renderer: "dom",
				skipTemplate: !1,
			}
		if (
			a.hydratable &&
			(r === "html" || r === "head" || r === "body") &&
			((S.skipTemplate = !0), r === "head" && t.topLevel)
		) {
			let g = K(e, "createComponent", te(e, "dom").moduleName),
				D = K(e, "NoHydration", te(e, "dom").moduleName)
			return (
				S.exprs.push(
					s.expressionStatement(
						s.callExpression(g, [D, s.objectExpression([])])
					)
				),
				S
			)
		}
		if (
			(n &&
				((S.template = "<svg>" + S.template),
				(S.templateWithClosingTags = "<svg>" + S.templateWithClosingTags)),
			t.skipId || (S.id = e.scope.generateUidIdentifier("el$")),
			J3(e, S),
			a.contextToCustomElements && (r === "slot" || l) && $3(e, S),
			(S.template += ">"),
			(S.templateWithClosingTags += ">"),
			!i)
		) {
			let g =
				!t.lastElement ||
				!a.omitLastClosingTag ||
				(t.toBeClosed && (!a.omitNestedClosingTags || t.toBeClosed.has(r)))
			g
				? ((S.toBeClosed = new Set(t.toBeClosed || K3)),
				  S.toBeClosed.add(r),
				  Y3.includes(r) && V3.forEach(D => S.toBeClosed.add(D)))
				: (S.toBeClosed = t.toBeClosed),
				r !== "noscript" && Q3(e, S, a),
				g && (S.template += `</${r}>`),
				(S.templateWithClosingTags += `</${r}>`)
		}
		if (t.topLevel && a.hydratable && S.hasHydratableEvent) {
			let g = K(e, "runHydrationEvents", te(e, "dom").moduleName)
			S.postExprs.push(s.expressionStatement(s.callExpression(g, [])))
		}
		return (
			n &&
				((S.template += "</svg>"), (S.templateWithClosingTags += "</svg>")),
			S
		)
	}
	function nt(
		e,
		t,
		r,
		a,
		{isSVG: n, dynamic: i, prevId: l, isCE: d, tagName: S}
	) {
		let g = pe(e),
			D,
			x
		if (
			((D = r.split(":")) &&
				D[1] &&
				ma.has(D[0]) &&
				((r = D[1]), (x = D[0])),
			x === "style")
		)
			return s.isStringLiteral(a)
				? s.callExpression(
						s.memberExpression(
							s.memberExpression(t, s.identifier("style")),
							s.identifier("setProperty")
						),
						[s.stringLiteral(r), a]
				  )
				: s.isNullLiteral(a) || s.isIdentifier(a, {name: "undefined"})
				? s.callExpression(
						s.memberExpression(
							s.memberExpression(t, s.identifier("style")),
							s.identifier("removeProperty")
						),
						[s.stringLiteral(r)]
				  )
				: s.conditionalExpression(
						s.binaryExpression("!=", a, s.nullLiteral()),
						s.callExpression(
							s.memberExpression(
								s.memberExpression(t, s.identifier("style")),
								s.identifier("setProperty")
							),
							[s.stringLiteral(r), l || a]
						),
						s.callExpression(
							s.memberExpression(
								s.memberExpression(t, s.identifier("style")),
								s.identifier("removeProperty")
							),
							[s.stringLiteral(r)]
						)
				  )
		if (x === "class")
			return s.callExpression(
				s.memberExpression(
					s.memberExpression(t, s.identifier("classList")),
					s.identifier("toggle")
				),
				[
					s.stringLiteral(r),
					i ? a : s.unaryExpression("!", s.unaryExpression("!", a)),
				]
			)
		if (r === "style")
			return s.callExpression(
				K(e, "style", te(e, "dom").moduleName),
				l ? [t, a, l] : [t, a]
			)
		if (!n && r === "class")
			return s.callExpression(K(e, "className", te(e, "dom").moduleName), [
				t,
				a,
			])
		if (r === "classList")
			return s.callExpression(
				K(e, "classList", te(e, "dom").moduleName),
				l ? [t, a, l] : [t, a]
			)
		if (i && r === "textContent")
			return g.hydratable
				? s.callExpression(K(e, "setProperty"), [
						t,
						s.stringLiteral("data"),
						a,
				  ])
				: s.assignmentExpression(
						"=",
						s.memberExpression(t, s.identifier("data")),
						a
				  )
		if (x === "bool")
			return s.callExpression(
				K(e, "setBoolAttribute", te(e, "dom").moduleName),
				[t, s.stringLiteral(r), a]
			)
		let M = mr.has(r),
			w = Ti.has(r),
			U = w3(r, S.toUpperCase())
		if (x !== "attr" && (M || (!n && w) || d || x === "prop"))
			return (
				d && !M && !w && x !== "prop" && (r = q3(r)),
				g.hydratable && x !== "prop"
					? s.callExpression(K(e, "setProperty"), [
							t,
							s.stringLiteral(r),
							a,
					  ])
					: s.assignmentExpression(
							"=",
							s.memberExpression(t, s.identifier(U || r)),
							a
					  )
			)
		let R = r.indexOf(":") > -1
		;(r = mi[r] || r), !n && (r = r.toLowerCase())
		let z = R && k3[r.split(":")[0]]
		return z
			? s.callExpression(K(e, "setAttributeNS", te(e, "dom").moduleName), [
					t,
					s.stringLiteral(z),
					s.stringLiteral(r),
					a,
			  ])
			: s.callExpression(K(e, "setAttribute", te(e, "dom").moduleName), [
					t,
					s.stringLiteral(r),
					a,
			  ])
	}
	function ac(e, t) {
		for (; s.isIdentifier(t); ) {
			let r = e.scope.getBinding(t.name)
			if (r)
				if (s.isVariableDeclarator(r.path.node)) t = r.path.node.init
				else return !!s.isFunctionDeclaration(r.path.node)
			else return !1
		}
		return s.isFunction(t)
	}
	function J3(e, t) {
		let r = t.id,
			a = !1,
			n,
			i,
			l = e.get("openingElement").get("attributes"),
			d = Oe(e.node),
			S = Ei.has(d),
			g = d.includes("-") || l.some(F => F.node.name?.name === "is"),
			D = e.node.children.length > 0,
			x = pe(e)
		l.some(F => s.isJSXSpreadAttribute(F.node)) &&
			(([l, i] = z3(e, l, {
				elem: r,
				isSVG: S,
				hasChildren: D,
				wrapConditionals: x.wrapConditionals,
			})),
			e.get("openingElement").set(
				"attributes",
				l.map(F => F.node)
			),
			(a = !0))
		let M = e
			.get("openingElement")
			.get("attributes")
			.find(
				F =>
					F.node.name &&
					F.node.name.name === "style" &&
					s.isJSXExpressionContainer(F.node.value) &&
					s.isObjectExpression(F.node.value.expression) &&
					!F.node.value.expression.properties.some(V =>
						s.isSpreadElement(V)
					)
			)
		if (M) {
			let F = 0,
				V = M.node.value.expression.leadingComments
			M.node.value.expression.properties.slice().forEach((C, J) => {
				C.computed ||
					(V && (C.value.leadingComments = V),
					e
						.get("openingElement")
						.node.attributes.splice(
							M.key + ++F,
							0,
							s.jsxAttribute(
								s.jsxNamespacedName(
									s.jsxIdentifier("style"),
									s.jsxIdentifier(
										s.isIdentifier(C.key) ? C.key.name : C.key.value
									)
								),
								s.jsxExpressionContainer(C.value)
							)
						),
					M.node.value.expression.properties.splice(J - F - 1, 1))
			}),
				M.node.value.expression.properties.length ||
					e.get("openingElement").node.attributes.splice(M.key, 1)
		}
		l = e.get("openingElement").get("attributes")
		let w = l.find(
			F =>
				F.node.name &&
				F.node.name.name === "classList" &&
				s.isJSXExpressionContainer(F.node.value) &&
				s.isObjectExpression(F.node.value.expression) &&
				!F.node.value.expression.properties.some(
					V =>
						s.isSpreadElement(V) ||
						V.computed ||
						(s.isStringLiteral(V.key) &&
							(V.key.value.includes(" ") || V.key.value.includes(":")))
				)
		)
		if (w) {
			let F = 0,
				V = w.node.value.expression.leadingComments,
				C = w.get("value").get("expression").get("properties")
			C.slice().forEach((J, ae) => {
				let Q = J.node,
					{confident: ee, value: ie} = J.get("value").evaluate()
				V && (Q.value.leadingComments = V),
					ee
						? ie &&
						  e
								.get("openingElement")
								.node.attributes.splice(
									w.key + ++F,
									0,
									s.jsxAttribute(
										s.jsxIdentifier("class"),
										s.stringLiteral(
											s.isIdentifier(Q.key)
												? Q.key.name
												: Q.key.value
										)
									)
								)
						: e
								.get("openingElement")
								.node.attributes.splice(
									w.key + ++F,
									0,
									s.jsxAttribute(
										s.jsxNamespacedName(
											s.jsxIdentifier("class"),
											s.jsxIdentifier(
												s.isIdentifier(Q.key)
													? Q.key.name
													: Q.key.value
											)
										),
										s.jsxExpressionContainer(Q.value)
									)
								),
					C.splice(ae - F - 1, 1)
			}),
				C.length || e.get("openingElement").node.attributes.splice(w.key, 1)
		}
		l = e.get("openingElement").get("attributes")
		let U = l.filter(
			F =>
				F.node.name &&
				(F.node.name.name === "class" || F.node.name.name === "className")
		)
		if (U.length > 1) {
			let F = U[0].node,
				V = [],
				C = [s.templateElement({raw: ""})]
			for (let J = 0; J < U.length; J++) {
				let ae = U[J].node,
					Q = J === U.length - 1
				if (s.isJSXExpressionContainer(ae.value))
					V.push(
						s.logicalExpression(
							"||",
							ae.value.expression,
							s.stringLiteral("")
						)
					),
						C.push(s.templateElement({raw: Q ? "" : " "}))
				else {
					let ee = C.pop()
					C.push(
						s.templateElement({
							raw:
								(ee ? ee.value.raw : "") +
								`${ae.value.value}` +
								(Q ? "" : " "),
						})
					)
				}
				J && l.splice(l.indexOf(U[J]), 1)
			}
			V.length
				? (F.value = s.jsxExpressionContainer(s.templateLiteral(C, V)))
				: (F.value = s.stringLiteral(C[0].value.raw))
		}
		e.get("openingElement").set(
			"attributes",
			l.map(F => F.node)
		)
		let R = !0
		function z(F, V, C, J) {
			if (
				(!F && (V = V.toLowerCase()),
				(C.template += `${R ? " " : ""}${V}`),
				!J)
			) {
				R = !0
				return
			}
			let ae = J.value
			typeof ae == "number" && (ae = String(ae))
			let Q = !x.omitQuotes
			if (
				((V === "style" || V === "class") &&
					((ae = Ft(ae)),
					V === "style" &&
						(ae = ae.replace(/; /g, ";").replace(/: /g, ":"))),
				!ae.length)
			) {
				;(R = !0), (C.template += "")
				return
			}
			for (let ee = 0, ie = ae.length; ee < ie; ee++) {
				let Me = ae[ee]
				;(Me === "'" ||
					Me === '"' ||
					Me === " " ||
					Me === "	" ||
					Me ===
						`
` ||
					Me === "\r" ||
					Me === "`" ||
					Me === "=" ||
					Me === "<" ||
					Me === ">") &&
					(Q = !0)
			}
			Q
				? ((R = !1), (C.template += `="${Et(ae, !0)}"`))
				: ((R = !0), (C.template += `=${Et(ae, !0)}`))
		}
		e
			.get("openingElement")
			.get("attributes")
			.forEach(F => {
				let V = F.node,
					C = V.value,
					J = s.isJSXNamespacedName(V.name)
						? `${V.name.namespace.name}:${V.name.name.name}`
						: V.name.name,
					ae =
						s.isJSXNamespacedName(V.name) && ma.has(V.name.namespace.name)
				if (s.isJSXExpressionContainer(C) && !J.startsWith("use:")) {
					let Q = F.get("value").get("expression").evaluate().value,
						ee
					Q !== void 0 &&
						((ee = typeof Q) == "string" || ee === "number") &&
						(ee === "number" && (Ti.has(J) || J.startsWith("prop:"))
							? (C = s.jsxExpressionContainer(s.numericLiteral(Q)))
							: (C = s.stringLiteral(String(Q))))
				}
				if (
					(s.isJSXNamespacedName(V.name) &&
						ae &&
						!s.isJSXExpressionContainer(C) &&
						(V.value = C =
							s.jsxExpressionContainer(C || s.jsxEmptyExpression())),
					s.isJSXExpressionContainer(C) &&
						(ae ||
							!(
								s.isStringLiteral(C.expression) ||
								s.isNumericLiteral(C.expression)
							)))
				)
					if (J === "ref") {
						for (
							;
							s.isTSNonNullExpression(C.expression) ||
							s.isTSAsExpression(C.expression);

						)
							C.expression = C.expression.expression
						let Q,
							ee =
								s.isIdentifier(C.expression) &&
								(Q = e.scope.getBinding(C.expression.name)) &&
								(Q.kind === "const" || Q.kind === "module")
						if (!ee && s.isLVal(C.expression)) {
							let ie = e.scope.generateUidIdentifier("_ref$")
							t.exprs.unshift(
								s.variableDeclaration("var", [
									s.variableDeclarator(ie, C.expression),
								]),
								s.expressionStatement(
									s.conditionalExpression(
										s.binaryExpression(
											"===",
											s.unaryExpression("typeof", ie),
											s.stringLiteral("function")
										),
										s.callExpression(
											K(e, "use", te(e, "dom").moduleName),
											[ie, r]
										),
										s.assignmentExpression("=", C.expression, r)
									)
								)
							)
						} else if (ee || s.isFunction(C.expression))
							t.exprs.unshift(
								s.expressionStatement(
									s.callExpression(
										K(e, "use", te(e, "dom").moduleName),
										[C.expression, r]
									)
								)
							)
						else {
							let ie = e.scope.generateUidIdentifier("_ref$")
							t.exprs.unshift(
								s.variableDeclaration("var", [
									s.variableDeclarator(ie, C.expression),
								]),
								s.expressionStatement(
									s.logicalExpression(
										"&&",
										s.binaryExpression(
											"===",
											s.unaryExpression("typeof", ie),
											s.stringLiteral("function")
										),
										s.callExpression(
											K(e, "use", te(e, "dom").moduleName),
											[ie, r]
										)
									)
								)
							)
						}
					} else if (J.startsWith("use:"))
						(V.name.name.type = "Identifier"),
							t.exprs.unshift(
								s.expressionStatement(
									s.callExpression(
										K(e, "use", te(e, "dom").moduleName),
										[
											V.name.name,
											r,
											s.arrowFunctionExpression(
												[],
												s.isJSXEmptyExpression(C.expression)
													? s.booleanLiteral(!0)
													: C.expression
											),
										]
									)
								)
							)
					else if (J === "children") n = C
					else if (J.startsWith("on")) {
						let Q = G3(J)
						if (J.startsWith("on:")) {
							let ee = [
								r,
								s.stringLiteral(J.split(":")[1]),
								C.expression,
							]
							t.exprs.unshift(
								s.expressionStatement(
									s.callExpression(
										K(e, "addEventListener", te(e, "dom").moduleName),
										ee
									)
								)
							)
						} else if (J.startsWith("oncapture:")) {
							let ee = [
								s.stringLiteral(J.split(":")[1]),
								C.expression,
								s.booleanLiteral(!0),
							]
							t.exprs.push(
								s.expressionStatement(
									s.callExpression(
										s.memberExpression(
											r,
											s.identifier("addEventListener")
										),
										ee
									)
								)
							)
						} else if (
							x.delegateEvents &&
							(F3.has(Q) || x.delegatedEvents.indexOf(Q) !== -1)
						) {
							;(a = !0),
								(
									F.scope.getProgramParent().data.events ||
									(F.scope.getProgramParent().data.events = new Set())
								).add(Q)
							let ie = C.expression,
								Me = ac(F, ie)
							s.isArrayExpression(ie)
								? (ie.elements.length > 1 &&
										t.exprs.unshift(
											s.expressionStatement(
												s.assignmentExpression(
													"=",
													s.memberExpression(
														r,
														s.identifier(`$$${Q}Data`)
													),
													ie.elements[1]
												)
											)
										),
								  (ie = ie.elements[0]),
								  t.exprs.unshift(
										s.expressionStatement(
											s.assignmentExpression(
												"=",
												s.memberExpression(
													r,
													s.identifier(`$$${Q}`)
												),
												ie
											)
										)
								  ))
								: s.isFunction(ie) || Me
								? t.exprs.unshift(
										s.expressionStatement(
											s.assignmentExpression(
												"=",
												s.memberExpression(
													r,
													s.identifier(`$$${Q}`)
												),
												ie
											)
										)
								  )
								: t.exprs.unshift(
										s.expressionStatement(
											s.callExpression(
												K(
													e,
													"addEventListener",
													te(e, "dom").moduleName
												),
												[
													r,
													s.stringLiteral(Q),
													ie,
													s.booleanLiteral(!0),
												]
											)
										)
								  )
						} else {
							let ee = C.expression,
								ie = ac(F, ee)
							s.isArrayExpression(ee)
								? (ee.elements.length > 1
										? (ee = s.arrowFunctionExpression(
												[s.identifier("e")],
												s.callExpression(ee.elements[0], [
													ee.elements[1],
													s.identifier("e"),
												])
										  ))
										: (ee = ee.elements[0]),
								  t.exprs.unshift(
										s.expressionStatement(
											s.callExpression(
												s.memberExpression(
													r,
													s.identifier("addEventListener")
												),
												[s.stringLiteral(Q), ee]
											)
										)
								  ))
								: s.isFunction(ee) || ie
								? t.exprs.unshift(
										s.expressionStatement(
											s.callExpression(
												s.memberExpression(
													r,
													s.identifier("addEventListener")
												),
												[s.stringLiteral(Q), ee]
											)
										)
								  )
								: t.exprs.unshift(
										s.expressionStatement(
											s.callExpression(
												K(
													e,
													"addEventListener",
													te(e, "dom").moduleName
												),
												[r, s.stringLiteral(Q), ee]
											)
										)
								  )
						}
					} else if (
						x.effectWrapper &&
						(de(F.get("value").get("expression"), {checkMember: !0}) ||
							((J === "classList" || J === "style") &&
								!F.get("value").get("expression").evaluate().confident))
					) {
						let Q = r
						if (J === "value" || J === "checked") {
							let ee = K(e, x.effectWrapper)
							t.postExprs.push(
								s.expressionStatement(
									s.callExpression(ee, [
										s.arrowFunctionExpression(
											[],
											nt(e, r, J, C.expression, {
												tagName: d,
												isSVG: S,
												isCE: g,
											})
										),
									])
								)
							)
							return
						}
						J === "textContent" &&
							((Q = F.scope.generateUidIdentifier("el$")),
							(n = s.jsxText(" ")),
							(n.extra = {raw: " ", rawValue: " "}),
							t.declarations.push(
								s.variableDeclarator(
									Q,
									s.memberExpression(r, s.identifier("firstChild"))
								)
							)),
							t.dynamics.push({
								elem: Q,
								key: J,
								value: C.expression,
								isSVG: S,
								isCE: g,
								tagName: d,
							})
					} else if (J.slice(0, 5) === "attr:")
						s.isJSXExpressionContainer(C) && (C = C.expression),
							J !== "attr:onclick" &&
							(s.isStringLiteral(C) || s.isNumericLiteral(C))
								? z(S, J.slice(5), t, C)
								: t.exprs.push(
										s.expressionStatement(
											nt(F, r, J, C, {isSVG: S, isCE: g, tagName: d})
										)
								  )
					else if (J.slice(0, 5) === "bool:") {
						let ee = function () {
								;(t.template += `${R ? " " : ""}${J.slice(5)}`),
									(R = !0)
							},
							Q = C
						switch (
							(s.isJSXExpressionContainer(Q) && (Q = Q.expression),
							Q.type)
						) {
							case "StringLiteral": {
								Q.value.length && Q.value !== "0" && ee()
								return
							}
							case "NullLiteral":
								return
							case "BooleanLiteral": {
								Q.value && ee()
								return
							}
							case "Identifier": {
								if (Q.name === "undefined") return
								break
							}
						}
						t.exprs.push(
							s.expressionStatement(
								nt(
									F,
									r,
									J,
									s.isJSXExpressionContainer(C) ? C.expression : C,
									{isSVG: S, isCE: g, tagName: d}
								)
							)
						)
					} else
						t.exprs.push(
							s.expressionStatement(
								nt(F, r, J, C.expression, {
									isSVG: S,
									isCE: g,
									tagName: d,
								})
							)
						)
				else {
					if (x.hydratable && J === "$ServerOnly") {
						t.skipTemplate = !0
						return
					}
					s.isJSXExpressionContainer(C) && (C = C.expression),
						(J = mi[J] || J),
						C && mr.has(J)
							? t.exprs.push(
									s.expressionStatement(
										nt(F, r, J, C, {isSVG: S, isCE: g, tagName: d})
									)
							  )
							: z(S, J, t, C)
				}
			}),
			!D && n && e.node.children.push(n),
			i && t.exprs.push(i),
			(t.hasHydratableEvent = t.hasHydratableEvent || a)
	}
	function W3(e, t) {
		let r = -1,
			a
		for (let n = e.length - 1; n >= 0; n--) {
			let i = e[n].node
			if (
				t ||
				s.isJSXText(i) ||
				fa(e[n]) !== !1 ||
				(s.isJSXElement(i) && (a = Oe(i)) && !it(a))
			) {
				r = n
				break
			}
		}
		return r
	}
	function Q3(e, t, r) {
		let a = t.id && t.id.name,
			n = Oe(e.node),
			i,
			l = [],
			d = 0,
			S = yt(e.get("children")),
			g = W3(S, r.hydratable),
			D = S.reduce((x, M, w) => {
				if (M.isJSXFragment())
					throw new Error(
						`Fragments can only be used top level in JSX. Not used under a <${n}>.`
					)
				let U = ut(M, {
					toBeClosed: t.toBeClosed,
					lastElement: w === g,
					skipId: !t.id || !mc(S, w, r),
				})
				if (!U) return x
				let R = x.length
				return (
					U.text && R && x[R - 1].text
						? ((x[R - 1].template += U.template),
						  (x[R - 1].templateWithClosingTags +=
								U.templateWithClosingTags || U.template))
						: x.push(U),
					x
				)
			}, [])
		D.forEach((x, M) => {
			if (x) {
				if (x.tagName && x.renderer !== "dom")
					throw new Error(`<${x.tagName}> is not supported in <${n}>.
      Wrap the usage with a component that would render this element, eg. Canvas`)
				if (
					((t.template += x.template),
					(t.templateWithClosingTags +=
						x.templateWithClosingTags || x.template),
					(t.isImportNode = t.isImportNode || x.isImportNode),
					x.id)
				) {
					if (x.tagName === "head") {
						if (r.hydratable) {
							let R = K(e, "createComponent", te(e, "dom").moduleName),
								z = K(e, "NoHydration", te(e, "dom").moduleName)
							t.exprs.push(
								s.expressionStatement(
									s.callExpression(R, [z, s.objectExpression([])])
								)
							)
						}
						return
					}
					let w
					r.hydratable &&
						n === "html" &&
						(w = K(e, "getNextMatch", te(e, "dom").moduleName))
					let U = s.memberExpression(
						s.identifier(a),
						s.identifier(d === 0 ? "firstChild" : "nextSibling")
					)
					t.declarations.push(
						s.variableDeclarator(
							x.id,
							r.hydratable && n === "html"
								? s.callExpression(w, [U, s.stringLiteral(x.tagName)])
								: U
						)
					),
						t.declarations.push(...x.declarations),
						t.exprs.push(...x.exprs),
						t.dynamics.push(...x.dynamics),
						l.push(...x.postExprs),
						(t.hasHydratableEvent =
							t.hasHydratableEvent || x.hasHydratableEvent),
						(t.hasCustomElement =
							t.hasCustomElement || x.hasCustomElement),
						(t.isImportNode = t.isImportNode || x.isImportNode),
						(a = x.id.name),
						(i = null),
						d++
				} else if (x.exprs.length) {
					let w = K(e, "insert", te(e, "dom").moduleName),
						U = Ea(S),
						R = r.hydratable && U
					if (R || H3(D, M)) {
						let z, F
						R && (a = nc(e, t, a, d++, "$")[0].name),
							i ? (z = i) : ([z, F] = nc(e, t, a, d++, R ? "/" : "")),
							R || (i = z),
							t.exprs.push(
								s.expressionStatement(
									s.callExpression(
										w,
										F
											? [t.id, x.exprs[0], z, F]
											: [t.id, x.exprs[0], z]
									)
								)
							),
							(a = z.name)
					} else
						U
							? t.exprs.push(
									s.expressionStatement(
										s.callExpression(w, [
											t.id,
											x.exprs[0],
											Tc(D, M) || s.nullLiteral(),
										])
									)
							  )
							: t.exprs.push(
									s.expressionStatement(
										s.callExpression(w, [t.id, x.exprs[0]])
									)
							  )
				} else i = null
			}
		}),
			t.postExprs.unshift(...l)
	}
	function nc(e, t, r, a, n) {
		let i = e.scope.generateUidIdentifier("el$"),
			l = pe(e),
			d
		return (
			(t.template += `<!${n}>`),
			(t.templateWithClosingTags += `<!${n}>`),
			l.hydratable && n === "/"
				? ((d = e.scope.generateUidIdentifier("co$")),
				  t.declarations.push(
						s.variableDeclarator(
							s.arrayPattern([i, d]),
							s.callExpression(
								K(e, "getNextMarker", te(e, "dom").moduleName),
								[
									s.memberExpression(
										s.identifier(r),
										s.identifier("nextSibling")
									),
								]
							)
						)
				  ))
				: t.declarations.push(
						s.variableDeclarator(
							i,
							s.memberExpression(
								s.identifier(r),
								s.identifier(a === 0 ? "firstChild" : "nextSibling")
							)
						)
				  ),
			[i, d]
		)
	}
	function Tc(e, t) {
		return e[t + 1] && (e[t + 1].id || Tc(e, t + 1))
	}
	function mc(e, t, r) {
		if (e[t - 1]) {
			let a = e[t - 1].node
			if (
				s.isJSXExpressionContainer(a) &&
				!s.isJSXEmptyExpression(a.expression) &&
				fa(e[t - 1]) === !1
			)
				return !0
			let n
			if (s.isJSXElement(a) && (n = Oe(a)) && it(n)) return !0
		}
		for (let a = t; a < e.length; a++) {
			let n = e[a].node
			if (s.isJSXExpressionContainer(n)) {
				if (!s.isJSXEmptyExpression(n.expression) && fa(e[a]) === !1)
					return !0
			} else if (s.isJSXElement(n)) {
				let i = Oe(n)
				if (
					it(i) ||
					(r.contextToCustomElements &&
						(i === "slot" ||
							i.indexOf("-") > -1 ||
							n.openingElement.attributes.some(
								d => d.name?.name === "is"
							))) ||
					n.openingElement.attributes.some(
						d =>
							s.isJSXSpreadAttribute(d) ||
							["textContent", "innerHTML", "innerText"].includes(
								d.name.name
							) ||
							(d.name.namespace &&
								(d.name.namespace.name === "use" ||
									d.name.namespace.name === "prop")) ||
							(s.isJSXExpressionContainer(d.value) &&
								!(
									s.isStringLiteral(d.value.expression) ||
									s.isNumericLiteral(d.value.expression)
								))
					)
				)
					return !0
				let l = yt(e[a].get("children"))
				if (l.length && mc(l, 0, r)) return !0
			}
		}
	}
	function $3(e, t) {
		t.exprs.push(
			s.expressionStatement(
				s.assignmentExpression(
					"=",
					s.memberExpression(t.id, s.identifier("_$owner")),
					s.callExpression(K(e, "getOwner", te(e, "dom").moduleName), [])
				)
			)
		)
	}
	function z3(e, t, {elem: r, isSVG: a, hasChildren: n, wrapConditionals: i}) {
		let l = [],
			d = [],
			S = [],
			g = !1,
			D = !1
		t.forEach(M => {
			let w = M.node,
				U =
					!s.isJSXSpreadAttribute(w) &&
					(s.isJSXNamespacedName(w.name)
						? `${w.name.namespace.name}:${w.name.name.name}`
						: w.name.name)
			if (s.isJSXSpreadAttribute(w))
				(D = !0),
					S.length && (d.push(s.objectExpression(S)), (S = [])),
					d.push(
						de(M.get("argument"), {checkMember: !0}) && (g = !0)
							? s.isCallExpression(w.argument) &&
							  !w.argument.arguments.length &&
							  !s.isCallExpression(w.argument.callee) &&
							  !s.isMemberExpression(w.argument.callee)
								? w.argument.callee
								: s.arrowFunctionExpression([], w.argument)
							: w.argument
					)
			else if (
				(D ||
					(s.isJSXExpressionContainer(w.value) &&
						de(M.get("value").get("expression"), {checkMember: !0}))) &&
				dc(U, {checkNameSpaces: !0})
			) {
				let R = s.isJSXExpressionContainer(w.value)
				if (R && de(M.get("value").get("expression"), {checkMember: !0})) {
					let F = wt(w.name),
						V =
							i &&
							(s.isLogicalExpression(w.value.expression) ||
								s.isConditionalExpression(w.value.expression))
								? Bt(M.get("value").get("expression"), !0)
								: s.arrowFunctionExpression([], w.value.expression)
					S.push(
						s.objectMethod(
							"get",
							F,
							[],
							s.blockStatement([s.returnStatement(V.body)]),
							!s.isValidIdentifier(U)
						)
					)
				} else
					S.push(
						s.objectProperty(
							s.stringLiteral(U),
							R
								? w.value.expression
								: w.value ||
										(Ti.has(U)
											? s.booleanLiteral(!0)
											: s.stringLiteral(""))
						)
					)
			} else l.push(M)
		}),
			S.length && d.push(s.objectExpression(S))
		let x =
			d.length === 1 && !g ? d[0] : s.callExpression(K(e, "mergeProps"), d)
		return [
			l,
			s.expressionStatement(
				s.callExpression(K(e, "spread", te(e, "dom").moduleName), [
					r,
					x,
					s.booleanLiteral(a),
					s.booleanLiteral(n),
				])
			),
		]
	}
	function Z3(e, t, r) {
		let a = pe(e)
		return t.id
			? (tL(e, t),
			  !(t.exprs.length || t.dynamics.length || t.postExprs.length) &&
			  t.decl.declarations.length === 1
					? t.decl.declarations[0].init
					: s.callExpression(
							s.arrowFunctionExpression(
								[],
								s.blockStatement([
									t.decl,
									...t.exprs.concat(
										rL(e, t.dynamics) || [],
										t.postExprs || []
									),
									s.returnStatement(t.id),
								])
							),
							[]
					  ))
			: r && t.dynamic && a.memoWrapper
			? s.callExpression(K(e, a.memoWrapper), [t.exprs[0]])
			: t.exprs[0]
	}
	function eL(e, t) {
		let r = t.map(a => {
			let n = {cooked: a.template, raw: li(a.template)},
				i = a.isCE || a.isImportNode,
				l =
					/^<(math|annotation|annotation-xml|maction|math|merror|mfrac|mi|mmultiscripts|mn|mo|mover|mpadded|mphantom|mprescripts|mroot|mrow|ms|mspace|msqrt|mstyle|msub|msubsup|msup|mtable|mtd|mtext|mtr|munder|munderover|semantics|menclose|mfenced)(\s|>)/.test(
						a.template
					)
			return s.variableDeclarator(
				a.id,
				s.addComment(
					s.callExpression(
						K(e, "template", te(e, "dom").moduleName),
						[s.templateLiteral([s.templateElement(n, !0)], [])].concat(
							a.isSVG || i || l
								? [
										s.booleanLiteral(!!i),
										s.booleanLiteral(a.isSVG),
										s.booleanLiteral(l),
								  ]
								: []
						)
					),
					"leading",
					"#__PURE__"
				)
			)
		})
		e.node.body.unshift(s.variableDeclaration("var", r))
	}
	function tL(e, t) {
		let {hydratable: r} = pe(e),
			a
		if (t.template.length) {
			let n, i
			if (!t.skipTemplate) {
				let l =
					e.scope.getProgramParent().data.templates ||
					(e.scope.getProgramParent().data.templates = [])
				;(n = l.find(d => d.template === t.template))
					? (i = n.id)
					: ((i = e.scope.generateUidIdentifier("tmpl$")),
					  l.push({
							id: i,
							template: t.template,
							templateWithClosingTags: t.templateWithClosingTags,
							isSVG: t.isSVG,
							isCE: t.hasCustomElement,
							isImportNode: t.isImportNode,
							renderer: "dom",
					  }))
			}
			a = s.variableDeclarator(
				t.id,
				r
					? s.callExpression(
							K(e, "getNextElement", te(e, "dom").moduleName),
							i ? [i] : []
					  )
					: s.callExpression(i, [])
			)
		}
		t.declarations.unshift(a),
			(t.decl = s.variableDeclaration("var", t.declarations))
	}
	function rL(e, t) {
		if (!t.length) return
		let r = pe(e),
			a = K(e, r.effectWrapper)
		if (t.length === 1) {
			let S,
				g =
					t[0].key === "classList" ||
					t[0].key === "style" ||
					(S = t[0].key.startsWith("style:"))
						? s.identifier("_$p")
						: void 0
			return (
				S
					? (t[0].value = s.assignmentExpression("=", g, t[0].value))
					: t[0].key.startsWith("class:") &&
					  !s.isBooleanLiteral(t[0].value) &&
					  !s.isUnaryExpression(t[0].value) &&
					  (t[0].value = s.unaryExpression(
							"!",
							s.unaryExpression("!", t[0].value)
					  )),
				s.expressionStatement(
					s.callExpression(a, [
						s.arrowFunctionExpression(
							g ? [g] : [],
							nt(e, t[0].elem, t[0].key, t[0].value, {
								isSVG: t[0].isSVG,
								isCE: t[0].isCE,
								tagName: t[0].tagName,
								dynamic: !0,
								prevId: g,
							})
						),
					])
				)
			)
		}
		let n = s.identifier("_p$"),
			i = [],
			l = [],
			d = []
		return (
			t.forEach(
				({elem: S, key: g, value: D, isSVG: x, isCE: M, tagName: w}, U) => {
					let R = e.scope.generateUidIdentifier("v$"),
						z = s.identifier(fc(U)),
						F = s.memberExpression(n, z)
					if (
						(g.startsWith("class:") &&
							!s.isBooleanLiteral(D) &&
							!s.isUnaryExpression(D) &&
							(D = s.unaryExpression("!", s.unaryExpression("!", D))),
						d.push(z),
						i.push(s.variableDeclarator(R, D)),
						g === "classList" || g === "style")
					)
						l.push(
							s.expressionStatement(
								s.assignmentExpression(
									"=",
									F,
									nt(e, S, g, R, {
										isSVG: x,
										isCE: M,
										tagName: w,
										dynamic: !0,
										prevId: F,
									})
								)
							)
						)
					else {
						let V = g.startsWith("style:") ? R : void 0
						l.push(
							s.expressionStatement(
								s.logicalExpression(
									"&&",
									s.binaryExpression("!==", R, F),
									nt(e, S, g, s.assignmentExpression("=", F, R), {
										isSVG: x,
										isCE: M,
										tagName: w,
										dynamic: !0,
										prevId: V,
									})
								)
							)
						)
					}
				}
			),
			s.expressionStatement(
				s.callExpression(a, [
					s.arrowFunctionExpression(
						[n],
						s.blockStatement([
							s.variableDeclaration("var", i),
							...l,
							s.returnStatement(n),
						])
					),
					s.objectExpression(
						d.map(S => s.objectProperty(S, s.identifier("undefined")))
					),
				])
			)
		)
	}
	function yi(e, t) {
		if (!t.template) return t.exprs[0]
		let r, a
		if (!Array.isArray(t.template)) r = s.stringLiteral(t.template)
		else if (t.template.length === 1) r = s.stringLiteral(t.template[0])
		else {
			let l = t.template.map(d => s.stringLiteral(d))
			r = s.arrayExpression(l)
		}
		let n =
				e.scope.getProgramParent().data.templates ||
				(e.scope.getProgramParent().data.templates = []),
			i = n.find(l =>
				s.isArrayExpression(l.template) && s.isArrayExpression(r)
					? l.template.elements.every(
							(d, S) => r.elements[S] && d.value === r.elements[S].value
					  )
					: l.template.value === r.value
			)
		if (
			(i
				? (a = i.id)
				: ((a = e.scope.generateUidIdentifier("tmpl$")),
				  n.push({
						id: a,
						template: r,
						templateWithClosingTags: r,
						renderer: "ssr",
				  })),
			t.wontEscape)
		) {
			if (!Array.isArray(t.template) || t.template.length === 1) return a
			if (
				Array.isArray(t.template) &&
				t.template.length === 2 &&
				t.templateValues[0].type === "CallExpression" &&
				t.templateValues[0].callee.name === "_$ssrHydrationKey"
			)
				return s.binaryExpression(
					"+",
					s.binaryExpression(
						"+",
						s.memberExpression(a, s.numericLiteral(0), !0),
						t.templateValues[0]
					),
					s.memberExpression(a, s.numericLiteral(1), !0)
				)
		}
		return s.callExpression(
			K(e, "ssr"),
			Array.isArray(t.template) && t.template.length > 1
				? [a, ...t.templateValues]
				: [a]
		)
	}
	function aL(e, t) {
		let r = t.map(a => s.variableDeclarator(a.id, a.template))
		e.node.body.unshift(s.variableDeclaration("var", r))
	}
	function st(e, t) {
		let r
		Array.isArray(t) && ([t, ...r] = t),
			(e[e.length - 1] += t),
			r && r.length && e.push.apply(e, r)
	}
	function Ec(e, t) {
		let r = pe(e),
			a = Oe(e.node)
		if (
			((a === "script" || a === "style") && (e.doNotEscape = !0),
			e.node.openingElement.attributes.some(l => s.isJSXSpreadAttribute(l)))
		)
			return uL(e, {...t, ...r})
		let n = lc.indexOf(a) > -1,
			i = {
				template: [`<${a}`],
				templateValues: [],
				declarations: [],
				exprs: [],
				dynamics: [],
				tagName: a,
				wontEscape: e.node.wontEscape,
				renderer: "ssr",
			}
		if (t.topLevel && r.hydratable) {
			if (a === "head") {
				K(e, "NoHydration"), K(e, "createComponent")
				let l = Ec(e, {...t, topLevel: !1})
				return (
					(i.template = ""),
					(i.templateWithClosingTags = ""),
					i.exprs.push(
						s.callExpression(s.identifier("_$createComponent"), [
							s.identifier("_$NoHydration"),
							s.objectExpression([
								s.objectMethod(
									"get",
									s.identifier("children"),
									[],
									s.blockStatement([s.returnStatement(yi(e, l))])
								),
							]),
						])
					),
					i
				)
			}
			i.template.push(""),
				i.templateValues.push(s.callExpression(K(e, "ssrHydrationKey"), []))
		}
		return (
			sL(e, i, {...r, ...t}),
			st(i.template, ">"),
			n || (iL(e, i, {...r, ...t}), st(i.template, `</${a}>`)),
			i
		)
	}
	function ci(e, t) {
		return (e = mi[e] || e), !t && (e = e.toLowerCase()), e
	}
	function nL(e, t, r, a, n) {
		let i
		;(i = r.split(":")) && i[1] && ma.has(i[0]) && ((r = i[1]), i[0]),
			(r = ci(r, n))
		let l = s.callExpression(K(e, "ssrAttribute"), [
			s.stringLiteral(r),
			a,
			s.booleanLiteral(!1),
		])
		if (t.template[t.template.length - 1].length)
			t.template.push(""), t.templateValues.push(l)
		else {
			let d = t.templateValues.length - 1
			t.templateValues[d] = s.binaryExpression("+", t.templateValues[d], l)
		}
	}
	function Ne(e, t, r, a) {
		if (
			s.isStringLiteral(t) ||
			s.isNumericLiteral(t) ||
			(s.isTemplateLiteral(t) && t.expressions.length === 0)
		) {
			if (a) {
				if (s.isStringLiteral(t)) return s.stringLiteral(Et(t.value, r))
				if (s.isTemplateLiteral(t))
					return s.stringLiteral(Et(t.quasis[0].value.raw, r))
			}
			return t
		} else {
			if (s.isFunction(t))
				return (
					s.isBlockStatement(t.body)
						? (t.body.body = t.body.body.map(
								n => (
									s.isReturnStatement(n) &&
										(n.argument = Ne(e, n.argument, r, a)),
									n
								)
						  ))
						: (t.body = Ne(e, t.body, r, a)),
					t
				)
			if (s.isTemplateLiteral(t))
				return (t.expressions = t.expressions.map(n => Ne(e, n, r, a))), t
			if (s.isUnaryExpression(t)) return t
			if (s.isBinaryExpression(t))
				return (
					(t.left = Ne(e, t.left, r, a)),
					(t.right = Ne(e, t.right, r, a)),
					t
				)
			if (s.isConditionalExpression(t))
				return (
					(t.consequent = Ne(e, t.consequent, r, a)),
					(t.alternate = Ne(e, t.alternate, r, a)),
					t
				)
			if (s.isLogicalExpression(t))
				return (
					(t.right = Ne(e, t.right, r, a)),
					t.operator !== "&&" && (t.left = Ne(e, t.left, r, a)),
					t
				)
			if (s.isCallExpression(t) && s.isFunction(t.callee))
				return (
					s.isBlockStatement(t.callee.body)
						? (t.callee.body.body = t.callee.body.body.map(
								n => (
									s.isReturnStatement(n) &&
										(n.argument = Ne(e, n.argument, r, a)),
									n
								)
						  ))
						: (t.callee.body = Ne(e, t.callee.body, r, a)),
					t
				)
			if (s.isJSXElement(t) && !it(Oe(t))) return (t.wontEscape = !0), t
		}
		return s.callExpression(
			K(e, "escape"),
			[t].concat(r ? [s.booleanLiteral(!0)] : [])
		)
	}
	function sc(e, t, r) {
		let a = [],
			n = t.find(i => i.node.name.name === e)
		for (let i = 0; i < r.length; i++) {
			let l = r[i].node,
				d = !s.isValidIdentifier(l.name.name.name)
			d || (l.name.name.type = "Identifier"),
				a.push(
					s.objectProperty(
						d ? s.stringLiteral(l.name.name.name) : l.name.name,
						s.isJSXExpressionContainer(l.value)
							? l.value.expression
							: l.value
					)
				),
				(n || i) && t.splice(r[i].key, 1)
		}
		n &&
		s.isJSXExpressionContainer(n.node.value) &&
		s.isObjectExpression(n.node.value.expression)
			? n.node.value.expression.properties.push(...a)
			: (r[0].node = s.jsxAttribute(
					s.jsxIdentifier(e),
					s.jsxExpressionContainer(s.objectExpression(a))
			  ))
	}
	function yc(e) {
		let t = e.get("openingElement").get("attributes"),
			r = t.filter(
				i =>
					s.isJSXNamespacedName(i.node.name) &&
					i.node.name.namespace.name === "style"
			),
			a = t.filter(
				i =>
					s.isJSXNamespacedName(i.node.name) &&
					i.node.name.namespace.name === "class"
			)
		a.length && sc("classList", t, a)
		let n = t.filter(
			i =>
				i.node.name &&
				(i.node.name.name === "class" ||
					i.node.name.name === "className" ||
					i.node.name.name === "classList")
		)
		if (n.length > 1) {
			let i = n[0].node,
				l = [],
				d = [s.templateElement({raw: ""})]
			for (let S = 0; S < n.length; S++) {
				let g = n[S].node,
					D = S === n.length - 1
				if (s.isJSXExpressionContainer(g.value)) {
					let x = g.value.expression
					if (g.name.name === "classList") {
						if (
							s.isObjectExpression(x) &&
							!x.properties.some(M => s.isSpreadElement(M))
						) {
							Sc(e, x, l, d),
								D || (d[d.length - 1].value.raw += " "),
								S && t.splice(t.indexOf(n[S]), 1)
							continue
						}
						x = s.callExpression(K(e, "ssrClassList"), [x])
					}
					l.push(s.logicalExpression("||", x, s.stringLiteral(""))),
						d.push(s.templateElement({raw: D ? "" : " "}))
				} else {
					let x = d.pop()
					d.push(
						s.templateElement({
							raw:
								(x ? x.value.raw : "") +
								`${g.value.value}` +
								(D ? "" : " "),
						})
					)
				}
				S && t.splice(t.indexOf(n[S]), 1)
			}
			;(i.name = s.jsxIdentifier("class")),
				(i.value = s.jsxExpressionContainer(s.templateLiteral(d, l)))
		}
		return r.length && sc("style", t, r), t
	}
	function sL(e, t, r) {
		let a = Oe(e.node),
			n = Ei.has(a),
			i = e.node.children.length > 0,
			l = yc(e),
			d
		l.forEach(S => {
			let g = S.node,
				D = g.value,
				x = s.isJSXNamespacedName(g.name)
					? `${g.name.namespace.name}:${g.name.name.name}`
					: g.name.name,
				M = s.isJSXNamespacedName(g.name) && ma.has(g.name.namespace.name)
			if (
				(((s.isJSXNamespacedName(g.name) && M) || mr.has(x)) &&
					!s.isJSXExpressionContainer(D) &&
					(g.value = D =
						s.jsxExpressionContainer(D || s.jsxEmptyExpression())),
				s.isJSXExpressionContainer(D) &&
					(M ||
						mr.has(x) ||
						!(
							s.isStringLiteral(D.expression) ||
							s.isNumericLiteral(D.expression) ||
							s.isBooleanLiteral(D.expression)
						)))
			) {
				if (
					x === "ref" ||
					x.startsWith("use:") ||
					x.startsWith("prop:") ||
					x.startsWith("on")
				)
					return
				if (mr.has(x))
					r.hydratable &&
						x === "textContent" &&
						D &&
						D.expression &&
						(D.expression = s.logicalExpression(
							"||",
							D.expression,
							s.stringLiteral(" ")
						)),
						x === "innerHTML" && (e.doNotEscape = !0),
						(d = D)
				else {
					let w = !0
					if (
						(x.startsWith("attr:") && (x = x.replace("attr:", "")),
						tc.has(x))
					) {
						t.template.push("")
						let U = s.callExpression(K(S, "ssrAttribute"), [
							s.stringLiteral(x),
							D.expression,
							s.booleanLiteral(!0),
						])
						t.templateValues.push(U)
						return
					}
					if (x === "style") {
						if (
							s.isJSXExpressionContainer(D) &&
							s.isObjectExpression(D.expression) &&
							!D.expression.properties.some(U => s.isSpreadElement(U))
						) {
							let U = D.expression.properties.map((z, F) =>
									s.binaryExpression(
										"+",
										s.stringLiteral(
											(F ? ";" : "") +
												(s.isIdentifier(z.key)
													? z.key.name
													: z.key.value) +
												":"
										),
										Ne(e, z.value, !0, !0)
									)
								),
								R = U[0]
							for (let z = 1; z < U.length; z++)
								R = s.binaryExpression("+", R, U[z])
							D.expression = R
						} else
							D.expression = s.callExpression(K(e, "ssrStyle"), [
								D.expression,
							])
						w = !1
					}
					if (x === "classList") {
						if (
							s.isObjectExpression(D.expression) &&
							!D.expression.properties.some(U => s.isSpreadElement(U))
						) {
							let U = [],
								R = [s.templateElement({raw: ""})]
							Sc(e, D.expression, U, R),
								U.length
									? U.length === 1 &&
									  !R[0].value.raw &&
									  !R[1].value.raw
										? (D.expression = U[0])
										: (D.expression = s.templateLiteral(R, U))
									: (D.expression = s.stringLiteral(R[0].value.raw))
						} else
							D.expression = s.callExpression(K(e, "ssrClassList"), [
								D.expression,
							])
						;(x = "class"), (w = !1)
					}
					w && (D.expression = Ne(e, D.expression, !0)),
						!w || s.isLiteral(D.expression)
							? ((x = ci(x, n)),
							  st(t.template, ` ${x}="`),
							  t.template.push('"'),
							  t.templateValues.push(D.expression))
							: nL(S, t, x, D.expression, n)
				}
			} else {
				if (x === "$ServerOnly") return
				s.isJSXExpressionContainer(D) && (D = D.expression), (x = ci(x, n))
				let w = tc.has(x)
				if (
					(w && D && D.value !== "" && !D.value) ||
					(st(t.template, ` ${x}`), !D)
				)
					return
				let U = w ? "" : D.value
				;(x === "style" || x === "class") &&
					((U = Ft(String(U))),
					x === "style" &&
						(U = U.replace(/; /g, ";").replace(/: /g, ":"))),
					st(t.template, String(U) === "" ? "" : `="${Et(U, !0)}"`)
			}
		}),
			!i && d && e.node.children.push(d)
	}
	function Sc(e, t, r, a) {
		t.properties.forEach((n, i) => {
			let l = t.properties.length - 1 === i,
				d = n.key
			if (
				(s.isIdentifier(n.key) && !n.computed
					? (d = s.stringLiteral(d.name))
					: n.computed
					? (d = s.callExpression(K(e, "escape"), [
							n.key,
							s.booleanLiteral(!0),
					  ]))
					: (d = s.stringLiteral(Et(n.key.value))),
				s.isBooleanLiteral(n.value))
			) {
				if (n.value.value === !0)
					if (n.computed)
						r.push(d), a.push(s.templateElement({raw: l ? "" : " "}))
					else {
						let S = a.pop()
						a.push(
							s.templateElement({
								raw:
									(S ? S.value.raw : "") +
									(i ? " " : "") +
									`${d.value}` +
									(l ? "" : " "),
							})
						)
					}
			} else
				r.push(s.conditionalExpression(n.value, d, s.stringLiteral(""))),
					a.push(s.templateElement({raw: l ? "" : " "}))
		})
	}
	function iL(e, t, {hydratable: r}) {
		let a = e.doNotEscape,
			n = yt(e.get("children")),
			i = Ea(n),
			l = r && i
		n.forEach(d => {
			if (s.isJSXElement(d.node) && Oe(d.node) === "head") {
				let g = ut(d, {doNotEscape: a, hydratable: !1})
				K(e, "NoHydration"),
					K(e, "createComponent"),
					t.template.push(""),
					t.templateValues.push(
						s.callExpression(s.identifier("_$createComponent"), [
							s.identifier("_$NoHydration"),
							s.objectExpression([
								s.objectMethod(
									"get",
									s.identifier("children"),
									[],
									s.blockStatement([s.returnStatement(yi(e, g))])
								),
							]),
						])
					)
				return
			}
			let S = ut(d, {doNotEscape: a})
			S &&
				(st(t.template, S.template),
				t.templateValues.push.apply(
					t.templateValues,
					S.templateValues || []
				),
				S.exprs.length &&
					(!a && !S.spreadElement && (S.exprs[0] = Ne(e, S.exprs[0])),
					l && !S.spreadElement
						? (st(t.template, "<!--$-->"),
						  t.template.push(""),
						  t.templateValues.push(S.exprs[0]),
						  st(t.template, "<!--/-->"))
						: (t.template.push(""), t.templateValues.push(S.exprs[0]))))
		})
	}
	function uL(e, {topLevel: t, hydratable: r}) {
		let a = Oe(e.node),
			n = pe(e),
			i = yc(e),
			l = e.doNotEscape,
			d = yt(e.get("children")),
			S = Ea(d),
			g = r && S,
			D = d.reduce((w, U) => {
				if (s.isJSXText(U.node)) {
					let R = fi.decode(Ft(U.node.extra.raw))
					R.length && w.push(s.stringLiteral(R))
				} else {
					let R = ut(U)
					g &&
						R.exprs.length &&
						!R.spreadElement &&
						w.push(s.stringLiteral("<!--$-->")),
						R.exprs.length &&
							!l &&
							!R.spreadElement &&
							(R.exprs[0] = Ne(U, R.exprs[0])),
						w.push(ya(n, U, R)(U, R, !0)),
						g &&
							R.exprs.length &&
							!R.spreadElement &&
							w.push(s.stringLiteral("<!--/-->"))
				}
				return w
			}, []),
			x
		if (i.length === 1) x = [i[0].node.argument]
		else {
			x = []
			let w = [],
				U = !1,
				R = e.node.children.length > 0
			i.forEach(z => {
				let F = z.node
				if (s.isJSXSpreadAttribute(F))
					w.length && (x.push(s.objectExpression(w)), (w = [])),
						x.push(
							de(z.get("argument"), {checkMember: !0}) && (U = !0)
								? s.isCallExpression(F.argument) &&
								  !F.argument.arguments.length &&
								  !s.isCallExpression(F.argument.callee) &&
								  !s.isMemberExpression(F.argument.callee)
									? F.argument.callee
									: s.arrowFunctionExpression([], F.argument)
								: F.argument
						)
				else {
					let V = F.value || s.booleanLiteral(!0),
						C = wt(F.name),
						J = s.isJSXNamespacedName(F.name)
							? `${F.name.namespace.name}:${F.name.name.name}`
							: F.name.name
					if (
						(R && J === "children") ||
						J === "ref" ||
						J.startsWith("use:") ||
						J.startsWith("prop:") ||
						J.startsWith("on")
					)
						return
					if (s.isJSXExpressionContainer(V))
						if (
							de(z.get("value").get("expression"), {
								checkMember: !0,
								checkTags: !0,
							})
						) {
							let ae = s.arrowFunctionExpression([], V.expression)
							w.push(
								s.objectMethod(
									"get",
									C,
									[],
									s.blockStatement([s.returnStatement(ae.body)]),
									!s.isValidIdentifier(J)
								)
							)
						} else w.push(s.objectProperty(C, V.expression))
					else w.push(s.objectProperty(C, V))
				}
			}),
				(w.length || !x.length) && x.push(s.objectExpression(w)),
				(x.length > 1 || U) &&
					(x = [s.callExpression(K(e, "mergeProps"), x)])
		}
		return {
			exprs: [
				s.callExpression(K(e, "ssrElement"), [
					s.stringLiteral(a),
					x[0],
					D.length
						? r
							? s.arrowFunctionExpression(
									[],
									D.length === 1 ? D[0] : s.arrayExpression(D)
							  )
							: D.length === 1
							? D[0]
							: s.arrayExpression(D)
						: s.identifier("undefined"),
					s.booleanLiteral(!!(t && n.hydratable)),
				]),
			],
			template: "",
			spreadElement: !0,
		}
	}
	function oL(e, t) {
		let r = Oe(e.node),
			a = {
				id: e.scope.generateUidIdentifier("el$"),
				declarations: [],
				exprs: [],
				dynamics: [],
				postExprs: [],
				tagName: r,
				renderer: "universal",
			}
		return (
			a.declarations.push(
				s.variableDeclarator(
					a.id,
					s.callExpression(
						K(e, "createElement", te(e, "universal").moduleName),
						[s.stringLiteral(r)]
					)
				)
			),
			lL(e, a),
			cL(e, a),
			a
		)
	}
	function lL(e, t) {
		let r,
			a,
			n = e.get("openingElement").get("attributes"),
			i = t.id,
			l = e.node.children.length > 0,
			d = pe(e)
		n.some(S => s.isJSXSpreadAttribute(S.node)) &&
			(([n, a] = dL(e, n, {
				elem: i,
				hasChildren: l,
				wrapConditionals: d.wrapConditionals,
			})),
			e.get("openingElement").set(
				"attributes",
				n.map(S => S.node)
			)),
			e
				.get("openingElement")
				.get("attributes")
				.forEach(S => {
					let g = S.node,
						D = g.value,
						x = s.isJSXNamespacedName(g.name)
							? `${g.name.namespace.name}:${g.name.name.name}`
							: g.name.name,
						M =
							s.isJSXNamespacedName(g.name) &&
							g.name.namespace.name === "use"
					if (
						(s.isJSXNamespacedName(g.name) &&
							M &&
							!s.isJSXExpressionContainer(D) &&
							(g.value = D =
								s.jsxExpressionContainer(D || s.jsxEmptyExpression())),
						s.isJSXExpressionContainer(D))
					)
						if (x === "ref") {
							for (
								;
								s.isTSNonNullExpression(D.expression) ||
								s.isTSAsExpression(D.expression);

							)
								D.expression = D.expression.expression
							let w,
								U =
									s.isIdentifier(D.expression) &&
									(w = e.scope.getBinding(D.expression.name)) &&
									(w.kind === "const" || w.kind === "module")
							if (!U && s.isLVal(D.expression)) {
								let R = e.scope.generateUidIdentifier("_ref$")
								t.exprs.unshift(
									s.variableDeclaration("var", [
										s.variableDeclarator(R, D.expression),
									]),
									s.expressionStatement(
										s.conditionalExpression(
											s.binaryExpression(
												"===",
												s.unaryExpression("typeof", R),
												s.stringLiteral("function")
											),
											s.callExpression(
												K(e, "use", te(e, "universal").moduleName),
												[R, i]
											),
											s.assignmentExpression("=", D.expression, i)
										)
									)
								)
							} else if (U || s.isFunction(D.expression))
								t.exprs.unshift(
									s.expressionStatement(
										s.callExpression(
											K(e, "use", te(e, "universal").moduleName),
											[D.expression, i]
										)
									)
								)
							else {
								let R = e.scope.generateUidIdentifier("_ref$")
								t.exprs.unshift(
									s.variableDeclaration("var", [
										s.variableDeclarator(R, D.expression),
									]),
									s.expressionStatement(
										s.logicalExpression(
											"&&",
											s.binaryExpression(
												"===",
												s.unaryExpression("typeof", R),
												s.stringLiteral("function")
											),
											s.callExpression(
												K(e, "use", te(e, "universal").moduleName),
												[R, i]
											)
										)
									)
								)
							}
						} else
							x.startsWith("use:")
								? ((g.name.name.type = "Identifier"),
								  t.exprs.unshift(
										s.expressionStatement(
											s.callExpression(
												K(e, "use", te(e, "universal").moduleName),
												[
													g.name.name,
													i,
													s.arrowFunctionExpression(
														[],
														s.isJSXEmptyExpression(D.expression)
															? s.booleanLiteral(!0)
															: D.expression
													),
												]
											)
										)
								  ))
								: x === "children"
								? (r = D)
								: d.effectWrapper &&
								  de(S.get("value").get("expression"), {
										checkMember: !0,
								  })
								? t.dynamics.push({
										elem: i,
										key: x,
										value: D.expression,
								  })
								: t.exprs.push(
										s.expressionStatement(Ta(S, i, x, D.expression))
								  )
					else t.exprs.push(s.expressionStatement(Ta(S, i, x, D)))
				}),
			a && t.exprs.push(a),
			!l && r && e.node.children.push(r)
	}
	function Ta(e, t, r, a, {prevId: n} = {}) {
		return (
			a || (a = s.booleanLiteral(!0)),
			s.callExpression(
				K(e, "setProp", te(e, "universal").moduleName),
				n ? [t, s.stringLiteral(r), a, n] : [t, s.stringLiteral(r), a]
			)
		)
	}
	function cL(e, t) {
		let r = yt(e.get("children")),
			a = Ea(r),
			n = r.map(ut).reduce((l, d) => {
				if (!d) return l
				let S = l.length
				return (
					d.text && S && l[S - 1].text
						? ((l[S - 1].template += d.template),
						  (l[S - 1].templateWithClosingTags +=
								d.templateWithClosingTags || d.template))
						: l.push(d),
					l
				)
			}, []),
			i = []
		n.forEach((l, d) => {
			if (l) {
				if (l.tagName && l.renderer !== "universal")
					throw new Error(`<${l.tagName}> is not supported in <${Oe(
						e.node
					)}>.
        Wrap the usage with a component that would render this element, eg. Canvas`)
				if (l.id) {
					let S = K(e, "insertNode", te(e, "universal").moduleName),
						g = l.id
					if (l.text) {
						let D = K(e, "createTextNode", te(e, "universal").moduleName)
						a
							? t.declarations.push(
									s.variableDeclarator(
										l.id,
										s.callExpression(D, [
											s.templateLiteral(
												[s.templateElement({raw: li(l.template)})],
												[]
											),
										])
									)
							  )
							: (g = s.callExpression(D, [
									s.templateLiteral(
										[s.templateElement({raw: li(l.template)})],
										[]
									),
							  ]))
					}
					i.push(s.expressionStatement(s.callExpression(S, [t.id, g]))),
						t.declarations.push(...l.declarations),
						t.exprs.push(...l.exprs),
						t.dynamics.push(...l.dynamics)
				} else if (l.exprs.length) {
					let S = K(e, "insert", te(e, "universal").moduleName)
					a
						? t.exprs.push(
								s.expressionStatement(
									s.callExpression(S, [
										t.id,
										l.exprs[0],
										bc(n, d) || s.nullLiteral(),
									])
								)
						  )
						: t.exprs.push(
								s.expressionStatement(
									s.callExpression(S, [t.id, l.exprs[0]])
								)
						  )
				}
			}
		}),
			t.exprs.unshift(...i)
	}
	function bc(e, t) {
		return e[t + 1] && (e[t + 1].id || bc(e, t + 1))
	}
	function dL(e, t, {elem: r, hasChildren: a, wrapConditionals: n}) {
		let i = [],
			l = [],
			d = [],
			S = !1,
			g = !1
		t.forEach(x => {
			let M = x.node,
				w =
					!s.isJSXSpreadAttribute(M) &&
					(s.isJSXNamespacedName(M.name)
						? `${M.name.namespace.name}:${M.name.name.name}`
						: M.name.name)
			if (s.isJSXSpreadAttribute(M))
				(g = !0),
					d.length && (l.push(s.objectExpression(d)), (d = [])),
					l.push(
						de(x.get("argument"), {checkMember: !0}) && (S = !0)
							? s.isCallExpression(M.argument) &&
							  !M.argument.arguments.length &&
							  !s.isCallExpression(M.argument.callee) &&
							  !s.isMemberExpression(M.argument.callee)
								? M.argument.callee
								: s.arrowFunctionExpression([], M.argument)
							: M.argument
					)
			else if (
				(g ||
					(s.isJSXExpressionContainer(M.value) &&
						de(x.get("value").get("expression"), {checkMember: !0}))) &&
				dc(w, {checkNameSpaces: !0})
			) {
				let U = s.isJSXExpressionContainer(M.value)
				if (U && de(x.get("value").get("expression"), {checkMember: !0})) {
					let z = wt(M.name),
						F =
							n &&
							(s.isLogicalExpression(M.value.expression) ||
								s.isConditionalExpression(M.value.expression))
								? Bt(x.get("value").get("expression"), !0)
								: s.arrowFunctionExpression([], M.value.expression)
					d.push(
						s.objectMethod(
							"get",
							z,
							[],
							s.blockStatement([s.returnStatement(F.body)]),
							!s.isValidIdentifier(w)
						)
					)
				} else
					d.push(
						s.objectProperty(
							s.stringLiteral(w),
							U ? M.value.expression : M.value || s.booleanLiteral(!0)
						)
					)
			} else i.push(x)
		}),
			d.length && l.push(s.objectExpression(d))
		let D =
			l.length === 1 && !S ? l[0] : s.callExpression(K(e, "mergeProps"), l)
		return [
			i,
			s.expressionStatement(
				s.callExpression(K(e, "spread", te(e, "universal").moduleName), [
					r,
					D,
					s.booleanLiteral(a),
				])
			),
		]
	}
	function pL(e, t, r) {
		let a = pe(e)
		return t.id
			? ((t.decl = s.variableDeclaration("var", t.declarations)),
			  !(t.exprs.length || t.dynamics.length || t.postExprs.length) &&
			  t.decl.declarations.length === 1
					? t.decl.declarations[0].init
					: s.callExpression(
							s.arrowFunctionExpression(
								[],
								s.blockStatement([
									t.decl,
									...t.exprs.concat(
										fL(e, t.dynamics) || [],
										t.postExprs || []
									),
									s.returnStatement(t.id),
								])
							),
							[]
					  ))
			: r && t.dynamic && a.memoWrapper
			? s.callExpression(K(e, a.memoWrapper), [t.exprs[0]])
			: t.exprs[0]
	}
	function fL(e, t) {
		if (!t.length) return
		let r = pe(e),
			a = K(e, r.effectWrapper)
		if (t.length === 1) {
			let S = s.identifier("_$p")
			return s.expressionStatement(
				s.callExpression(a, [
					s.arrowFunctionExpression(
						[S],
						Ta(e, t[0].elem, t[0].key, t[0].value, {
							dynamic: !0,
							prevId: S,
						})
					),
				])
			)
		}
		let n = s.identifier("_p$"),
			i = [],
			l = [],
			d = []
		return (
			t.forEach(({elem: S, key: g, value: D}, x) => {
				let M = e.scope.generateUidIdentifier("v$"),
					w = s.identifier(fc(x)),
					U = s.memberExpression(n, w)
				d.push(w),
					i.push(s.variableDeclarator(M, D)),
					l.push(
						s.expressionStatement(
							s.logicalExpression(
								"&&",
								s.binaryExpression("!==", M, U),
								s.assignmentExpression(
									"=",
									U,
									Ta(e, S, g, M, {dynamic: !0, prevId: U})
								)
							)
						)
					)
			}),
			s.expressionStatement(
				s.callExpression(a, [
					s.arrowFunctionExpression(
						[n],
						s.blockStatement([
							s.variableDeclaration("var", i),
							...l,
							s.returnStatement(n),
						])
					),
					s.objectExpression(
						d.map(S => s.objectProperty(S, s.identifier("undefined")))
					),
				])
			)
		)
	}
	function di(e) {
		if (s.isJSXIdentifier(e)) {
			if (e.name === "this") return s.thisExpression()
			if (s.isValidIdentifier(e.name)) e.type = "Identifier"
			else return s.stringLiteral(e.name)
		} else if (s.isJSXMemberExpression(e)) {
			let t = di(e.property),
				r = s.isStringLiteral(t)
			return s.memberExpression(di(e.object), t, r)
		}
		return e
	}
	function TL(e) {
		let t = [],
			r = pe(e),
			a = di(e.node.openingElement.name),
			n = [],
			i = [],
			l = !1,
			d = e.node.children.length > 0
		if (r.builtIns.indexOf(a.name) > -1 && !e.scope.hasBinding(a.name)) {
			let D = K(e, a.name)
			a.name = D.name
		}
		e.get("openingElement")
			.get("attributes")
			.forEach(D => {
				let x = D.node
				if (s.isJSXSpreadAttribute(x))
					i.length && (n.push(s.objectExpression(i)), (i = [])),
						n.push(
							de(D.get("argument"), {checkMember: !0}) && (l = !0)
								? s.isCallExpression(x.argument) &&
								  !x.argument.arguments.length &&
								  !s.isCallExpression(x.argument.callee) &&
								  !s.isMemberExpression(x.argument.callee)
									? x.argument.callee
									: s.arrowFunctionExpression([], x.argument)
								: x.argument
						)
				else {
					let M =
							(s.isStringLiteral(x.value)
								? s.stringLiteral(x.value.value)
								: x.value) || s.booleanLiteral(!0),
						w = wt(x.name),
						U = w.name
					if (d && U === "children") return
					if (s.isJSXExpressionContainer(M))
						if (U === "ref") {
							if (r.generate === "ssr") return
							for (
								;
								s.isTSNonNullExpression(M.expression) ||
								s.isTSAsExpression(M.expression) ||
								s.isTSSatisfiesExpression(M.expression);

							)
								M.expression = M.expression.expression
							let R,
								z =
									s.isIdentifier(M.expression) &&
									(R = e.scope.getBinding(M.expression.name)) &&
									(R.kind === "const" || R.kind === "module")
							if (!z && s.isLVal(M.expression)) {
								let F = e.scope.generateUidIdentifier("_ref$")
								i.push(
									s.objectMethod(
										"method",
										s.identifier("ref"),
										[s.identifier("r$")],
										s.blockStatement([
											s.variableDeclaration("var", [
												s.variableDeclarator(F, M.expression),
											]),
											s.expressionStatement(
												s.conditionalExpression(
													s.binaryExpression(
														"===",
														s.unaryExpression("typeof", F),
														s.stringLiteral("function")
													),
													s.callExpression(F, [
														s.identifier("r$"),
													]),
													s.assignmentExpression(
														"=",
														M.expression,
														s.identifier("r$")
													)
												)
											),
										])
									)
								)
							} else if (z || s.isFunction(M.expression))
								i.push(
									s.objectProperty(s.identifier("ref"), M.expression)
								)
							else if (s.isCallExpression(M.expression)) {
								let F = e.scope.generateUidIdentifier("_ref$")
								i.push(
									s.objectMethod(
										"method",
										s.identifier("ref"),
										[s.identifier("r$")],
										s.blockStatement([
											s.variableDeclaration("var", [
												s.variableDeclarator(F, M.expression),
											]),
											s.expressionStatement(
												s.logicalExpression(
													"&&",
													s.binaryExpression(
														"===",
														s.unaryExpression("typeof", F),
														s.stringLiteral("function")
													),
													s.callExpression(F, [s.identifier("r$")])
												)
											),
										])
									)
								)
							}
						} else if (
							de(D.get("value").get("expression"), {
								checkMember: !0,
								checkTags: !0,
							})
						)
							if (
								r.wrapConditionals &&
								r.generate !== "ssr" &&
								(s.isLogicalExpression(M.expression) ||
									s.isConditionalExpression(M.expression))
							) {
								let R = Bt(D.get("value").get("expression"), !0)
								i.push(
									s.objectMethod(
										"get",
										w,
										[],
										s.blockStatement([s.returnStatement(R.body)]),
										!s.isValidIdentifier(U)
									)
								)
							} else if (
								s.isCallExpression(M.expression) &&
								s.isArrowFunctionExpression(M.expression.callee) &&
								M.expression.callee.params.length === 0
							) {
								let R = M.expression.callee,
									z = s.isBlockStatement(R.body)
										? R.body
										: s.blockStatement([s.returnStatement(R.body)])
								i.push(
									s.objectMethod(
										"get",
										w,
										[],
										z,
										!s.isValidIdentifier(U)
									)
								)
							} else
								i.push(
									s.objectMethod(
										"get",
										w,
										[],
										s.blockStatement([
											s.returnStatement(M.expression),
										]),
										!s.isValidIdentifier(U)
									)
								)
						else i.push(s.objectProperty(w, M.expression))
					else i.push(s.objectProperty(w, M))
				}
			})
		let S = mL(e.get("children"), r)
		if (S && S[0])
			if (S[1]) {
				let D =
					s.isCallExpression(S[0]) && s.isFunction(S[0].arguments[0])
						? S[0].arguments[0].body
						: S[0].body
						? S[0].body
						: S[0]
				i.push(
					s.objectMethod(
						"get",
						s.identifier("children"),
						[],
						s.isExpression(D)
							? s.blockStatement([s.returnStatement(D)])
							: D
					)
				)
			} else i.push(s.objectProperty(s.identifier("children"), S[0]))
		;(i.length || !n.length) && n.push(s.objectExpression(i)),
			(n.length > 1 || l) && (n = [s.callExpression(K(e, "mergeProps"), n)])
		let g = [a, n[0]]
		if (
			(t.push(s.callExpression(K(e, "createComponent"), g)), t.length > 1)
		) {
			let D = t.pop()
			t = [
				s.callExpression(
					s.arrowFunctionExpression(
						[],
						s.blockStatement([...t, s.returnStatement(D)])
					),
					[]
				),
			]
		}
		return {exprs: t, template: "", component: !0}
	}
	function mL(e, t) {
		let r = yt(e)
		if (!r.length) return
		let a = !1,
			n = [],
			i = r.reduce((l, d) => {
				if (s.isJSXText(d.node)) {
					let S = fi.decode(Ft(d.node.extra.raw))
					S.length && (n.push(d.node), l.push(s.stringLiteral(S)))
				} else {
					let S = ut(d, {
						topLevel: !0,
						componentChild: !0,
						lastElement: !0,
					})
					;(a = a || S.dynamic),
						t.generate === "ssr" &&
							r.length > 1 &&
							S.dynamic &&
							s.isFunction(S.exprs[0]) &&
							(S.exprs[0] = S.exprs[0].body),
						n.push(d.node),
						l.push(ya(t, d, S)(d, S, r.length > 1))
				}
				return l
			}, [])
		return (
			i.length === 1
				? ((i = i[0]),
				  !s.isJSXExpressionContainer(n[0]) &&
						!s.isJSXSpreadChild(n[0]) &&
						!s.isJSXText(n[0]) &&
						((i =
							s.isCallExpression(i) &&
							!i.arguments.length &&
							!s.isIdentifier(i.callee)
								? i.callee
								: s.arrowFunctionExpression([], i)),
						(a = !0)))
				: ((i = s.arrowFunctionExpression([], s.arrayExpression(i))),
				  (a = !0)),
			[i, a]
		)
	}
	function EL(e, t, r) {
		let a = yt(e),
			n = a.reduce((i, l) => {
				if (s.isJSXText(l.node)) {
					let d = fi.decode(Ft(l.node.extra.raw))
					d.length && i.push(s.stringLiteral(d))
				} else {
					let d = ut(l, {topLevel: !0, fragmentChild: !0, lastElement: !0})
					i.push(ya(r, l, d)(l, d, !0))
				}
				return i
			}, [])
		t.exprs.push(n.length === 1 ? n[0] : s.arrayExpression(n))
	}
	function ic(e) {
		let t = pe(e),
			r = yL(e),
			a = ut(
				e,
				s.isJSXFragment(e.node) ? {} : {topLevel: !0, lastElement: !0}
			),
			n = ya(t, e, a)
		e.replaceWith(r(n(e, a, !1)))
	}
	function uc(e, t) {
		let r = e.scope.getFunctionParent()
		for (; r !== t && r.path.isArrowFunctionExpression(); )
			r = r.path.parentPath.scope.getFunctionParent()
		return r
	}
	function yL(e) {
		let t = e.scope.getFunctionParent(),
			r
		return (
			e.traverse({
				ThisExpression(a) {
					uc(a, t) === t &&
						(r || (r = a.scope.generateUidIdentifier("self$")),
						a.replaceWith(r))
				},
				JSXElement(a) {
					let n = a.get("openingElement").get("name")
					for (; n.isJSXMemberExpression(); ) n = n.get("object")
					n.isJSXIdentifier() &&
						n.node.name === "this" &&
						uc(a, t) === t &&
						(r || (r = a.scope.generateUidIdentifier("self$")),
						n.replaceWith(s.jsxIdentifier(r.name)),
						a.node.closingElement &&
							(a.node.closingElement.name = a.node.openingElement.name))
				},
			}),
			a => {
				if (r)
					if (!t || t.block.type === "ClassMethod") {
						let n = s.variableDeclaration("const", [
							s.variableDeclarator(r, s.thisExpression()),
						])
						if (t) e.getStatementParent().insertBefore(n)
						else
							return s.callExpression(
								s.arrowFunctionExpression(
									[],
									s.blockStatement([n, s.returnStatement(a)])
								),
								[]
							)
					} else t.push({id: r, init: s.thisExpression(), kind: "const"})
				return a
			}
		)
	}
	function ut(e, t = {}) {
		let r = pe(e),
			a = e.node,
			n
		if (s.isJSXElement(a)) return SL(r, e, t)
		if (s.isJSXFragment(a)) {
			let i = {template: "", declarations: [], exprs: [], dynamics: []}
			return EL(e.get("children"), i, r), i
		} else if (s.isJSXText(a) || (n = fa(e)) !== !1) {
			let i =
				n !== void 0
					? t.doNotEscape
						? n.toString()
						: Et(n.toString())
					: Ft(a.extra.raw)
			if (!i.length) return null
			let l = {
				template: i,
				declarations: [],
				exprs: [],
				dynamics: [],
				postExprs: [],
				text: !0,
			}
			return (
				!t.skipId &&
					r.generate !== "ssr" &&
					(l.id = e.scope.generateUidIdentifier("el$")),
				l
			)
		} else if (s.isJSXExpressionContainer(a)) {
			if (s.isJSXEmptyExpression(a.expression)) return null
			if (
				!de(e.get("expression"), {
					checkMember: !0,
					checkTags: !!t.componentChild,
					native: !t.componentChild,
				})
			)
				return {exprs: [a.expression], template: ""}
			let i =
				r.wrapConditionals &&
				r.generate !== "ssr" &&
				(s.isLogicalExpression(a.expression) ||
					s.isConditionalExpression(a.expression))
					? Bt(e.get("expression"), t.componentChild || t.fragmentChild)
					: !t.componentChild &&
					  (r.generate !== "ssr" || t.fragmentChild) &&
					  s.isCallExpression(a.expression) &&
					  !s.isCallExpression(a.expression.callee) &&
					  !s.isMemberExpression(a.expression.callee) &&
					  a.expression.arguments.length === 0
					? a.expression.callee
					: s.arrowFunctionExpression([], a.expression)
			return {
				exprs:
					i.length > 1
						? [
								s.callExpression(
									s.arrowFunctionExpression(
										[],
										s.blockStatement([i[0], s.returnStatement(i[1])])
									),
									[]
								),
						  ]
						: [i],
				template: "",
				dynamic: !0,
			}
		} else if (s.isJSXSpreadChild(a))
			return de(e.get("expression"), {
				checkMember: !0,
				native: !t.componentChild,
			})
				? {
						exprs: [s.arrowFunctionExpression([], a.expression)],
						template: "",
						dynamic: !0,
				  }
				: {exprs: [a.expression], template: ""}
	}
	function ya(e, t, r) {
		return (r.tagName && r.renderer === "dom") || e.generate === "dom"
			? Z3
			: r.renderer === "ssr" || e.generate === "ssr"
			? yi
			: pL
	}
	function SL(e, t, r = {}) {
		let a = t.node,
			n = Oe(a)
		return it(n)
			? TL(t)
			: (e.renderers ?? []).find(l => l.elements.includes(n))?.name ===
					"dom" || pe(t).generate === "dom"
			? X3(t, r)
			: pe(t).generate === "ssr"
			? Ec(t, r)
			: oL(t)
	}
	var pi = Kl(),
		bL = pi.parse("<!DOCTYPE html><html><head></head><body></body></html>")
			.childNodes[1].childNodes[1]
	function AL(e) {
		let t = pi.parseFragment(bL, e)
		return pi.serialize(t)
	}
	function hL(e) {
		switch (
			((e = e
				.replaceAll("<!>", "<!---->")
				.replaceAll("<!$>", "<!--$-->")
				.replaceAll("<!/>", "<!--/-->")
				.replace(/^[^<]+/, "#text")
				.replace(/[^>]+$/, "#text")
				.replace(/>[^<]+</gi, ">#text<")
				.replace(/&lt;([^>]+)>/gi, "&lt;$1&gt;")),
			/^<(td|th)>/.test(e) &&
				(e = `<table><tbody><tr>${e}</tr></tbody></table>`),
			/^<tr>/.test(e) && (e = `<table><tbody>${e}</tbody></table>`),
			/^<col>/.test(e) && (e = `<table><colgroup>${e}</colgroup></table>`),
			/^<(thead|tbody|tfoot|colgroup|caption)>/.test(e) &&
				(e = `<table>${e}</table>`),
			e)
		) {
			case "<table></table>":
			case "<table><thead></thead></table>":
			case "<table><tbody></tbody></table>":
			case "<table><thead></thead><tbody></tbody></table>":
				return
		}
		let t = AL(e)
		if (e !== t) return {html: e, browser: t}
	}
	var _L = e => {
			if (
				(e.scope.data.events &&
					e.node.body.push(
						s.expressionStatement(
							s.callExpression(
								K(e, "delegateEvents", te(e, "dom").moduleName),
								[
									s.arrayExpression(
										Array.from(e.scope.data.events).map(t =>
											s.stringLiteral(t)
										)
									),
								]
							)
						)
					),
				e.scope.data.templates?.length)
			) {
				if (e.hub.file.metadata.config.validate)
					for (let a of e.scope.data.templates) {
						let n = a.templateWithClosingTags
						if (typeof n == "string") {
							let i = hL(n)
							i &&
								(console.warn(`
The HTML provided is malformed and will yield unexpected output when evaluated by a browser.
`),
								console.warn(
									`User HTML:
`,
									i.html
								),
								console.warn(
									`Browser HTML:
`,
									i.browser
								),
								console.warn(
									`Original HTML:
`,
									n
								))
						}
					}
				let t = e.scope.data.templates.filter(a => a.renderer === "dom"),
					r = e.scope.data.templates.filter(a => a.renderer === "ssr")
				t.length > 0 && eL(e, t), r.length > 0 && aL(e, r)
			}
		},
		IL = {
			moduleName: "dom",
			generate: "dom",
			hydratable: !1,
			delegateEvents: !0,
			delegatedEvents: [],
			builtIns: [],
			requireImportSource: !1,
			wrapConditionals: !0,
			omitNestedClosingTags: !1,
			omitLastClosingTag: !0,
			omitQuotes: !0,
			contextToCustomElements: !1,
			staticMarker: "@once",
			effectWrapper: "effect",
			memoWrapper: "memo",
			validate: !0,
		},
		{isValidHTMLNesting: gL} = ec(),
		DL = {
			JSXElement(e) {
				let t = e.node.openingElement.name,
					r = e.parent
				if (!s.isJSXElement(r) || !s.isJSXIdentifier(t)) return
				let a = t.name
				if (it(a)) return
				let n = r.openingElement.name
				if (!s.isJSXIdentifier(n)) return
				let i = n.name
				if (!it(i) && !gL(i, a))
					throw e.buildCodeFrameError(
						`Invalid JSX: <${a}> cannot be child of <${i}>`
					)
			},
		},
		xL = (e, {opts: t}) => {
			let r = (e.hub.file.metadata.config = Object.assign({}, IL, t)),
				a = r.requireImportSource
			if (a) {
				let n = e.hub.file.ast.comments,
					i = !1
				for (let l = 0; l < n.length; l++) {
					let d = n[l],
						S = d.value.indexOf("@jsxImportSource")
					if (S > -1 && d.value.slice(S).includes(a)) {
						i = !0
						break
					}
				}
				if (!i) {
					e.skip()
					return
				}
			}
			r.validate && e.traverse(DL)
		},
		NL = () => ({
			name: "JSX DOM Expressions",
			inherits: L3.default,
			visitor: {
				JSXElement: ic,
				JSXFragment: ic,
				Program: {enter: xL, exit: _L},
			},
		})
	Ac.exports = NL
})
var Si = Oc(hc()),
	Jw = Si.default ?? Si
export {Jw as default}
//# sourceMappingURL=babel-plugin-jsx-dom-expressions.bundle.mjs.map
