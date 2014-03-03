define(function (require) {

    var qtek = require('qtek');

    var FXAANode;
    var lumAdaptionNode;
    
    var app3D = require('framework/App3D').getInstance({

        rendererConfig : {
            canvas : document.getElementById('main'),
            devicePixelRatio : 1
        },
        
        pointerLock : true,

        enablePhysics : true,

        ammoUrl : 'lib/ammo.fast.js',

        graphicConfig : {
            enableShadow : false,
            shadowConfig : {
                shadowCascade : 4,
                cascadeSplitLogFactor : 0.8
                // softShadow : qtek.prePass.ShadowMap.VSM,
                // shadowBlur : 0.1
            }
        },

        initialize : function() {
            FXAANode = this.compositor.findNode('FXAA');
            lumAdaptionNode = this.compositor.findNode('lum_adaption');

            this.resize(window.innerWidth, window.innerHeight);
        },

        frame : function(deltaTime) {
            FXAANode.setParameter('viewportSize', [this.renderer.width, this.renderer.height]);
            lumAdaptionNode.setParameter('frameTime', deltaTime / 1000);
            document.getElementById('draw-info').innerHTML = 'fps ' + Math.round(1000 / deltaTime);
        },

        setLoadingPercent : function(percent) {
            var loadingBar = document.getElementById('progress-percent');
            loadingBar.style.width = Math.round(percent * 100) + '%';
        },

        setLoadingDesc : function(content) {
            document.getElementById('loading-desc').innerHTML = content;
        },

        showLoading : function() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('loading-mask').style.display = 'block';
        },

        hideLoading : function() {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('loading-mask').style.display = 'none';
        },
        
        getResourcePath : function(path) {
            if (path[0] == '/') {
                return path.substr(1);
            }
            // return '../../server/proxy.php?bucket=stealth&object=' + path;
        }
    });

    window.addEventListener('resize', function() {
        app3D.resize(window.innerWidth, window.innerHeight);
    });

    document.getElementById('powered-by').addEventListener('click', function() {
        window.open('https://github.com/pissang/qtek')
    });

    return app3D;
})