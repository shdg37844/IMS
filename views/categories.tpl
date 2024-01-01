{% extends './layout.tpl' %}

{% block css %}
<link rel="stylesheet" href="/stylesheets/navBar.css">
<link rel="stylesheet" href="/stylesheets/style.css">
{% endblock %}

{% block content %}
<div class="page-body">
    <div class="header-nav-box">
        <div class="nav-bar-list">
            <a href="/homepage" class="nav-item">全部</a>
            {% for item in classify %}
            <a href="/articles?category={{item.name}}" class="nav-item">{{item.name}}</a>
            {% endfor %}    
        </div>
    </div>
    <div class="mainer">
        <div class="detail-content">
            {% for article in articles %}
            <a href="/articles/{{article.id}}" class="detail-box">
                <div class="detail-box-id">{{article.id}}</div>
                <div class="detail-box-text">
                    <h1 class="detail-title">{{article.title}}</h1>
                    <div class="detail-time">{{article.created_at}}</div>
                </div>
            </a>
            {% endfor %}  
        </div>
    </div>
<div>
{% endblock %}

{% block js %}
<script src="/javascripts"></script>
{% endblock %}
