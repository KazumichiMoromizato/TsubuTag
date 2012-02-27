
$(function(){

	// changePage()の実行を見張ります。
	$(document).bind( "pagebeforechange", function( e, data ) {
	  // changePage()がページをURL文字列として受け取った場合のみ
	  // 処理を実行します。
	  if ( typeof data.toPage === "string" ) {
	    // 今回制御するのは、URLにカテゴリ指定が含まれる場合のみです。
	    data.toPage = "http://localhost/tweetApp/#top";
	    var u = $.mobile.path.parseUrl( data.toPage ),
	        re = /^#top/;
	    if ( u.hash.search(re) !== -1 ) {
	      // 処理対象のURL指定であった場合、メモリ上に持っているデータから
	      // 指定されたカテゴリのページを構築する処理を行う関数を呼び出します。
	      showCategory( u, data.options );
	
	      // changePage()関数に対して、処理を引き受けたためにデフォルトの処理を
	      // 実行しないように通知します。
	      e.preventDefault();
	    }
	  }
	});
	
	function showCategory( urlObj, options )
	{
	  var categoryName = urlObj.hash.replace( /.*category=/, "" ),
	
	    // 選ばれたカテゴリをURLから抽出します。
	    // このデータはデモのため既にメモリ上にあるものから連想配列で
	    // 取得していますが、Ajaxなどで取得することも可能です。
	    category = categoryData[ 'animals' ],
	
	    // コンテンツを表示するためのページコンテナは、既にDOM上に
	    // 用意してあります。
	    // どのコンテナを使うのかはURL上の'?'より前がIDになるように
	    // しているので、それを取得します。
	    pageSelector = urlObj.hash.replace( /\?.*$/, "" );
	
		  if ( category ) {
		    // ページを埋め込むコンテナオブジェクトを取得します。
		    var $page = $( pageSelector ),
		
		    // ページのヘッダを取得します。
		    $header = $page.children( ":jqmData(role=header)" ),
		
		    // コンテンツ部分のコンテナを取得します。
		    $content = $page.children( ":jqmData(role=content)" ),
		
		    // コンテンツ部分に埋め込むマークアップを作成します。
		    markup = "<p>" + category.description + "</p><ul data-role='listview' data-inset='true'>",
		
		    // このカテゴリに該当するアイテム群
		    cItems = category.items,
		
		    // アイテム数
		    numItems = cItems.length;
		
		    // このカテゴリにあるアイテムを、リストアイテムとして
		    // マークアップに追加していきます。
		    for ( var i = 0; i < numItems; i++ ) {
		      markup += "<li>" + cItems[i].name + "</li>";
		    }
		    markup += "</ul>";
		
		    // ヘッダからh1要素を見つけ、カテゴリ名を設定します。
		    $header.find( "h1" ).html( category.name );
		
		    // コンテンツ要素に作成したマークアップを埋め込みます。
		    $content.html( markup );
		
		    // ページを、ページとして拡張します。
		    // リストをマークアップして埋め込み、ページの内容が揃った
		    // ところで、ページウィジェットになるよう page() 関数を
		    // 呼び出しています。
		    $page.page();
		
		    // 埋め込んだリストを、リストビュー化します。
		    $content.find( ":jqmData(role=listview)" ).listview();
		
		    // data-urlの値がIDそのままであることは望ましくありません。
		    // ブラウザのロケーションバーにカテゴリを含んだ正しいものが
		    // 入るよう、属性値を更新してやります。
		    //options.dataUrl = urlObj.href;
		
		    // 更新したページを changePage() 関数に渡してやり、ページの
		    // 切り替えを促します。
		    $.mobile.changePage( $page, options );
		}
	}

	var categoryData = {
	  animals: {
	    name: "動物",
	    description: "All your favorites from aardvarks to zebras.",
	    items: [
	      {
	        name: "Pets",
	      },
	      {
	        name: "Farm Animals",
	      },
	      {
	        name: "Wild Animals",
	      }
	    ]
	  },
	  colors: {
	    name: "色",
	    description: "Fresh colors from the magic rainbow.",
	    items: [
	      {
	        name: "Blue",
	      },
	      {
	        name: "Green",
	      },
	      {
	        name: "Orange",
	      },
	      {
	        name: "Purple",
	      },
	      {
	        name: "Red",
	      },
	      {
	        name: "Yellow",
	      },
	      {
	        name: "Violet",
	      }
	    ]
	  },
	  vehicles: {
	    name: "乗り物",
	    description: "Everything from cars to planes.",
	    items: [
	      {
	        name: "Cars",
	      },
	      {
	        name: "Planes",
	      },
	      {
	        name: "Construction",
	      }
	    ]
	  }
	};

});

