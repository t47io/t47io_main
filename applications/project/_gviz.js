function drawGIT(data) {
    var chart = new google.visualization.ChartWrapper({
        'chartType': 'AreaChart',
        'dataSourceUrl': '/git/?type=c&repo=' + name,
        'containerId': 'plot_c_' + name,
        'options': {
            'chartArea': {'width': '90%', 'left': '10%'},
            'legend': {'position': 'none'},
            'title': 'Commit Activity',
            'titleTextStyle': {'bold': false, 'fontSize': 16},
            'vAxis': {
                'title': 'Count (#)',
                'titleTextStyle': {'bold': true},
                // 'scaleType': 'log'
                'format': '#'
            },
            'hAxis': {
                'gridlines': {'count': -1},
                'textStyle': {'italic': true},
                'format': 'MMM yy',
            },
            'tooltip': {'showColorCode': true},
            'lineWidth': 2,
            'pointSize': 5,
            'pointShape': 'square',
            'colors': ['#03a9f4'],
            'animation': {'startup': true, 'duration': 1000, 'easing': 'inAndOut'}
        }
    });

    chart = new google.visualization.ChartWrapper({
        'chartType': 'AreaChart',
        'dataSourceUrl': '/git/?type=a&repo=' + name,
        'containerId': 'plot_ad_' + name,
        'options': {
            'chartArea': {'width': '90%', 'left': '10%'},
            'legend': {'position': 'bottom'},
            'title': 'Code Frequency',
            'titleTextStyle': {'bold': false, 'fontSize': 16},
            'vAxis': {
                'title': 'Count (#)',
                'titleTextStyle': {'bold': true},
                'scaleType': 'mirrorLog',
                'format': 'scientific',
                'gridlines': {'count': 5}
            },
            'hAxis': {
                'gridlines': {'count': -1},
                'textStyle': {'italic': true},
                'format': 'MMM yy',
            },
            'tooltip': {'showColorCode': true},
            'focusTarget': 'category',
            'lineWidth': 2,
            'pointSize': 3,
            'colors': ['#9fc906', '#f44336'],
            'animation': {'startup': true, 'duration': 1000, 'easing': 'inAndOut'}
        }
    });
}


function drawChart() {
    var html = "", i = 0, name = "";
    for (i = 0; i < repo.length; i++) {
        name = repo[i];
        html += '<div class="row"><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><p id="git-name-' + name + '"></p><p id="git-url-' + name + '"></p><p id="git-label-' + name + '"></p><br/><table class="table table-hover"><thead><tr class="active"><th class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><i class="fa fa-fw fa-user"></i>&nbsp;&nbsp;Account</th><th class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><i class="fa fa-fw fa-chevron-circle-up"></i>&nbsp;&nbsp;Commits</th><th class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><i class="fa fa-fw fa-plus-circle"></i>&nbsp;&nbsp;Additions</th><th class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><i class="fa fa-fw fa-minus-circle"></i>&nbsp;&nbsp;Deletions</th></tr></thead><tbody id="git-tb-' + name + '"></tbody></table></div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><div id="plot_c_' + name + '" class="thumbnail git place_holder"><div class="center-block"><div class="cube"> <div class="ani1"> <div class="front"><i></i><i></i><i></i></div><div class="left"><i></i><i></i><i></i></div></div> <div class="ani2"> <div class="front"><i></i><i></i><i></i></div> <div class="bottom"><i></i><i></i><i></i></div></div><div class="ani3"><div class="front"><i></i><i></i><i></i></div><div class="right"><i></i><i></i><i></i></div></div><div class="ani4"><div class="front"><i></i><i></i><i></i></div><div class="top"><i></i><i></i><i></i></div></div><div class="shadow"></div></div></div></div><div id="plot_ad_' + name + '" class="thumbnail git place_holder"><div class="center-block"><div class="cube"> <div class="ani1"> <div class="front"><i></i><i></i><i></i></div><div class="left"><i></i><i></i><i></i></div></div> <div class="ani2"> <div class="front"><i></i><i></i><i></i></div> <div class="bottom"><i></i><i></i><i></i></div></div><div class="ani3"><div class="front"><i></i><i></i><i></i></div><div class="right"><i></i><i></i><i></i></div></div><div class="ani4"><div class="front"><i></i><i></i><i></i></div><div class="top"><i></i><i></i><i></i></div></div><div class="shadow"></div></div></div></div></div></div>';
        if (i < repo.length - 1) { html += '<hr/>'; }
    }
    $("#git_body").html(html).removeClass("place_holder");

    for (i = 0; i < repo.length; i++) {
        name = repo[i];
        $.ajax({
            url : "/git/?type=n&repo=" + name,
            dataType: "json",
            success: drawGIT
        });
    }

}

