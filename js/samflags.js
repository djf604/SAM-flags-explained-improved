/**
 * Created by Dominic Fitzgerald on 9/14/15.
 */

function updateFlagField($boxes, $flagField){
    var intFlag = 0;
    $boxes.each(function(){
        if($(this).prop('checked')){
            intFlag += parseInt($(this).data('bit'));
        }
    });
    $flagField.val(intFlag).css('background-color', '');
}

function updateBoxes($boxes, $flagField){
    var bitwiseFlag = pad(parseInt($flagField.val()).toString(2), 12);
    var bitwiseFlagLength = bitwiseFlag.length;
    for(var i = 0; i < bitwiseFlagLength; i++){
        if(bitwiseFlag.charAt(bitwiseFlagLength - i - 1) === '1'){
            $($boxes[i]).prop('checked', true);
        }else{
            $($boxes[i]).prop('checked', false);
        }
    }
}

function updateSummary($boxes){
    var $summary = $('#summary').empty();
    for(var i = 0; i < $boxes.length; i++){
        var $box = $($boxes[i]);
        if($box.prop('checked')){
            $('<p>').text($box.parent('label').text().trim())
                .css({
                    'margin-top': 0,
                    'margin-bottom': 0
                })
                .appendTo($summary);
        }
    }
}

function switchToMate($boxes, $flagField){
    var pairs = [
        [$($boxes[2]), $($boxes[3])],
        [$($boxes[4]), $($boxes[5])],
        [$($boxes[6]), $($boxes[7])]
    ];

    for(var pair in pairs){
        if(pairs[pair][0].prop('checked') == pairs[pair][1].prop('checked')){
            continue;
        }
        toggleCheck(pairs[pair][0]);
        toggleCheck(pairs[pair][1]);
    }

    updateFlagField($boxes, $flagField);
}

function toggleCheck($box){
    $box.prop('checked', !$box.prop('checked'));
}

/* Taken from http://www.electrictoolbox.com/pad-number-zeroes-javascript-improved/ */
function pad(n, len) {
    s = n.toString();
    if (s.length < len) {
        s = ('000000000000' + s).slice(-len);
    }
    return s;
}

$(document).ready(function(){
    var $flagField = $('#flag_field');
    var $boxes = $('input[type="checkbox"]');
    var $switchToMateBtn = $('#switch_to_mate_btn');

    $boxes.change(function(){
        updateFlagField($boxes, $flagField);
        updateSummary($boxes);
    });

    $flagField.change(function(){
        var flagFieldVal = parseInt($flagField.val());
        if((flagFieldVal <= 4095 && flagFieldVal >= 0) || $flagField.val() == ''){
            $flagField.css('background-color', '');
            updateBoxes($boxes, $flagField);
            updateSummary($boxes);
        }else{
            $flagField.css('background-color', '#e08600');
        }
    }).bind('input', function(){
        $flagField.change();
    });

    $switchToMateBtn.click(function(){
        switchToMate($boxes, $flagField);
        updateSummary($boxes);
    });

    $flagField.focus();
});

